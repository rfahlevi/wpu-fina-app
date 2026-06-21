"use server"

import { createClient } from "@/lib/supabase/server";
import { TTransaction } from "@/types/transaction";

export async function getBalanceSummary() {
    const supabase = await createClient();

    const { data } = await supabase.from('transactions').select('amount, type');

    const { totalIncome, totalExpense, savings } = (data || []).reduce(
        (acc, tx) => {
            if (tx.type === "income") acc.totalIncome += tx.amount
            else if (tx.type === "expense") acc.totalExpense += tx.amount
            acc.savings = acc.totalIncome - acc.totalExpense

            return acc
        },
        {
            totalIncome: 0,
            totalExpense: 0,
            savings: 0
        }
    )

    return {
        totalIncome,
        totalExpense,
        savings
    }
}

export async function getTransactions(params?: {
    limit?: number,
    page?: number,
    search?: string,
}) {
    const { limit = 10, page = 1, search = "" } = params || {}

    const supabase = await createClient();
    const query = supabase.from('transactions').select('id, amount, type, description, category, date', {
        count: 'exact',
    }).order('date', { ascending: false });

    if (search) query.ilike('description, category, type, amount', `%${search}%`)

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const {
        data,
        error,
        count
    } = await query.range(from, to);

    if (error) throw new Error(error.message)

    const totalData = count || 0

    return {
        data,
        totalData,
        totalPages: Math.ceil(totalData / limit),
        error,
        count
    }
}

export async function createTransaction(
    payload: Omit<TTransaction, 'id' | 'user_id' | 'embedding'>
) {
    const supabase = await createClient();
    const { data, error } = await supabase.from('transactions').insert(payload);

    if (error) throw new Error(error.message)

    return data
}

export async function deleteTransaction(id: string) {
    const supabase = await createClient();
    const { success, error } = await supabase.from('transactions').delete().eq('id', id);

    if (error) throw new Error(error.message)

    return success
}
"use client"

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TransactionTable from "./transaction-table";
import { getTransactions } from "@/actions/transaction/action";

export default function Transaction() {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");

    const {
        data: transactions,
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['transactions', page, limit, search],
        queryFn: () => getTransactions({ page, limit, search }),
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
            <TransactionTable
                transactions={transactions}
                isLoading={isLoading}
                refetch={refetch}
                page={page}
                limit={limit}
                search={search}
                setPage={setPage}
                setLimit={setLimit}
                setSearch={setSearch}
            />
            Transaction Form
        </div>
    )
}

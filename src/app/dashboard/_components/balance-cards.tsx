"use client"

import { getBalanceSummary } from "@/actions/transaction/action";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { rupiahFormatter } from "@/helpers/rupiah-formatter";
import { IconCashBanknote, IconTrendingDown3, IconTrendingUp3 } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query"

type BalanceItem = {
    title: string;
    icon: React.ReactNode;
    amount: number | undefined;
    description: string;
}

export default function BalanceCards() {
    const { data, error } = useQuery({
        queryKey: ['balance'],
        queryFn: () => getBalanceSummary(),
    });

    if (error) {
        return (
            <div className="w-full p-4 text-sm border rounded-lg border-destructive/50 text-destructive bg-destructive/10">
                Failed to get balance
            </div>
        )
    }

    const balanceItems: BalanceItem[] = [
        {
            title: "Savings",
            icon: <IconCashBanknote stroke={2} className="text-primary" />,
            amount: data?.savings,
            description: "Saving for all your goals"
        },
        {
            title: "Total Income",
            icon: <IconTrendingUp3 stroke={2} className="text-green-600" />,
            amount: data?.totalIncome,
            description: "Total income from all sources"
        },
        {
            title: "Expenses",
            icon: <IconTrendingDown3 stroke={2} className="text-destructive" />,
            amount: data?.totalExpense,
            description: "Total expense from all categories"
        },
    ]

    return (
        <div className='grid grid-cols-1 gap-4 mb-8 md:grid-cols-3'>
            {balanceItems.map((item, index) => (
                <Card key={`${item.title}-${index}`}>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2 text-sm text-muted-foreground'>
                            {item.icon}
                            {item.title}
                        </CardTitle>
                        <CardDescription className="text-2xl font-semibold tracking-tighter text-secondary-foreground">
                            {rupiahFormatter(item.amount || 0)}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className='py-2 text-xs text-muted-foreground'>
                        {item.description}
                    </CardFooter>
                </Card>
            ))}

        </div>
    )
}

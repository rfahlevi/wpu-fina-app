
import { Metadata } from "next"
import Transaction from "./_components/transaction"

export const metadata: Metadata = {
    title: "Fina - Transaction",
    description: "View and manage your financial transactions",
}


export default function TransactionPage() {
    return (
        <div className="py-4 space-y-4">
            <section id="header">
                <h1 className="text-xl font-bold text-primary">Transaction</h1>
                <p className="text-sm text-muted-foreground">Get insights into your spending, track your expenses and manage your finance</p>
            </section>
            <section id="content">
                <Transaction />
            </section>
        </div>
    )
}

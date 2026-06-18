import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Fina - Transaction",
    description: "Your personal finance app with AI Powered",
}


export default function TransactionPage() {
    return (
        <div className="space-y-4 py-4">
            <section id="header">
                <h1 className="text-xl font-bold text-primary">Transaction</h1>
                <p className="text-sm text-muted-foreground">Get insights into your spending, track your expenses and manage your finance</p>
            </section>
            <section id="content">

            </section>
        </div>
    )
}

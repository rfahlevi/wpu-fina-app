import { Metadata } from "next"
import BalanceCards from "./_components/balance-cards"

export const metadata: Metadata = {
    title: "Fina - Dashboard",
    description: "Your personal finance app with AI Powered",
}


export default function DashboardPage() {
    return (
        <div className="space-y-4 py-4">
            <section id="header">
                <h1 className="text-xl font-bold text-primary">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Get insights into your spending, track your expenses and manage your finance</p>
            </section>
            <section id="content">
                <BalanceCards />
            </section>
        </div>
    )
}

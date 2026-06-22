import AppSidebar from "@/components/layout/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ReactNode } from "react"
import ChatbotDrawer from "./_components/chatbot-drawer"
import { ThemeToggle } from "@/components/common/theme-toggle"

export default function DashboardLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 p-4">
                <div className="flex items-center justify-between">
                    <SidebarTrigger />
                    <ThemeToggle />
                </div>
                {children}
                {/* Chatbox Drawer */}
                <ChatbotDrawer />
                {/* Chatbox Drawer */}
            </main>
        </SidebarProvider>
    )
}

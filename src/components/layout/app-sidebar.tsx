"use client"

import { usePathname } from "next/navigation"
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { IconCreditCardPay, IconLayoutGridFilled, IconSubtitlesAi } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";


export default function AppSidebar() {
    const pathname = usePathname();

    const sidebarItems = [
        {
            label: "Dashboard",
            icon: <IconLayoutGridFilled />,
            href: "/dashboard"
        },
        {
            label: "Transaction",
            icon: <IconCreditCardPay stroke={2} />,
            href: "/dashboard/transaction"
        },
    ]


    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader className="flex flex-row gap-2 items-center">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            asChild
                        >
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-primary text-sidebar-primary-foreground">
                                    <IconSubtitlesAi stroke={2} className="text-white rounded-sm size-5!" />
                                </div>
                                <p className="truncate font-bold text-primary text-base tracking-tight">Fina <span className="font-medium text-foreground">App</span></p>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {sidebarItems.map((menu, index) => (
                            <SidebarMenuItem key={`${menu.label}-${index}`}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={menu.label}
                                    className={cn("py-2 px-4", {
                                        'dark:bg-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary dark:hover:bg-primary/80 dark:hover:text-white font-semibold transition-all duration-300 dark:text-white': pathname === menu.href
                                    })}
                                >
                                    <Link href={menu.href}>
                                        {menu.icon}
                                        <span>{menu.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

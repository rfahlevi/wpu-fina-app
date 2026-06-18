/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    const isDark = mounted && resolvedTheme === "dark";

    return (
        <div className="relative inline-flex items-center">
            <SunIcon
                size={12}
                className={cn(
                    "pointer-events-none absolute left-0.5 top-0.5 z-10 transition-all duration-200",
                    isDark ? "opacity-0" : "opacity-100"
                )}
            />
            <Switch
                className="peer"
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
            <MoonIcon
                size={12}
                className={cn(
                    "pointer-events-none absolute right-0.5 top-0.5 z-10 text-primary transition-all duration-200",
                    isDark ? "opacity-100" : "opacity-0"
                )}
            />
        </div>
    );
}

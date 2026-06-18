import { IconSubtitlesAi } from "@tabler/icons-react";

export default function FinaApp() {
    return (
        <div className="flex items-center gap-1.5">
            <IconSubtitlesAi stroke={2} className="text-white rounded-sm p-0.75 size-6 bg-primary" />
            <p className="font-bold text-primary text-lg tracking-tight">Fina <span className="font-medium text-foreground">App</span></p>
        </div>
    )
}

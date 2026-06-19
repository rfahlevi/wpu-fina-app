export function dateFormatter(dateString?: string): string {
    if (!dateString) return "-"

    const date = new Date(dateString)

    return new Intl.DateTimeFormat("en-UK", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
        .format(date)
}
import { getTransactions } from "@/actions/transaction/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dateFormatter } from "@/helpers/date-formatter";
import { rupiahFormatter } from "@/helpers/rupiah-formatter";
import { cn } from "@/lib/utils";
import { IconLoader, IconPencilFilled, IconTrashXFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";


const TABLE_HEADER = ["#", "Date", "Description", "Category", "Amount", ""];

export default function TransactionTable({
    transactions,
    isLoading,
    // refetch,
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
}: {
    transactions?: Awaited<ReturnType<typeof getTransactions>>;
    isLoading: boolean;
    refetch: () => void;
    page: number;
    limit: number;
    search: string;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setSearch: (search: string) => void;
}) {
    const [localSearch, setLocalSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearch !== search) {
                setSearch(localSearch)
                setPage(1)
            }
        }, 500)

        return () => clearTimeout(timer);
    })

    return (
        <>
            <Card className="w-full gap-2">
                <CardHeader className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <div>
                        <CardTitle>Recent Transaction</CardTitle>
                        <CardDescription>Your latest financial transaction</CardDescription>
                    </div>
                    <div>
                        <Input
                            placeholder="Search..."
                            value={localSearch}
                            onChange={(e) => {
                                setLocalSearch(e.target.value);
                                console.log(e.target.value)
                            }}
                            className="w-full" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {TABLE_HEADER.map((header) => (
                                    <TableHead key={`th-${header}`} className={cn({
                                        "text-right": header === "Amount",
                                    })}>
                                        {header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!isLoading && transactions?.data.map((trx, index) => (
                                <TableRow key={`tr-${trx.id}-${index}`}>
                                    <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                                    <TableCell className="font-medium">
                                        {dateFormatter(new Date(trx.date).toLocaleDateString())}
                                    </TableCell>
                                    <TableCell>{trx.description}</TableCell>
                                    <TableCell className={cn({
                                        'text-muted-foreground': trx.type === "expense",
                                        'text-primary font-medium': trx.type === "income",
                                    })}>{trx.category}</TableCell>
                                    <TableCell className={cn('font-semibold text-right', {
                                        'text-muted-foreground': trx.type === "expense",
                                        'text-primary': trx.type === "income",
                                    })}>{
                                            `${trx.type === "expense" ? "-" : "+"} ${rupiahFormatter(trx.amount)}`
                                        }</TableCell>
                                    <TableCell className="flex">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="transition-all duration-200 text-muted-foreground hover:text-amber-400"
                                            onClick={() => { }}
                                        >
                                            <IconPencilFilled className="size-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="transition-all duration-200 text-muted-foreground hover:text-destructive"
                                            onClick={() => { }}
                                        >
                                            <IconTrashXFilled className="size-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {!isLoading && transactions?.data?.length === 0 && (
                            <TableCaption className="mt-6 mb-5">
                                No transactions found
                            </TableCaption>
                        )}
                        {
                            isLoading && (
                                <TableFooter className="bg-transparent">
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <div className="flex items-center justify-center w-full gap-1 mt-2 text-muted-foreground">
                                                <IconLoader stroke={2} className='animate-spin' size={22} />
                                                <span>Loading...</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            )
                        }
                    </Table>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground">
                                Rows Per Page :
                            </div>
                            <Select
                                value={limit.toString()}
                                onValueChange={(value) => {
                                    setLimit(Number(value));
                                    setPage(1);
                                }}>
                                <SelectTrigger className="w-20">
                                    <SelectValue placeholder={limit.toString()} />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 10, 20, 50, 100].map((limit) => (
                                        <SelectItem key={limit} value={limit.toString()}>
                                            {limit}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {
                            transactions?.totalPages && transactions?.totalPages > 1 && (
                                <Pagination className="w-auto mx-0">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() =>
                                                    page === 1 ? setPage(Number(transactions?.totalPages))
                                                        : setPage(page - 1)} />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() =>
                                                    page === Number(transactions?.totalPages) ? setPage(1)
                                                        : setPage(page + 1)} />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            )
                        }
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

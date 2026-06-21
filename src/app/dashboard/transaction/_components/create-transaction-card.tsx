import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/components/ui/date-picker";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "@/actions/transaction/action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";


const formSchema = z.object({
    amount: z.string().min(1, 'Amount is required'),
    type: z.enum(['income', 'expense'], {
        error: 'Type is required'
    }),
    category: z.string().min(1, 'Category is required'),
    date: z.string().min(1, 'Date is required'),
    description: z.string().min(1, 'Description is required'),
});

export default function CreateTransactionCard({
    refetch
}: {
    refetch: () => void
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: '',
            type: undefined,
            category: '',
            date: '',
            description: '',
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => {
            const formattedData = {
                ...data,
                amount: parseFloat(data.amount),
            }

            return createTransaction(formattedData)
        },
        onSuccess: () => {
            form.reset();
            refetch();
            toast.success('Transaction created successfully');
        },
        onError: (error) => {
            toast.error(error instanceof Error ?
                error.message :
                'Failed to create transaction');
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        mutate(data);
    }

    return (
        <Card className="w-full gap-2">
            <CardHeader className="gap-0">
                <CardTitle>
                    Create New Transaction
                </CardTitle>
                <CardDescription>
                    Add a new financial activity
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-3">
                        <Controller
                            control={form.control}
                            name='date'
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="form-date">
                                        Date
                                    </FieldLabel>
                                    <DatePicker
                                        value={field.value ? new Date(field.value) : undefined}
                                        onChange={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd')
                                            : undefined)}
                                        id="form-date"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )} />
                        <Controller
                            control={form.control}
                            name='amount'
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="form-amount">
                                        Amount
                                    </FieldLabel>
                                    <Input
                                        id="form-amount"
                                        {...field}
                                        placeholder="0.0"
                                        autoComplete="off"
                                        type="number"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )} />
                        <Controller
                            control={form.control}
                            name='type'
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="form-type">
                                        Type
                                    </FieldLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger id="form-type">
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="income">Income</SelectItem>
                                            <SelectItem value="expense">Expense</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )} />
                        <Controller
                            control={form.control}
                            name='category'
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="form-category">
                                        Category
                                    </FieldLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger id="form-category">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="monthly-salary">Monthly Salary</SelectItem>
                                            <SelectItem value="freelance">Freelance</SelectItem>
                                            <SelectItem value="food-and-drink">Food & Drink</SelectItem>
                                            <SelectItem value="Transportation">Transportation</SelectItem>
                                            <SelectItem value="entertainment">Entertainment</SelectItem>
                                            <SelectItem value="shopping">Shopping</SelectItem>
                                            <SelectItem value="housing">Housing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )} />
                        <Controller
                            control={form.control}
                            name='description'
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="form-description">
                                        Description
                                    </FieldLabel>
                                    <Textarea
                                        id="form-description"
                                        {...field}
                                        placeholder="Explain your transaction"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )} />
                        <Button
                            type="submit"
                            disabled={!form.formState.isValid || isPending}>
                            {isPending ? "Creating..." : "Create Transaction"}
                        </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

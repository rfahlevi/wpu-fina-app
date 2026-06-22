import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandTelegram } from "@tabler/icons-react";
import { KeyboardEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod"

const formSchema = z.object({
    message: z.string().min(1, 'Message is required'),
})

export default function ChatboxTextarea({
    sendMessage
}: {
    sendMessage: (message: string) => void
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        sendMessage(data.message);
        form.reset();
    }

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(form.getValues());
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col p-2 border bg-primary/3 rounded-2xl border-primary/50">
            <Controller
                name="message"
                control={form.control}
                render={({ field }) => (
                    <Field >
                        <textarea
                            {...field}
                            id="form-message"
                            placeholder="Ask about your financial"
                            autoComplete="off"
                            className="h-16 px-2 py-1 rounded-md resize-none focus:outline-none"
                            onKeyDown={handleKeyDown} />
                    </Field>
                )}
            />
            <div className="flex justify-between">
                <div className=""></div>
                <div className="">
                    <Button
                        type="submit"
                        size="icon"
                        className="transition-colors duration-200 hover:cursor-pointer hover:bg-primary text-primary hover:text-white"
                        variant="ghost">
                        <IconBrandTelegram
                            stroke={2}
                            className=' size-5 disabled:bg-muted-foreground' />
                    </Button>
                </div>
            </div>
        </form>
    )
}

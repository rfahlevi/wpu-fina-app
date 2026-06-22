'use client'

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { IconSparklesFilled, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ChatboxTextarea from "./chatbot-textarea";
import { useMutation } from "@tanstack/react-query";
import { handleChat } from "@/actions/ai/chat";
import Markdown from "react-markdown";

export default function ChatbotDrawer() {
    const chatRef = useRef<HTMLDivElement>(null);

    // Drawer toggle
    const [open, setOpen] = useState(false);
    // Drawer toggle

    const [conversation, setConversation] = useState<{
        role: string,
        parts: {
            text: string
        }[]
    }[]>([]);

    const {
        mutate: handleChatMutation,
        isPending
    } = useMutation({
        mutationFn: handleChat,
        onSuccess: (response) => {
            const botMessage = {
                role: "model",
                parts: [{ text: response || 'Terjadi kesalahan' }]
            }

            setConversation((prev) => [
                ...prev,
                botMessage
            ])
        },
        onError: (error) => {
            const botMessage = {
                role: "model",
                parts: [{ text: 'Terjadi kesalahan: ' + error.message }]
            }

            setConversation((prev) => [
                ...prev,
                botMessage
            ])
        }
    });

    function sendMessage(message: string) {
        const newMessage = {
            role: "user",
            parts: [{ text: message }]
        }

        setConversation((prev) => [
            ...prev,
            newMessage
        ])

        handleChatMutation(message);
    }

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current?.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [conversation])

    return (
        <Drawer
            direction="right"
            modal={false}
            open={open}
            onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    className='fixed z-50 transition-all duration-200 border rounded-xl size-14 bottom-8 right-8 bg-primary/3 border-primary hover:bg-primary/20'
                    variant="outline"
                    size="icon-lg"
                >
                    <Image
                        src="/ic_robot.svg"
                        width={30}
                        height={30}
                        alt=""
                        loading="eager" />
                </Button>
            </DrawerTrigger>
            <DrawerContent
                onPointerDownOutside={() => setOpen(false)}
                className="w-screen! md:w-110! pl-4 md:pl-0">
                <DrawerHeader className="flex flex-row items-start justify-between gap-2 border border-l-0 border-b-border">
                    <div>
                        <DrawerTitle className="font-bold text-primary!">
                            AI Financial Advisor
                        </DrawerTitle>
                        <DrawerDescription className='text-sm text-muted-foreground'>
                            Get personalized financial advice from our AI-powered chatbot
                        </DrawerDescription>
                    </div>
                    <DrawerClose asChild>
                        <Button
                            size="icon-sm"
                            variant="outline">
                            <IconX stroke={2} className='text-muted-foreground' />
                        </Button>
                    </DrawerClose>
                </DrawerHeader>
                <div className="h-full px-4 mt-3 overflow-y-auto no-scrollbar">
                    {conversation.length > 0 ? (
                        <div
                            ref={chatRef}
                            className="flex flex-col h-full gap-6 overflow-x-hidden overflow-y-auto text-sm no-scrollbar">
                            {conversation.map((conv, index) => (
                                <div key={`conv-${index}`} className={cn(
                                    'flex flex-col gap-4',
                                    conv.role === 'model' ? 'items-start' : 'items-end',
                                )}>
                                    <div className={cn("w-fit max-w-3/4", {
                                        "flex flex-col gap-0 max-w-full": conv.role === "model",
                                        "bg-primary p-2 text-white rounded-l-xl rounded-tr-xl rounded-br-sm": conv.role === "user",
                                    })}>
                                        {conv.role === "model" && (
                                            <div className="flex items-center gap-1">
                                                <Image src="/ic_robot.svg" width={17} height={17} alt="" />
                                                <p className='text-xs font-semibold text-primary'>AI Advisor</p>
                                            </div>
                                        )}
                                        {conv.role === "model" ? <div className="response-ai">
                                            <Markdown>
                                                {conv.parts[0].text}
                                            </Markdown>
                                        </div> : (
                                            <p>{conv.parts[0].text}</p>
                                        )}

                                    </div>
                                </div>
                            ))}
                            {
                                isPending && (
                                    <div className="flex items-center gap-1 text-sm animate-pulse text-muted-foreground">
                                        <IconSparklesFilled className="text-primary" size={18} />
                                        <p>Generating...</p>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <h2 className="text-sm text-muted-foreground">Hello there, how can I help you?</h2>
                        </div>
                    )}
                </div>
                <DrawerFooter>
                    <ChatboxTextarea sendMessage={sendMessage} />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

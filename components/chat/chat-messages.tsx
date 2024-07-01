"use client";

import { Loader2 } from 'lucide-react'
import { useChatQuery } from "@/hooks/use-chat-query";
import { Member } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";
}


export const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type
}: ChatMessagesProps ) => {
    const queryKey = `chat:${chatId}`;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    })

    if (status === "loading") {
        return (
            <div className="flex flex-col flex-1 items-center justify-center">
                <Loader2 
                    className="h-7 w-7 text-zinc-500 animate-spin-my-4"
                />
                <p>
                    Loading messages...
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col py-4 overflow-y-auto">
            <div className="flex-1"/>
            <ChatWelcome
                name={name}
                type={type}
            />
        </div>
    )
}
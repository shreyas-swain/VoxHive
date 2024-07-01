import { currentProfile } from "@/lib/current-profile";
import { redirect } from "@/node_modules/next/navigation";
import { db } from '@/lib/db'
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({
    params
}: ChannelIdPageProps) => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect('/sign-in');
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        },
    });

    const member = await db.channel.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        },
    });

    if(!channel || !member) {
        redirect('/');
    } 

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-1 flex-col h-full">
            <ChatHeader 
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
            <ChatMessages 
                member={member}
                name={channel.name}
                chatId={channel.id}
                type="channel"
                apiUrl='/api/messages'
                socketUrl='/api/socket/messages'
                socketQuery={{
                    channelId: channel.id,
                    serverId: channel.serverId,
                }}
                paramKey="channelId"
                paramValue={channel.id}
            />
            {/* <div className="sticky bottom-0 w-full"> */}
                <ChatInput 
                    name={channel.name}
                    type="channel"
                    apiUrl='/api/socket/messages'
                    query={{
                        channelId: channel.id,
                        serverId: channel.serverId,
                    }}
                />
            {/* </div> */}
        </div>
    );
}

export default ChannelIdPage;
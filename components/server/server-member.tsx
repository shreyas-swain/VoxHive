"use client"


import { ShieldCheck, ShieldAlert } from 'lucide-react'
import { Member, Profile, Server, MemberRole } from "@prisma/client";
import { useParams, useRouter } from '@/node_modules/next/navigation';
import { cn } from '@/lib/utils';
import { ActionTooltip } from '../action-tooltip';


interface ServerMemberProps {
    member: Member & { profile: Profile };
    server: Server;
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />,
}


export const ServerMember = ({
    member,
    server,
}: ServerMemberProps) => {
    const params = useParams();
    const router = useRouter();

    return (
        <div>

        </div>
    )
}
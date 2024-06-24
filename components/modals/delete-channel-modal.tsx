"use client";

import qs from 'query-string'
import { useState } from 'react';
import axios from 'axios'
import { Copy, RefreshCw, Check } from 'lucide-react'


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FileUpload } from '../ui/file-upload';
import { useModal } from '@/hooks/use-modal-store';
import { Label } from '../ui/label';
import { useRouter } from '@/node_modules/next/navigation';


export const DeleteChannelModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "deleteChannel";
    const { server, channel } = data;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            })
            await axios.delete(url);
            onClose();
            router.refresh();
            router.push(`/servers/${server?.id}`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl test-center font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-rose-500">
                        Are you sure you want to do this ?<br />
                        <span className="font-semibold text-indigo-500">#{channel?.name}</span>
                        <span className="text-zinc-500">&nbsp; will be permanently deleted!</span> 
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-3">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={onClick}
                            variant="warning"
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
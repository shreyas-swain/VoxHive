"use client";

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
import { FileUpload } from '../file-upload';
import { useModal } from '@/hooks/use-modal-store';
import { Label } from '../ui/label';
import { useRouter } from '@/node_modules/next/navigation';


export const DeleteServerModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "deleteServer";
    const { server } = data;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/servers/${server?.id}`);
            onClose();
            router.refresh();
            router.push('/');
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
                        Delete Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-rose-500">
                        Are you sure you want to do this ?<br />
                        <span className="font-semibold text-indigo-500">'{server?.name}'</span>
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
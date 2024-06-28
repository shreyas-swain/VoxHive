"use-client";

import { X, FileIcon } from 'lucide-react'
import Image from 'next/image'
import { UploadDropzone, UploadButton } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    const fileType = value?.split(".").pop();
    if (value && fileType !== "pdf") {
        return (
            <div className='relative h-20 w-20'>
                <Image
                    fill
                    src={value}
                    alt="upload"
                    className="rounded-full" 
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-600 text-white p-1 rounded-full absolute top-0 right-0 shoadow-sm"
                    type="button"
                >
                    <X className="h-3 w-3"/>
                </button>
            </div>
        )
    }

    if (value && fileType === "pdf") {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400"/>
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    {value}
                </a>
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-600 text-white p-1 rounded-full absolute top-0 right-0 shoadow-sm"
                    type="button"
                >
                    <X className="h-3 w-3"/>
                </button>
            </div>
        )
    }

    return  (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={( res ) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log("Upload error:", error);
            }}
        />
    );
}
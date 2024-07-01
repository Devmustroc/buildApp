'use client'

import React from 'react';
import Image from "next/image";
import {useUser} from "@clerk/clerk-react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import {useRouter} from "next/navigation";


const DocumentsPage = () => {
    const { user } = useUser();
    const router = useRouter();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({
            title: "Untitled Document"
        })
            .then((doc) => router.push(`/documents/${doc}`))
        toast.promise(promise, {
            loading: "Creating Document...",
            success: "Document Created",
            error: "Failed to Create Document"
        })
    }

    return (
        <div
            className="h-full flex items-center justify-center space-y-2 flex-col"
        >
            <div
                className="relative flex flex-col items-center justify-center text-center"
            >
                <Image
                    src="/empty.png"
                    alt="not found"
                    width={500}
                    height={300}
                />
                <div
                    className="space-y-2 lg:absolute lg:top-[28rem] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 text-center w-full"
                >
                    <h2
                        className="text-3xl font-bold italic md:text-4xl lg:text-5xl xl:text-6xl drop-shadow-lg bg-gradient-to-b from-[#f1c528] via-[#b86d08] to-[#9d5400] text-transparent bg-clip-text"
                    >
                        {user?.firstName}
                    </h2>
                    <p
                        className="text-sm text-muted-foreground dark:text-muted-foreground"
                    >
                        Let&apos;s Make Something Great Together
                    </p>
                    <Button
                        onClick={onCreate}
                    >
                        <Plus
                            size={24}
                            className="mr-2"
                        />
                        Create Document
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DocumentsPage;
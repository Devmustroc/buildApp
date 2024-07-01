'use client'

import React from 'react';
import {Id} from "@/convex/_generated/dataModel";
import {useRouter} from "next/navigation";
import {useUser} from "@clerk/clerk-react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {arch} from "node:os";
import {toast} from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal, Trash} from "lucide-react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

type MenuProps = {
    documentId: Id<"documents">
}

const Menu = ({ documentId }: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();

    const archive = useMutation(api.documents.archive);

    const onArchive =  () => {
        const promise = archive({ id: documentId });
        toast.promise(promise, {
            loading: "Archiving document...",
            success: "Document archived",
            error: "Failed to archive document"
        });

        router.push("/app/documents");
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
            >
                <Button
                    size={"sm"}
                    variant={'ghost'}
                >
                    <MoreHorizontal
                        className={"h-5 w-5"}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount={true}
            >
                <DropdownMenuItem
                    onClick={onArchive}
                    className="flex items-center gap-x-2 text-rose-500 hover:bg-rose-50"
                >
                    <Trash
                        className={"h-5 w-5 mr-2 text-rose-500"}
                    />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div
                    className="text-muted-foreground text-xs flex items-center gap-x-2 px-3 py-2"
                >
                    <Avatar
                        className="h-6 w-6"
                    >
                        <AvatarImage
                            src={user?.imageUrl}
                        />
                    </Avatar>
                    Edited by {user?.fullName}
                </div>
            </DropdownMenuContent>
            
        </DropdownMenu>
    );
};

export default Menu;
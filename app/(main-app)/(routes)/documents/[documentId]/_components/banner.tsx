'use client'

import React from 'react';
import {Id} from "@/convex/_generated/dataModel";
import {useRouter} from "next/navigation";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import {ArchiveRestore, Info, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import ConfirmModal from "@/components/modal/confirm-modal";

type BannerProps = {
    documentId: Id<"documents">;
}

const Banner = ({ documentId }: BannerProps) => {
    const router = useRouter();
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove =  () => {
        const promise = remove({ id: documentId })
        toast.promise(promise, {
            loading: "Archiving document",
            success: "Document Deleted",
            error: "Failed to Delete document"
        });
        router.push("/documents");
    }

    const onRestore =  () => {
        const promise = restore({ id: documentId })
            .then(() => {
                router.push("/documents");
            })
        toast.promise(promise, {
            loading: "Restoring document",
            success: "Document restored",
            error: "Failed to restore document"
        });
    }
    return (
        <div
            className="w-full bg-amber-500 text-center text-sm text-black py-2 flex flex-col items-center justify-center gap-x-4 gap-y-2 md:flex-row"
        >
                <p
                    className="text-sm text-black flex flex-col items-center gap-x- md:flex-row"
                >
                    <Info
                        size={16}
                        className="text-sm text-white mr-2 hidden sm:block"
                    />
                    This document is archived. You can restore it or permanently remove it.
                </p>
                <div
                    className="flex items-center gap-x-2"
                >
                    <Button
                        variant="secondary"
                        size={"sm"}
                        onClick={onRestore}
                    >
                        <ArchiveRestore
                            size={16}
                            className="text-sm mr-2"
                        />
                        Restore
                    </Button>
                    <ConfirmModal
                        onConfirm={onRemove}
                    >
                        <Button
                            variant="destructive"
                            size={"sm"}
                            className="bg-white text-rose-500 hover:bg-rose-500 hover:text-white"
                        >
                            <Trash
                                size={16}
                                className="text-sm mr-2"
                            />
                            Delete
                        </Button>
                    </ConfirmModal>
                </div>
        </div>
    );
};

export default Banner;
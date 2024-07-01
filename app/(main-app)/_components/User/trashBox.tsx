import React, {useState} from 'react';
import {useParams, useRouter} from "next/navigation";
import {useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {toast} from "sonner";
import Spinner from "@/components/ui/spinner";
import {RotateCcw, Search, Trash2} from "lucide-react";
import {Input} from "@/components/ui/input";
import ConfirmModal from "@/components/modal/confirm-modal";
import {useEdgeStore} from "@/lib/edgestore";

const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("");

    const filteredDocuments = documents?.filter((doc) =>
        doc.title.toLowerCase().includes(search.toLowerCase())
    );

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    };

    const onRestore = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,
                       documentId: Id<"documents">) => {
        e.stopPropagation();
        const promise = restore({id: documentId});
        toast.promise(promise, {
            loading: "Restoring...",
            success: "Document restored",
            error: "Failed to restore document"
        });
    };

    const onRemove = async (documentId: Id<"documents">) => {
        const promise = remove({id: documentId});
        toast.promise(promise, {
            loading: "Removing...",
            success: "Document removed",
            error: "Failed to remove document"
        });
        if (params.id === documentId) {
            router.push("/documents");
        }
    }

    if (documents === undefined) {
        return (
            <div
                className={"flex justify-center items-center h-96 mb-2"}
            >
                <Spinner
                    size={"lg"}
                />
            </div>
        )
    }

    return (
        <div
            className="text-sm mb-24"
        >
            <div
                className="relative flex items-center gap-x-1 p-2"
            >
                <Input
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secodnary"
                />
                <Search
                    className="asolute left-0 top-2"
                />
            </div>
            <div
                className="mt-2 px-1 pb-1"
            >
                <p
                    className="hidden last:block text-xs text-center text-muted-foreground pb-2"
                >
                    No Documents in Trash
                </p>
                {
                    filteredDocuments?.map((doc) => {
                        return (
                            <div
                                key={doc._id}
                                role={"button"}
                                onClick={() => onClick(doc._id)}
                                className="text-sm w-full hover:bg-primary/10
                                            dark:hover:bg-primary p-2
                                            rounded-md cursor-pointer
                                            flex items-center justify-between
                                            transition"

                            >
                                <span
                                    className="truncate pl-2"
                                >
                                    {doc.title}
                                </span>
                                <div
                                    className="flex items-center justify-center gap-x-1"
                                >
                                    <div
                                        role={"button"}
                                        className="rounded-full px-1 py-1 bg-emerald-500 hover:bg-emerald-400"
                                        onClick={(e) => onRestore(e, doc._id)}
                                    >
                                        <RotateCcw
                                            className="text-white h-4 w-4"
                                        />
                                    </div>
                                    <div
                                        role={"button"}
                                        className="rounded-full px-1 py-1 bg-rose-500 hover:bg-rose-400"
                                        onClick={(e) => onRemove(doc._id)}
                                    >
                                        <ConfirmModal
                                            onConfirm={() => onRemove(doc._id)}
                                        >
                                            <Trash2
                                                className="text-white h-4 w-4"
                                            />
                                        </ConfirmModal>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default TrashBox;
import React, {useState} from 'react';
import {Doc} from "@/convex/_generated/dataModel";
import {useOrigin} from "@/hooks/useOrigin";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Check, Copy, Globe} from "lucide-react";
import {Input} from "@/components/ui/input";

type PublishProps = {
    data: Doc<"documents">;
}

const Publish = ({ data }: PublishProps) => {
    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const [copied, setCopied] = useState(false);
    const [publishing, setPublishing] = useState(false);

    const url = `${origin}/preview/${data._id}`;

    const onPublish = async () => {
        setPublishing(true);
        const promise = update({
            id: data._id,
            isPublished: true
        }).finally(() => {
            setPublishing(false);
        });

        toast.promise(promise, {
            loading: "Publishing...",
            success: "Document published!",
            error: "Failed to publish"
        });
    }

    const onUnpublish = async () => {
        setPublishing(true);
        const promise = update({
            id: data._id,
            isPublished: false
        }).finally(() => {
            setPublishing(false);
        });

        toast.promise(promise, {
            loading: "Unpublishing...",
            success: "Document unpublished!",
            error: "Failed to unpublish"
        });
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url).then(() => {
            toast.success("Link copied to clipboard");
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        });
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"ghost"}
                    size={"sm"}
                >
                    Publish
                    {data.isPublished ? (
                        <Globe
                            size={24}
                            className="ml-2 text-primary dark:text-primary-dark animate-pulse animate-infinite animate"
                        />
                    ) : null}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-72"
                align={"end"}
                alignOffset={8}
                forceMount
            >
                {
                    data.isPublished ? (
                        <div
                            className="flex flex-col items-center justify-center space-y-4"
                        >
                            <div
                                className="flex flex-col items-center justify-center md:flex-row md:justify-center gap-x-2 text-center w-full"
                            >
                                <Globe
                                    className="h-5 w-5 text-primary animate-pulse animate-infinite animate"
                                />
                                <p
                                    className="text-sm font-light mt md:mt-0 text-black dark:text-white"
                                >
                                    Document published
                                </p>
                            </div>
                            <div
                                className="flex items-center"
                            >
                                <Input
                                    value={url}
                                    className="flex-1 text-sm border rounded-l-md h-8 bg-muted truncate"
                                    disabled={true}
                                />
                                <Button
                                    variant={"ghost"}
                                    onClick={onCopy}
                                    disabled={copied}
                                    className="rounded-r-md h-8 ml-2"
                                    size={"sm"}
                                >
                                    {
                                        copied ? (
                                            <Check
                                                className="h-4 w-4 text-primary"
                                            />
                                        ) : (
                                            <Copy
                                                className="h-4 w-4 text-muted-foreground"

                                            />
                                        )
                                    }
                                </Button>
                            </div>
                            <Button
                                onClick={onUnpublish}
                                size={"sm"}
                                className="w-full text-sm bg-slate-900 mt-4 hover:bg-slate-900/90 transition-colors dark:bg-amber-800 dark:hover:bg-amber-800/90 dark:text-white"
                                disabled={publishing}
                            >
                                Unpublish
                            </Button>
                        </div>
                    ) : (
                        <div
                            className="flex flex-col items-center justify-center"
                        >
                            <div
                                className="flex flex-col items-center justify-center md:flex-row md:justify-center gap-x-2 text-center w-full"
                            >
                                <Globe
                                    className=" h-4 w-4 text-muted-foreground"
                                />
                                <p
                                    className="text-sm font-light mt md:mt-0 text-primary"
                                >
                                    Publish your document
                                </p>
                            </div>
                            <span
                                role={"button"}
                                onClick={onPublish}
                                className="text-sm mt-4 text-muted-foreground mb-4 md:mb-2 text-center"
                            >
                                Share this document with potential readers
                            </span>
                            <Button
                                onClick={onPublish}
                                size={"sm"}
                                className="w-full text-sm "
                                disabled={publishing}
                            >
                                Publish
                            </Button>
                        </div>
                    )
                }
            </PopoverContent>
        </Popover>
    );
};

export default Publish;
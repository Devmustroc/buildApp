'use client'

import React from 'react';
import {cn} from "@/lib/utils";
import Image from 'next/image';
import {Button} from "@/components/ui/button";
import {ImageIcon, Trash2} from "lucide-react";
import {useCoverImage} from "@/hooks/use-cover-image";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useParams} from "next/navigation";
import {Id} from "@/convex/_generated/dataModel";
import {useEdgeStore} from "@/lib/edgestore";
import {Skeleton} from "@/components/ui/skeleton";

type Props = {
    url?: string;
    preview?: boolean;
};


const CoverImage = ({ url, preview }: Props) => {
    const params = useParams()
    const coverImage = useCoverImage();
    const update = useMutation(api.documents.removeCoverImage);
    const { edgestore } = useEdgeStore();

    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url,
            });
        }
        update({
            id: params.documentId as Id<"documents">,
        });
    };

    return (
        <div
            className={cn(
                `relative w-full h-[35vh] group`,
                !url && "h-[12vh]",
                url && "bg-muted"
            )}
        >
            {
                !!url && (
                    <Image
                        src={url}
                        alt="cover"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                )
            }
            {
                url && !preview && (
                    <div
                        className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex flex-col items-center gap-x-2 gap-y-1
                            md:flex-row md:gap-x-4 md:gap-y-0 md:bottom-10 md:right-10"
                    >
                        <Button
                            onClick={() => coverImage.onReplace(url)}
                            variant="outline"

                        >
                            <ImageIcon
                                    className="w-6 h-6 mr-2"
                            />
                            Change Cover
                        </Button>
                        <Button
                            onClick={onRemove}
                            variant="destructive"

                        >
                            <Trash2
                                className="w-6 h-6 mr-2"
                            />
                            Delete Cover
                        </Button>
                    </div>
                )
            }
        </div>
    );
};

CoverImage.Skeleton = function CoverSkeleton()  {
    return (
        <Skeleton
            className="w-full h-[12vh]"
        />
    )
}

export default CoverImage;
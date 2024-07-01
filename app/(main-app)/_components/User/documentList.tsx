"use client"

import React, {useState} from 'react';
import {Doc, Id} from "@/convex/_generated/dataModel";
import {useParams, useRouter} from "next/navigation";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import Item from "@/app/(main-app)/_components/User/item";
import {cn} from "@/lib/utils";
import {FileIcon} from "lucide-react";



type DocumentsProps = {
    parentDocumentId?: Id<"documents">
    level?: number
    data?: Doc<"documents">
}

const DocumentList = ({
    parentDocumentId,
    level = 0,
    data
}: DocumentsProps) => {
    const params = useParams();
    const router = useRouter();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({

    });

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }))
    };

    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    const documents = useQuery(api.documents.getSideBar, {
        parentDocument: parentDocumentId
    });

    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level}/>
                {
                    level === 0 && (
                        <>
                            <Item.Skeleton level={level}/>
                            <Item.Skeleton level={level}/>
                        </>
                    )
                }
            </>
        )
    }
    return (
        <>
           <p
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
            className={cn(
                `hidden text-sm font-medium text-secondary px-2 py-1 w-full text-black bg-amber-500/10 text-end dark:bg-amber-500 dark:text-white`,
                expanded && "last:block",
                level  === 0 && "hidden"
            )}
           >
               No Documents
           </p>
           {
                documents.map(document => {
                    return (
                        <div
                            key={document._id}
                        >
                            <Item
                                id={document._id}
                                onClick={() => onRedirect(document._id)}
                                label={document.title}
                                icon={FileIcon}
                                documentIcon={document.icon}
                                active={params.documentId === document._id}
                                level={level}
                                onExpand={() => onExpand(document._id)}
                                expanded={expanded[document._id]}
                            />
                            {
                                expanded[document._id] && (
                                    <DocumentList
                                        parentDocumentId={document._id}
                                        level={level + 1}
                                    />
                                )
                            }
                        </div>
                    )
                })
            }
        </>
    );
};

export default DocumentList;
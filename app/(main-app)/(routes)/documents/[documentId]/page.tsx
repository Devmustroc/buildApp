'use client'

import React, { useMemo } from 'react';
import {useMutation, useQuery} from "convex/react";
import {Id} from "@/convex/_generated/dataModel";
import {api} from "@/convex/_generated/api";
import Toolbar from "@/components/toolbar";
import CoverImage from "@/components/coverImage";
import {Skeleton} from "@/components/ui/skeleton";
import dynamic from "next/dynamic";



interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">
    }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps ) => {

    const Editor = useMemo(() =>
        dynamic(() =>
                import("@/components/editorContent"),
            {
                ssr: false
            }
        ), []);

    const document = useQuery(api.documents.getById, { documentId: params.documentId});

    const update = useMutation(api.documents.update);

    const onChange = (content: string) => {
        update({
            id: params.documentId,
            content
        });
    };

    if (document === undefined) {
        return (
            <div>
                <CoverImage.Skeleton />
                <div
                    className="md:max-w-5xl lg:max-w-6xl mx-auto mt-10 w-full"
                >
                    <div
                        className="space-y-4 pl-8 pt-4"
                    >
                        <Skeleton className="h-40 w-[50%]" />
                        <Skeleton className="h-6 w-[80%]" />
                        <Skeleton className="h-10 w-[40%]" />
                        <Skeleton className="h-6 w-[60%]" />
                        <Skeleton className="h-8 w-[80%]" />
                        <Skeleton className="h-8 w-[80%]" />
                    </div>
                </div>

            </div>
        )
    }

    if (document === null) {
        return <div>Document not found</div>
    }
    return (
        <div
            className="pb-40"
        >
            <CoverImage
                url={document.coverImage}
            />
            <div
                className="md:max-w-3xl lg:max-w-4xl mx-auto px-4 py-8"
            >
                <Toolbar
                    data={document}
                />
                <Editor
                        onChange={onChange}
                        data={document.content}
                />
            </div>
        </div>
    );
};

export default DocumentIdPage;
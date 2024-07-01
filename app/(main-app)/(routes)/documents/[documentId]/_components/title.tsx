'use client'

import React, {useRef, useState} from 'react';
import {Doc} from "@/convex/_generated/dataModel";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";


type TitleProps = {
    data: Doc<"documents">;
}

const Title = ({ data }: TitleProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(data.title || "Untitled Document")
    const update = useMutation(api.documents.update);


    const enableEditing = () => {
        setTitle(data.title || "Untitled Document")
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.setSelectionRange(0, title.length)
        }, 0)
    }

    const desableEditing = () => {
        setIsEditing(false)
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        update({
            id: data._id,
            title: e.target.value || "Untitled Document"
        })
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            desableEditing()
        }
    };
    return (
        <div
            className="flex items-center gap-x-1 py-2"
        >
            { !!data.icon && <p>{data.icon}</p>}
            {
                isEditing ? (
                    <Input
                        ref={inputRef}
                        onClick={enableEditing}
                        onBlur={desableEditing}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={title}
                        className="h-7 focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                ) : (
                    <Button
                        size={"sm"}
                        variant="ghost"
                        className="font-normal text-left h-auto p-1"
                        onClick={enableEditing}
                    >
                        <span
                            className="truncate"
                        >
                            {data?.title}
                        </span>
                    </Button>
                )
            }
        </div>
    );
};


Title.Skeleton = function titleSkeleton() {
    return (
        <Skeleton
            className="h-6 w-40 rounded-md m-2"
        />
    )
}

export default Title;
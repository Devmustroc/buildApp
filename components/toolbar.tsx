'use client'

import React, {ElementRef, useRef, useState} from 'react';
import {Doc} from "@/convex/_generated/dataModel";
import IconPicker from "@/components/icon-picker";
import {Button} from "@/components/ui/button";
import {ImageIcon, Smile, X} from "lucide-react";
import {api} from "@/convex/_generated/api";
import {useMutation} from "convex/react";
import TextareaAutosize from 'react-textarea-autosize';
import {useCoverImage} from "@/hooks/use-cover-image";

interface ToolbarProps {
    data: Doc<"documents">
    preview?: boolean
}

const Toolbar = ({ data, preview }: ToolbarProps) => {
    const inputRef= useRef<ElementRef<"textarea">>(null);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ value, setValue ] = useState(data.title);
    const coverImage = useCoverImage()

    const update = useMutation(api.documents.update);
    const removeIcon = useMutation(api.documents.removeIcon);

    const enableInput = () => {
        if (preview) {
            return;
        }
        setIsEditing(true);
        setTimeout(() => {
            setValue(data.title);
            inputRef.current?.focus();
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    }

    const onInput = (value: string) => {
        setValue(value);
        update({
            id: data._id,
            title: value || "Untitled"
        })
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === "Enter") {
            e.preventDefault();
            setIsEditing(false);
        }
    }

    const onIconSelect = (icon: string) => {
        update({
            id: data._id,
            icon
        })
    }

    const onRemoveIcon = () => {
        removeIcon({
            id: data._id
        })
    }

    return (
        <div
            className="pl-[54px] group relative mb-8"
        >
            {
                !!data.icon && !preview && (
                    <div
                        className="flex items-center gap-x-2 group/icon pt-6"
                    >
                        <IconPicker
                            onChange={onIconSelect}
                        >
                            <p
                                className="text-4xl hover:opacity-75 transition-all duration-200 ease-in-out"
                            >
                                {data.icon}
                            </p>
                        </IconPicker>
                        <Button
                            variant={"ghost"}
                            onClick={onRemoveIcon}
                            className="rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out text-sm text-muted-foreground hover:text-muted-foreground-hover"
                        >
                            <X
                                className="w-4 h-4"
                            />
                        </Button>
                    </div>
                )
            }
            {
                !!data.icon && preview && (
                    <p
                        className="text-6xl"
                    >
                        {data.icon}
                    </p>
                )
            }
            <div
                className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4 transition-all duration-200 ease-in-out"
            >
                {
                    !data.icon && !preview && (
                        <IconPicker
                            asChild={true}
                            onChange={onIconSelect}
                        >
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                className="rounded-md text-muted-foreground hover:text-muted-foreground-hover transition-all duration-200 ease-in-out"
                            >
                                <Smile
                                    className="w-6 h-6 mr-2 bg-amber-500 text-white rounded-full"

                                />
                                Add Icon
                            </Button>
                        </IconPicker>
                    )
                }
                {
                    !data.coverImage && !preview && (
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={coverImage.onOpen}
                            className="rounded-md text-white hover:text-white transition-all duration-200 ease-in-out bg-slate-900 hover:bg-amber-500
                                dark:bg-amber-800 dark:hover:bg-amber-600 dark:text-white dark:hover:text-white
                            "
                        >
                            <ImageIcon
                                className="w-6 h-6 mr-2"
                            />
                            add Cover Image
                        </Button>
                    )
                }
            </div>
            {
                isEditing && !preview ? (
                    <TextareaAutosize
                        ref={inputRef}
                        value={value}
                        onChange={(e) => onInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        onBlur={disableInput}
                        className="w-full text-5xl font-bold outline-none bg-transparent break-words text-[#3F3F3F] resize-none dark:text-[#CFCFCF] transition-all duration-200 ease-in-out"

                    />
                ) : (
                    <div
                        onClick={enableInput}
                        className="text-5xl font-bold break-words text-[#3F3F3F] dark:text-[#CFCFCF] transition-all duration-200 ease-in-out"
                    >
                        {data.title}
                    </div>
                )
            }
        </div>
    );
};

export default Toolbar;
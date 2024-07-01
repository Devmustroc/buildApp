"use client"

import React from 'react';
import {
    ChevronDown,
    ChevronRight,
    LucideIcon, Plus, SquareChevronDown, Trash
} from "lucide-react";
import {Id} from "@/convex/_generated/dataModel";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useUser} from "@clerk/clerk-react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import TooltipWrapper from "@/components/ui/ui/tooltipWrapper";



type ItemProps = {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    onExpand?: () => void;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onClick?: () => void;
    label: string;
    icon: LucideIcon;
}

const Item = ({
                  id,
                  documentIcon,
                  active,
                  isSearch,
                  level = 0,
                  onExpand,
                  expanded,
                  onClick,
                  label,
                  icon: Icon,
}: ItemProps) => {
    const {user} = useUser();
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive)
    const router = useRouter();

    const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        onExpand?.();
    }

    const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (!id) return;

        const promise = archive({id})
            .then(() => router.push(`/documents`))
        toast.promise(promise, {
            loading: "Archiving Document...",
            success: "Document moved to trash",
            error: "Failed to Archive Document"
        })
    }

    const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (!id) return;

        const promise = create({title: "Untitled", parentDocument: id })
            .then((documentId) => {
                if(!expanded) {
                    onExpand?.();
                }
                router.push(`/documents/${documentId}`)
            })

        toast.promise(promise, {
            loading: "Creating Document...",
            success: "Document Created",
            error: "Failed to Create Document"
        })
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;


    return (
        <div
            role={"button"}
            onClick={onClick}
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
            className={cn(
                `group min-h-[50px] text-sm py-1 pr-3 flex 
                    gap-x-2 w-full hover:bg-primary/10
                    dark:hover:bg-amber-700/20 cursor-pointer
                    items-center text-muted-foreground font-medium`,
                    active && "bg-amber-700/50 text-secondary hover:bg-amber-700/50 dark:bg-amber-700/20 dark:text-white",
                    level && `min-h-${level * 12 + 24}px py-2`
            )}
        >
            {
                !!id && (
                    <TooltipWrapper
                        title={"Expand"}
                    >
                        <div
                            onClick={handleExpand}
                            role={"button"}
                            className={cn("h-full rounded-full bg-amber-700/20 px-1 py-1 hover:bg-emerald-400 transition-colors",
                                expanded && "bg-emerald-400/50",
                                active && "bg-emerald-400/20"
                            )}
                        >
                            <ChevronIcon
                                className="h-4 w-4 shrink-0 text-muted-foreground text-black dark:text-white"
                            />
                        </div>
                    </TooltipWrapper>
                )
            }
            {
                documentIcon ? (
                    <div
                        className="shrink-0 mr-2 text-[18px]"
                    >
                        {documentIcon}
                    </div>
                ) : (
                    <Icon
                        size={16}
                        className="shrink-0 h-[18px] mr-2 text-gray-900 dark:text-slate-300 w-[18px]"
                    />
                )
            }
            <span
                className="truncate"
            >
                {label}
            </span>
            {
                isSearch && (
                    <kbd
                        className="ml-auto pointer-events-none inline-flex h-5 select-none
                            items-center gap-1 rounded border bg-muted px-1.5
                            font-medium text-muted-foreground opacity-100 text-[10px] capitalize text-amber-700
                        "
                    >
                        <span
                            className="text-[10px] capitalize"
                        >
                            Ctrl
                        </span>{" "}+{" "}K
                    </kbd>
                )
            }
            {
                !!id && (
                    <div
                        className="ml-auto flex items-center gap-x-2"
                    >
                        <TooltipWrapper title={"Archive"}>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    onClick={(e) => e.stopPropagation()}
                                    asChild
                                >
                                    <div
                                        role={"button"}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity
                                        h-full rounded-full p-1 bg-emerald-900 hover:bg-emerald-800  cursor-pointer text-white dark:text-white"
                                    >
                                        <SquareChevronDown
                                            className="h-4 w-4 shrink-0"
                                        />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align={"end"}
                                    alignOffset={-10}
                                    className="dark:bg-[#1F1F1F] w-48"
                                >
                                    <DropdownMenuItem
                                        onClick={onArchive}
                                    >
                                        <Trash
                                            className="h-4 w-4 shrink-0 text-muted-foreground mr-4 text-rose-500"
                                        />
                                        <span
                                            className="text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                                        >Delete</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <div
                                        className="p-2 text-sm text-muted-foreground dark:text-white gap-x-4 flex justify-between items-center"
                                    >
                                        Edited:
                                        <div
                                            className="flex items-center gap-x-2"
                                        >
                                            <Avatar
                                                className="h-4 w-4"
                                            >
                                                <AvatarImage
                                                    src={user?.imageUrl}
                                                />

                                            </Avatar>
                                            <span
                                                className="text-sm text-gray-900 text-end dark:text-white"
                                            >
                                        {user?.firstName}
                                    </span>
                                        </div>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TooltipWrapper>
                        <TooltipWrapper title={"New Document"}>
                            <div
                                role={"button"}
                                onClick={onCreate}
                                className="bg-emerald-900 rounded-full p-0.2 opacity-0 hover:bg-emerald-800 group-hover:opacity-100 transition-opacity
                                transform-gpu duration-200 px-1 py-1"
                            >
                                <Plus
                                    className="h-4 w-4 shrink-0 text-white dark:text-white"
                                />
                            </div>
                        </TooltipWrapper>
                    </div>
                )
            }
        </div>
    );
};

Item.Skeleton = function ItemSkeleton({level}: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton
                className="h-4 w-4"
            />
            <Skeleton
                className="h-4 w-[30%]"
            />
        </div>
    )
}

export default Item;

'use client'

import React, {useEffect, useState} from 'react';
import {useQuery} from "convex/react";
import {useRouter} from "next/navigation";
import {useUser} from "@clerk/clerk-react";
import {api} from "@/convex/_generated/api";
import {useSearch} from "@/hooks/use-search";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {File} from "lucide-react";


const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch)

    const [isMounted, setIsMounted] = useState(false)

    const toggle = useSearch((state) => state.toggle)
    const isOpen = useSearch((state) => state.isOpen)
    const onClose = useSearch((state) => state.onClose)

    useEffect(() => {
        setIsMounted(true)
        return () => {
            setIsMounted(false)
        }
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "K" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggle()
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down)
    }, [toggle])

    if (!isMounted) {
        return null
    }

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`)
        onClose()
    }

    return (
        <CommandDialog
            open={isOpen}
            onOpenChange={toggle}
        >
            <CommandInput
                placeholder={`Search ${user?.fullName}`}
            />
            <CommandList>
                <CommandEmpty>
                    No results found
                </CommandEmpty>
                <CommandGroup
                    heading={"Documents"}
                >
                    {
                        documents?.map((doc) => {
                            return (
                                <CommandItem
                                    key={doc._id}
                                    title={doc.title}
                                    value={`${doc._id}-${doc.title}`}
                                    onSelect={onSelect}
                                >
                                    {
                                        doc.title ? (
                                            <p

                                            >
                                                {doc.icon}
                                            </p>
                                        ) : (
                                            <File
                                                size={24}
                                                strokeWidth={1.5}
                                            />
                                        )
                                    }
                                    <span
                                        className={"ml-2"}
                                    >
                                        {doc.title}
                                    </span>
                                </CommandItem>
                            )
                        })
                    }
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};

export default SearchCommand;
'use client'

import React from 'react';
import {useParams} from "next/navigation";
import {useQuery} from "convex/react";
import {Id} from "@/convex/_generated/dataModel";
import {api} from "@/convex/_generated/api";
import {MenuIcon} from "lucide-react";
import Title from "@/app/(main-app)/(routes)/documents/[documentId]/_components/title";
import Banner from "@/app/(main-app)/(routes)/documents/[documentId]/_components/banner";
import Menu from "@/app/(main-app)/(routes)/documents/[documentId]/_components/menu";
import Publish from "@/app/(main-app)/(routes)/documents/[documentId]/_components/publish";

type NavBarProps = {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

const NavBar = ({ isCollapsed, onResetWidth }: NavBarProps) => {
    const params = useParams();
    const document = useQuery(api.documents.getById, { documentId: params.documentId as Id<"documents"> });

    if (document === undefined) {
        return (
            <nav
                className="bg-background dark:bg-[#1F1F1F] w-full flex items-center"
            >
                <Title.Skeleton />
            </nav>
        )
    }

    if (!document === null) {
        return (
            <div>
                Document not found
            </div>
        )
    }
    return (
        <>
            <nav
                className="bg-background dark:bg-[#1F1F1F] w-full flex items-center gap-x-4 px-3 h-14 border-b border-border dark:border-border-dark"
            >
                {
                    isCollapsed && (
                        <MenuIcon
                            role={"button"}
                            onClick={onResetWidth}
                            className={"h-6 w-6 text-muted-foreground"}
                        />
                    )
                }
                <div
                    className="flex items-center justify-between w-full"
                >
                    <Title
                        data={document}
                    />
                    <div
                        className="flex items-center gap-x-2"
                    >
                        <Menu
                            documentId={document._id}
                        />
                        <Publish
                            data={document}
                        />
                    </div>
                </div>
            </nav>
            {
                document.isArchive && (
                    <Banner
                        documentId={document._id}
                    />
                )
            }
        </>
    );
};

export default NavBar;
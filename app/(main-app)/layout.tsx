'use client';

import React from 'react';
import {useConvexAuth} from "convex/react";
import Spinner from "@/components/ui/spinner";
import {redirect} from "next/navigation";
import Navigation from "@/app/(main-app)/_components/navigation";
import SearchCommand from "@/components/searchCommand";

const MainLayouts = ({ children }: { children: React.ReactNode}) => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    if (isLoading) return (
        <div
            className="w-full flex items-center justify-center h-screen"
        >
            <Spinner size="icon" />
        </div>
    );
    if (!isAuthenticated) return redirect("/")

    return (
        <div
            className="flex h-full"
        >
            <Navigation />
            <main
                className="flex-1 h-full overflow-y-auto"
            >
                <SearchCommand />
                { children }
            </main>
        </div>
    );
};

export default MainLayouts;
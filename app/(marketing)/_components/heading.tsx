'use client';

import React from 'react';
import {Button} from "@/components/ui/button";
import {useConvexAuth} from "convex/react";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()

    return (
        <div
            className="max-w-4xl space-y-4 mx-2"
        >
            <h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold"
            >
                Your thoughts, Documents, Plans, and Ideas Organized with{" "}
                <span
                    className="underline capitalize text-primary"
                >
                    Buildapp
                </span>
            </h1>
            <h3
                className="text-base sm:text-xl md:text-2xl text-gray-700"
            >
                Buildapp is a connected workspace for faster development and productivity.
            </h3>
            {
                isLoading && (
                    <div
                        className="w-full flex items-center justify-center"
                    >
                        <Spinner size="icon" />
                    </div>
                )
            }
            {
                !isAuthenticated && !isLoading && (
                    <Button>
                            Let&apos;s Get Started
                    </Button>
                )
            }
            {
                isAuthenticated && !isLoading && (
                    <Button
                        asChild={true}
                    >
                        <Link
                            href="/documents"
                        >
                            Continue
                        </Link>
                    </Button>
                )
            }
        </div>
    );
};

export default Heading;
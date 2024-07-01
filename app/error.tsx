'use client'

import React from 'react';
import Image from 'next/image';
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Error = () => {
    return (
        <div
            className="h-full  flex flex-col items-center justify-center space-y-4"
        >
            <h2
                className="text-4xl font-bold dark:text-white md:text-5xl lg:text-6xl"
            >
                Something went wrong
            </h2>
            <p>
                An error occurred while trying to load the content.
            </p>
            <Image
                src="/not-found.png"
                width={500}
                height={500}
                alt="Error"
                className="dark:filter dark:brightness-50"
            />
            <Button
                asChild={true}
            >
                <Link
                    href="/documents"
                >
                    Go back
                </Link>
            </Button>
        </div>
    );
};

export default Error;
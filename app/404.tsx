'use client'

import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import {Button} from "@/components/ui/button";

const Custom404 = () => {
    return (
        <div
            className="h-full flex flex-col items-center justify-center space-y-4"
        >
            <Image
                src="/not-found.png"
                width={500}
                height={500}
                alt="Error"
                className="dark:filter dark:brightness-50"
            />
            <Button>
                <Link
                    href="/"
                >
                    Go back
                </Link>
            </Button>
        </div>
    );
};

export default Custom404;
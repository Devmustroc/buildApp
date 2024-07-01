'use client';

import React from 'react';
import useScrollTop from "@/hooks/use-scroll-top";
import {cn} from "@/lib/utils";
import Logo from "@/app/(marketing)/_components/logo";
import {ModeToggle} from "@/components/modeToggle";
import {useConvexAuth} from "convex/react";
import {SignInButton, UserButton} from "@clerk/clerk-react";
import {Button} from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";

const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();
    return (
        <div
            className={cn(
                `z-50 bg-background fixed top-0 flex items-center w-full p-6`,
                scrolled && 'shadow-md border-b'
            )}
        >
            <Logo />
            <div
                className='md:ml-auto md:justify-end justify-start flex items-center w-full gap-x-2'
            >
                <ModeToggle />
                { isLoading && (
                    <Spinner />
                )}
                {
                    !isLoading && !isAuthenticated && (
                        <>
                            <SignInButton
                                mode="modal"
                            >
                                <Button
                                    variant='link'
                                    className="text-gray-900 dark:text-primary"
                                >
                                    Login
                                </Button>
                            </SignInButton>
                            <SignInButton
                                mode="modal"
                            >
                                <Button>
                                    BuildApp For Free
                                </Button>
                            </SignInButton>
                        </>
                    )
                }
                {
                    !isLoading && isAuthenticated && (
                        <>
                            <Button
                                variant='outline'
                                className="text-gray-900 dark:text-primary"
                            >
                                <Link
                                    href="/documents"
                                >
                                    Dashboard
                                </Link>
                            </Button>
                            <UserButton
                                afterSignOutUrl={'/'}
                            />
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
'use client';

import React from 'react';
import {SignOutButton, useUser} from "@clerk/clerk-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {ChevronLeft, ChevronsUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";

const UserItem = () => {
    const { user } = useUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    role={"button"}
                    className="flex items-center text-sm p-3 w-full hover:bg-primary/5 mb-4"
                >
                    <div
                        className="gap-x-2 flex items-center max-w-[150px]"
                    >
                        <Avatar
                            className="h-10 w-10"
                        >
                            <AvatarImage
                                src={user?.imageUrl}
                            />
                        </Avatar>
                        <span
                            className="text-sm line-clamp-1 font-semibold dark:text-white"
                        >
                            {user?.fullName}
                        </span>
                    </div>
                    <ChevronsUpDown
                        className="h-4 w-4 text-muted-foreground left-0"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80 dark:bg-[#1F1F1F]"
                align={"start"}
                alignOffset={11}
                forceMount={true}
            >
                <div
                    className="flex flex-col space-y-4 p-2"
                >
                    <p
                        className="text-sm font-medium leading-none text-muted-foreground"
                    >
                        {user?.emailAddresses[0].emailAddress}
                    </p>
                    <div
                        className="flex items-center gap-x-2"
                    >
                        <div
                            className="rounded-full bg-primary p-1"
                        >
                            <Avatar
                                className="h-8 w-8"
                            >
                                <AvatarImage
                                    src={user?.imageUrl}
                                />
                            </Avatar>
                        </div>
                        <div
                            className="space-y-1"
                        >
                            <p
                                className="text-sm line-clamp-1"
                            >
                                {user?.fullName}
                            </p>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    asChild
                    className="h-full cursor-pointer font-bold flex flex-end"
                >

                        <Button
                            className="w-full hover:bg-emerald-400 dark:hover:bg-emerald-500"
                        >
                            <SignOutButton>
                                Log out
                            </SignOutButton>
                        </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserItem;
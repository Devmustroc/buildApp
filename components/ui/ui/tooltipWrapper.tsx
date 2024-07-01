import React from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";

type TooltipWrapperProps = {
    children: React.ReactNode;
    title: string;
    className?: string;
    position?: "top" | "bottom" | "left" | "right";
};

const TooltipWrapper = ({ children, title, className, position }: TooltipWrapperProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    side={position || "top"}
                    className={cn("bg-[#f97316] dark:bg-[#1F1F1F] text-white dark:text-white",
                                className
                        )}
                >
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TooltipWrapper;
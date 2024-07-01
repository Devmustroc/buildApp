import React from 'react';
import {Loader} from "lucide-react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const spinnerVariants = cva(
    `text-[#ea580c] animate-spin`,
    {
        variants: {
            size: {
                default: 'h-4 w-4',
                sm: 'h-3 w-3',
                lg: 'h-6 w-6',
                icon: 'h-10 w-10'
            }
        },
        defaultVariants: {
            size: 'default'
        },
    }
);

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {

}

const Spinner = ({ size }: SpinnerProps) => {
    return (
        <Loader
            className={cn(spinnerVariants({ size }), 'dark:text-[#ea580c]')}
        />
    );
};

export default Spinner;
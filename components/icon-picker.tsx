'use client';

import React from 'react';
import {useTheme} from "next-themes";
import EmojiPicker, {Theme} from "emoji-picker-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

type IconPickerProps = {
    onChange: (icon: string) => void
    children: React.ReactNode
    asChild?: boolean
}

const IconPicker = ({
    onChange,
    children,
    asChild = false
                    }: IconPickerProps) => {
    const { resolvedTheme } = useTheme();
    const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

    const themeMap = {
        'dark': Theme.DARK,
        'light': Theme.LIGHT
    }

    const theme = themeMap[currentTheme];
    return (
        <Popover>
            <PopoverTrigger
                asChild={asChild}
            >
                {children}
            </PopoverTrigger>
            <PopoverContent
                className="p-0 w-full border-none shadow-none"
            >
                <EmojiPicker
                    onEmojiClick={(data) => onChange(data.emoji)}
                    theme={theme}
                    height={300}
                />
            </PopoverContent>
        </Popover>
    )
};

export default IconPicker;
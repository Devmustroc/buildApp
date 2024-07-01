import React from 'react';
import Logo from "@/app/(marketing)/_components/logo";
import {Button} from "@/components/ui/button";

const Footer = () => {
    return (
        <div
            className="flex items-center w-full p-6 bg-background z-50"
        >
            <Logo />
            <div
                className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground"
            >
                <Button
                    variant="link"
                    className="text-sm text-gray-900 dark:text-primary"
                >
                    Privacy Policy
                </Button>
                <Button
                    variant="link"
                    className="text-sm text-gray-900 dark:text-primary"
                >
                    Terms & conditions
                </Button>
            </div>
        </div>
    );
};

export default Footer;
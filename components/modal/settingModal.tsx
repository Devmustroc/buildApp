'use client'

import React from 'react';
import {useSetting} from "@/hooks/useSetting";
import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {ModeToggle} from "@/components/modeToggle";

const SettingModal = () => {
    const setting = useSetting();
    return (
        <Dialog
            open={setting.isOpen}
            onOpenChange={setting.onClose}
        >
            <DialogContent>
                <DialogHeader
                    className="border-b pb-3"
                >
                    <h2
                        className="text-lg font-medium"
                    >
                        Settings
                    </h2>
                </DialogHeader>
                <div
                    className="flex items-center justify-between"
                >
                    <div
                        className="flex flex-col gap-y-1"
                    >
                        <Label>
                            Appearance
                        </Label>
                        <span
                            className="text-muted-foreground text-[0.8rem] underline"
                        >
                            Change the appearance of the app
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingModal;
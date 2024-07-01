"use client";

import React from 'react';
import SettingModal from "@/components/modal/settingModal";
import CoverImageModal from "@/components/modal/coverImageModal";

const ModalProvider = () => {
    const [mounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
    return (
        <>
            <SettingModal />
            <CoverImageModal />
        </>
    );
};

export default ModalProvider;
import React from 'react';

const PublicLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <div
            className="h-full dark:bg-[#0c0a09] dark:text-white"
        >
            {children}
        </div>
    );
};

export default PublicLayout;
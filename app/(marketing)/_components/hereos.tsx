import React from 'react';
import Image from 'next/image';

const Heroes = () => {
    return (
        <div
            className="flex flex-col items-center justify-center max-w-5xl"
        >
            <div
                className="flex items-center justify-center"
            >
                <div
                    className="relative flex flex-col items-center justify-between w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px]"
                >
                    <Image
                        src="/images/first.png"
                        fill
                        alt={"Documents"}
                    />
                </div>
                <div
                    className="relative hidden  md:flex flex-col items-center justify-between w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px]"
                >
                    <Image
                        src="/images/second.png"
                        fill
                        alt={"Documents"}
                    />
                </div>
            </div>
        </div>
    );
};

export default Heroes;
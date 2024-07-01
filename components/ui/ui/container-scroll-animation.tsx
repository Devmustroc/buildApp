"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
                                    titleComponent,
                                    children,
                                }: {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
}) => {
    const containerRef = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const scaleDimensions = () => {
        return isMobile ? [0.7, 0.9] : [0.9, 1];
    };

    const rotate = useTransform(scrollYProgress, [0, 1], [18, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.4], scaleDimensions());
    const translate = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div
            className="h-[60rem] md:h-[60rem] flex items-center justify-center relative p-2 md:p-20"
            ref={containerRef}
        >
            <div
                className="py-10 md:py-10 w-full relative"
                style={{
                    perspective: "1000px",
                }}
            >
                <Header translate={translate} titleComponent={titleComponent} />
                <Card rotate={rotate} translate={translate} scale={scale}>
                    {children}
                </Card>
            </div>
        </div>
    );
};

export const Header = ({ translate, titleComponent }: any) => {
    return (
        <motion.div
            style={{
                translateY: translate,
            }}
            className="div max-w-5xl mx-auto text-center"
        >
            {titleComponent}
        </motion.div>
    );
};

export const Card = ({
                         rotate,
                         scale,
                         children,
                     }: {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    translate: MotionValue<number>;
    children: React.ReactNode;
}) => {
    return (
        <motion.div
            style={{
                rotateX: rotate,
                scale,
                boxShadow:
                    "0 0 #0000004d, 0 9px 15px #0000004a, 0 15px 15px #00000022, 0 44px 25px #00000026, 0 75px 30px #0000000a, 0 160px 32px #00000003",
            }}
            className="max-w-7xl -mt-5 mx-auto h-[20rem] w-full md:h-[40rem] border-4 border-gray-800 p-2 md:p-6 bg-[#121212] rounded-[30px] shadow-2xl dark:bg-zinc-900 dark:border-zinc-700"
        >
            <div className=" h-full w-full overflow-hidden rounded-2xl bg-transparent dark:bg-zinc-900 md:rounded-2xl md:p-4 ">
                {children}
            </div>
        </motion.div>
    );
};

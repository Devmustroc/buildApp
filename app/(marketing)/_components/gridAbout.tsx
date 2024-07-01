"use client";



import React from "react";
import {
    IconBoxAlignRightFilled,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import {BentoGrid, GridItem} from "@/components/ui/ui/gridBento";
import {cn} from "@/lib/utils";
import {ChevronDown, ChevronRight} from "lucide-react";

export function GridAbout() {
    return (
        <BentoGrid className="max-w-4xl md:auto-rows-[20rem] mx-2">
            {items.map((item, i) => (
                <GridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={cn("[&>p:text-lg]", item.className)}
                    icon={item.icon}
                />
            ))}
        </BentoGrid>
    );
}

const SkeletonOne = () => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: 0,
            rotate: 5,
            transition: {
                duration: 1,
            },
        },
    };
    const variantsSecond = {
        initial: {
            x: 0,
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
            >
                <div className="h-6 w-6 rounded-md bg-gradient-to-r from-emerald-500 to-emerald-300 flex-shrink-0 flex justify-center items-center">
                    <ChevronDown
                        className="h-4 w-4 text-white dark:text-black"
                    />
                </div>
                <div className="w-full bg-amber-500 h-4 rounded-full dark:bg-neutral-900"/>
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-md dark:border-white/[0.2] p-2 items-center space-x-2 ml-auto bg-white dark:bg-black  w-3/4"
            >
                <div className="h-6 w-6 rounded-md bg-gradient-to-r from-amber-700 to-amber-500 flex-shrink-0 flex justify-center items-center">
                    <ChevronRight
                        className="h-4 w-4 text-white dark:text-black"
                    />
                </div>
                <div className="w-full bg-amber-500 h-4 rounded-md dark:bg-neutral-900" />
            </motion.div>
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
            >
                <div className="h-6 w-6 rounded-md bg-gradient-to-r from-amber-700 to-amber-500 flex-shrink-0 flex justify-center items-center">
                    <ChevronRight
                        className="h-4 w-4 text-white dark:text-black"
                    />
                </div>
                <div className="w-full bg-amber-500 h-4 rounded-full dark:bg-neutral-900"/>
            </motion.div>
        </motion.div>
    );
};
const SkeletonTwo = () => {
    const variants = {
        initial: {
            width: 0,
        },
        animate: {
            width: "100%",
            transition: {
                duration: 0.2,
            },
        },
        hover: {
            width: ["0%", "100%"],
            transition: {
                duration: 2,
            },
        },
    };
    const arr = new Array(6).fill(0);
    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
            <Image
                src="/images/blocknote.png"
                alt="hero"
                height={200}
                width={200}
                className="mx-auto rounded-2xl object-cover h-full object-left-top"
                draggable={false}
            />
        </motion.div>
    );
};
const SkeletonThree = () => {
    const variants = {
        initial: {
            backgroundPosition: "0 50%",
        },
        animate: {
            backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
        },
    };
    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
            }}
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
        >
            <Image
                src="/images/video.png"
                alt="hero"
                height={400}
                width={200}
                className="mx-auto rounded-2xl object-contain h-full object-left-top"
                draggable={false}
            />

        </motion.div>
    );
};
const SkeletonFour = () => {
    const first = {
        initial: {
            x: 20,
            rotate: -5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    const second = {
        initial: {
            x: -20,
            rotate: 5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
        >
            <motion.div
                variants={first}
                className="h-full w-1/3 rounded-2xl bg-[#92390b] p-4 dark:bg-[#92390b] dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
            >
                <p className="sm:text-sm text-xs text-center font-semibold text-white mt-4">
                    Create single page documents
                </p>
            </motion.div>
            <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-[#92390b] p-4 dark:bg-[#92390b] dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
                <p className="sm:text-sm text-xs text-center font-semibold text-white mt-4">
                    Create Documentations
                </p>
            </motion.div>
            <motion.div
                variants={second}
                className="h-full w-1/3 rounded-2xl bg-[#92390b] p-4 dark:bg-[#92390b] dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
            >
                <p className="sm:text-sm text-xs text-center font-semibold text-white mt-4">
                    Create Blog's
                </p>
            </motion.div>
        </motion.div>
    );
};
const SkeletonFive = () => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: 10,
            rotate: 5,
            transition: {
                duration: 0.2,
            },
        },
    };
    const variantsSecond = {
        initial: {
            x: 0,
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
            >
                <p className="text-xs text-neutral-500">
                    Summarize your documents with ease.
                    and share them with your team, client or friends.
                    and give a structure to your documents.
                </p>
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
            >
                <p className="text-xs text-neutral-500">Using BlockNote React</p>
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 flex-shrink-0" />
            </motion.div>
        </motion.div>
    );
};
const items = [
    {
        title: "Build Nested Documents",
        description: (
            <span className="text-sm">
            Create nested documents with a powerful editor.
      </span>
        ),
        header: <SkeletonOne />,
        className: "md:col-span-1",
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Various text and code formats",
        description: (
            <span className="text-sm">
            Support for various text and code formats.
      </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-1",
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Images and Videos",
        description: (
            <span className="text-sm">
             Add images and videos to your documents,
             with a flexible upload system.
      </span>
        ),
        header: <SkeletonThree />,
        className: "md:col-span-1",
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Multiple Document Types",
        description: (
            <span className="text-sm">
            Create various types of documents with ease.
            and share them with your team, client or friends.
      </span>
        ),
        header: <SkeletonFour />,
        className: "md:col-span-2",
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },

    {
        title: "Summarize Documents",
        description: (
            <span className="text-sm">
            Summarize your documents with ease.
      </span>
        ),
        header: <SkeletonFive />,
        className: "md:col-span-1",
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
];

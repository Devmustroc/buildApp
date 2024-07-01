import React from 'react';
import {FlipWords} from "@/components/ui/ui/flip-words";
import {ContainerScroll} from "@/components/ui/ui/container-scroll-animation";
import Image from "next/image";

const Detail = () => {
    const words = ["Creativity", "Redaction", "Planification", "Organisation"];
    return (
       <div className="flex flex-col overflow-hidden">
                    <ContainerScroll
                        titleComponent={
                            <>
                                <h1 className="text-md font-semibold text-[#f97316] dark:text-white pb-8">
                                    <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                            <FlipWords words={words}/>
                                    </span>
                                </h1>
                            </>
                        }
                    >
                        <Image
                            src={`/linear.webp`}
                            alt="hero"
                            height={720}
                            width={1400}
                            className="mx-auto rounded-2xl object-cover h-full object-left-top"
                            draggable={false}
                        />
                    </ContainerScroll>
        </div>
    );
};

export default Detail;
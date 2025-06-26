"use client";

import { cn } from "../lib/util";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        image: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards",
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse",
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden ",
                className,
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex w-max min-w-full shrink-0 flex-nowrap gap-1 py-1",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]",
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="relative w-[350px] md:h-atuo h-40  max-w-full shrink-0  border border-b-0 border-zinc-200 bg-white md:w-[350px] dark:border-zinc-700 dark:bg-[#18181b]"
                        key={idx}
                    >
                        <div className="relative h-full w-full">
                            <Image
                                src={item.image}
                                alt=""
                                width={450}
                                height={300}
                                className="rounded-xl object-cover w-full h-full"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
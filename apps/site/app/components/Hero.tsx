import Image from "next/image";
import { ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import SocialLinks from "./SocialLinks";

interface HeroProps {
    imageSrc: string;
    name: string;
    description: ReactNode;
}

export default function Hero({ imageSrc, name, description }: HeroProps) {
    return (
        <section className="flex flex-col items-start text-left mb-12 sm:mb-20">
            {/* Name with Profile Image */}
            <div className="flex items-end gap-3 sm:gap-4 mb-2 sm:mb-3">
                <div className="w-14 h-14 sm:w-[88px] sm:h-[88px] rounded-xl overflow-hidden border-4 border-gray-300/50 dark:border-neutral-700 shrink-0">
                    <Image
                        src={imageSrc}
                        alt={name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Hey, I&apos;m {name}
                </h1>
            </div>

            {/* Description */}
            <p className="max-w-2xl text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                I&apos;m a freshman at the{" "}
                <a
                    href="https://www.unl.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-neutral-900 dark:text-neutral-100 decoration-neutral-300 dark:decoration-neutral-600 underline underline-offset-4 hover:decoration-neutral-500 dark:hover:decoration-neutral-400 transition-colors"
                >
                    <img src="/nebraska.png" alt="" className="w-4 h-4 mr-1 inline-block" />
                    University of Nebraska-Lincoln
                </a>{" "}
                studying Computer Science and Data. I ship full-stack applications in my free time.
                Check out my{" "}
                <a
                    href="/blog"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-neutral-900 dark:text-neutral-100 decoration-neutral-300 dark:decoration-neutral-600 underline underline-offset-4 hover:decoration-neutral-500 dark:hover:decoration-neutral-400 transition-colors"
                >
                    <FiArrowUpRight className="mr-0.5 w-4 h-4 inline-block" />
                    blog
                </a>!
            </p>

            <SocialLinks />
        </section>
    );
}

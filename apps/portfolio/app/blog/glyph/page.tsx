import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import GlyphFlowDiagram from "./GlyphFlowDiagram";
import TableOfContents from "./TableOfContents";

const sections = [
    { id: "the-build", label: "The Build" },
    { id: "where-it-broke", label: "Where It Broke" },
    { id: "market-reality", label: "The Market Reality" },
    { id: "what-i-took-away", label: "What I Took Away" },
];

export default function GlyphBlogPost() {
    return (
        <div className="min-h-screen">
            <main className="mx-auto max-w-[680px] px-4 sm:px-6 pt-12 sm:pt-20 pb-32 relative">
                <aside className="hidden lg:block absolute -left-44 top-0 bottom-0 w-36">
                    <nav className="sticky top-[38%] -translate-y-1/2">
                        <TableOfContents sections={sections} />
                    </nav>
                </aside>

                <Link
                    href="/"
                    className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors mb-8"
                >
                    <FiArrowLeft className="mr-1.5" />
                    Back to Home
                </Link>

                <article>
                    {/* Header */}
                    <header className="mb-10 sm:mb-12">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 tracking-wide">
                            February 2026 &middot; 3 Min Read
                        </p>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 leading-tight mb-4">
                            I Spent Three Months Building Something Nobody Wanted
                        </h1>
                        <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            The story of Glyph, an AI-powered carousel generator for nonprofits&mdash;and why it never shipped.
                        </p>
                    </header>

                    {/* Body */}
                    <div className="space-y-6 text-base leading-[1.75] text-neutral-700 dark:text-neutral-300">
                        <p>
                            In December 2025, I stumbled across a founder on Instagram
                            who had built a tool to automate carousel posts for his
                            nonprofit. Bold headline, branded colors, simple
                            layout&mdash;the same visual template, over and over. It
                            seemed like the kind of repetitive work AI could handle. I
                            thought I could build it{" "}
                            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                                better
                            </span>.
                        </p>

                        <p>
                            So I started Glyph as an honors project. The idea was
                            simple: paste an Instagram handle, let AI analyze the
                            account&apos;s visual style, and generate new carousel slides
                            that feel on-brand. I&apos;d interned at{" "}
                            <a
                                href="https://www.restoringrainbows.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-neutral-500 dark:hover:decoration-neutral-400 transition-colors"
                            >
                                Restoring Rainbows
                            </a>{" "}
                            during high school, one of the largest youth-led nonprofits,
                            so I felt I had the connections to grow something like this.
                        </p>

                        <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                            I did not do a single minute of user validation before
                            writing code.
                        </p>

                        {/* Section: The Build */}
                        <h2 id="the-build" className="text-xl font-bold text-neutral-900 dark:text-neutral-100 pt-4">
                            The Build
                        </h2>

                        <p>
                            For three months, I refined the pipeline. Glyph scraped
                            posts via Apify, ran them through Gemini for visual analysis,
                            then fed everything into a multi-stage &ldquo;Creative
                            Director&rdquo; and &ldquo;Art Director&rdquo; orchestration
                            layer. FLUX.2 Pro generated backgrounds on Replicate. Satori
                            and Sharp composited text overlays.
                        </p>

                        <GlyphFlowDiagram />

                        <p>
                            The architecture was ambitious&mdash;maybe too ambitious.
                            Multi-stage AI orchestration, design-thinking frameworks,
                            percent-based layout coordinates. It was{" "}
                            <span className="italic">engineered</span>.
                        </p>

                        <p>
                            And for simple posts, it worked. The pipeline could analyze
                            an account&apos;s style and produce something that felt
                            right. I was making real progress.
                        </p>

                        {/* Section: Where It Broke */}
                        <h2 id="where-it-broke" className="text-xl font-bold text-neutral-900 dark:text-neutral-100 pt-4">
                            Where It Broke
                        </h2>

                        <p>
                            Then I tried more complex posts. Multi-element layouts.
                            Nuanced brand photography. Carousels that needed to feel
                            like a human designer understood the organization&apos;s
                            mission. It felt like starting from zero.
                        </p>

                        <p>
                            The pipeline that worked for simple slides couldn&apos;t
                            handle the jump. Backgrounds bled colors between elements.
                            And the images themselves just looked{" "}
                            <span className="italic">off</span>. Not broken, but not
                            right either. One workaround, then another, then another.
                        </p>

                        <p>
                            AI wasn&apos;t failing. It was limited in the way I was
                            trying to use it&mdash;I was asking it to replicate
                            something that requires genuine design judgment, and no
                            amount of prompt engineering could bridge that gap. I stopped
                            debugging and started asking myself a different question:{" "}
                            <span className="italic">
                                Is this struggle actually leading somewhere meaningful?
                            </span>
                        </p>

                        {/* Section: The Market Reality */}
                        <h2 id="market-reality" className="text-xl font-bold text-neutral-900 dark:text-neutral-100 pt-4">
                            The Market Reality
                        </h2>

                        <p>
                            That question pushed me to do something I should have done
                            on day one&mdash;talk to the people I was building for.
                        </p>

                        <p>
                            The answer was immediate. Nonprofits have{" "}
                            <span className="italic">hundreds</span> of volunteers.
                            Making Instagram carousels is exactly the kind of task they
                            delegate for free. Why would they pay for an AI tool to
                            do it?
                        </p>

                        <p>
                            The struggle wasn&apos;t meaningful&mdash;not because the
                            technology couldn&apos;t improve, but because even a perfect
                            version of Glyph would be solving a problem that
                            didn&apos;t exist.
                        </p>

                        {/* Section: What I Took Away */}
                        <h2 id="what-i-took-away" className="text-xl font-bold text-neutral-900 dark:text-neutral-100 pt-4">
                            What I Took Away
                        </h2>

                        <div className="border-l-2 border-neutral-300 dark:border-neutral-600 pl-5 my-6">
                            <p className="text-neutral-600 dark:text-neutral-400 italic text-[17px] leading-relaxed">
                                &ldquo;Make something people want.&rdquo;
                            </p>
                            <p className="text-neutral-500 dark:text-neutral-500 text-sm mt-2">
                                &mdash; Paul Graham
                            </p>
                        </div>

                        <p>
                            Three months of work and nothing to ship. That stung.
                        </p>

                        <p>
                            But the lessons were worth every hour&mdash;AI orchestration,
                            image compositing, prompt engineering. I pushed against the
                            limits of what the technology can do. And I learned the
                            hardest lesson in building products:{" "}
                            <span className="font-bold text-neutral-900 dark:text-neutral-100">
                                talk to users before you write a single line of code
                            </span>.
                        </p>

                        <p>
                            Glyph never shipped. But I came out of it knowing how to
                            orchestrate multi-stage AI systems&mdash;and knowing that the
                            next thing I build starts with a conversation, not a codebase.
                        </p>
                    </div>
                </article>
            </main>
        </div>
    );
}

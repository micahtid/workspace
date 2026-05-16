"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const steps = [
    { num: "01", title: "Scrape", details: ["Apify Instagram Scraper (Up to 10 Posts)", "Compressed via Sharp, Uploaded to Convex", "Gemini 2.5 Flash Outlier Filter"], accent: "bg-blue-400/80 dark:bg-blue-400/60", border: "border-blue-300 dark:border-blue-500/40" },
    { num: "02", title: "Analyze", details: ["Gemini 2.5 Flash Visual Analysis", "Extracts Style, Colors, and Structure", "Cached in Convex for Reuse"], accent: "bg-teal-400/80 dark:bg-teal-400/60", border: "border-teal-300 dark:border-teal-500/40" },
    { num: "03", title: "Creative Dir.", details: ["Gemini 3 Flash Preview Orchestration", "5-Lens Design Thinking Framework", "Outputs FLUX Prompt and Style Tokens"], accent: "bg-emerald-400/80 dark:bg-emerald-400/60", border: "border-emerald-300 dark:border-emerald-500/40" },
    { num: "04", title: "FLUX.2 Pro", details: ["Art-Only Background Generation", "Prompt and Tokens from Creative Director", "Powered by Replicate"], accent: "bg-amber-400/80 dark:bg-amber-400/60", border: "border-amber-300 dark:border-amber-500/40" },
    { num: "05", title: "Art Director", details: ["Gemini 3 Flash Sees Generated Background", "6-Lens Vision Analysis", "Outputs Percent-Based Layout Coordinates"], accent: "bg-orange-400/80 dark:bg-orange-400/60", border: "border-orange-300 dark:border-orange-500/40" },
    { num: "06", title: "Composite", details: ["Satori Text Overlay with Google Fonts", "Sharp Composites Background and Assets", "Final 1080x1080 Carousel Slide"], accent: "bg-rose-400/80 dark:bg-rose-400/60", border: "border-rose-300 dark:border-rose-500/40" },
];


function Node({ step, isActive, onEnter, onLeave }: {
    step: typeof steps[0];
    isActive: boolean;
    onEnter: () => void;
    onLeave: () => void;
}) {
    return (
        <div
            className="flex-1 min-w-0"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <div className={`rounded-lg border p-2 sm:p-2.5 text-center transition-all duration-200 cursor-default ${
                isActive
                    ? `${step.border} bg-neutral-50 dark:bg-neutral-800/60`
                    : "border-neutral-200 dark:border-neutral-700/60 hover:border-neutral-300 dark:hover:border-neutral-600"
            }`}>
                <div className={`${step.accent} w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white mx-auto mb-1`}>
                    {step.num}
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-neutral-800 dark:text-neutral-200 leading-tight truncate">
                    {step.title}
                </div>
            </div>
        </div>
    );
}

function HArrow({ dir }: { dir: "right" | "left" }) {
    return (
        <div className="shrink-0 w-4 sm:w-5 flex items-center justify-center">
            <svg width="100%" height="10" viewBox="0 0 20 10" className="text-neutral-300 dark:text-neutral-600">
                {dir === "right" ? (
                    <>
                        <line x1="0" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1.5" />
                        <polygon points="14,2 20,5 14,8" fill="currentColor" />
                    </>
                ) : (
                    <>
                        <line x1="6" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="1.5" />
                        <polygon points="6,2 0,5 6,8" fill="currentColor" />
                    </>
                )}
            </svg>
        </div>
    );
}

function VConnector({ side }: { side: "left" | "right" }) {
    const spacer = <div className="flex-1 min-w-0" />;
    const arrowGap = <div className="shrink-0 w-4 sm:w-5" />;
    const line = (
        <div className="flex-1 min-w-0 flex justify-center py-0.5">
            <svg width="10" height="14" viewBox="0 0 10 14" className="text-neutral-300 dark:text-neutral-600">
                <line x1="5" y1="0" x2="5" y2="8" stroke="currentColor" strokeWidth="1.5" />
                <polygon points="2,8 5,14 8,8" fill="currentColor" />
            </svg>
        </div>
    );

    return (
        <div className="flex gap-1.5">
            {side === "right" ? (
                <>{spacer}{arrowGap}{spacer}{arrowGap}{line}</>
            ) : (
                <>{line}{arrowGap}{spacer}{arrowGap}{spacer}</>
            )}
        </div>
    );
}

export default function GlyphFlowDiagram() {
    const [active, setActive] = useState<number | null>(null);
    const leaveTimer = useRef<ReturnType<typeof setTimeout>>(null);

    const enter = useCallback((i: number) => {
        if (leaveTimer.current) clearTimeout(leaveTimer.current);
        setActive(i);
    }, []);

    const leave = useCallback(() => {
        leaveTimer.current = setTimeout(() => setActive(null), 350);
    }, []);

    return (
        <div className="my-8 sm:my-10">
            <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                The Pipeline
            </h3>

            {/* Desktop: 3x2 snake flowchart */}
            <div className="hidden sm:block">
                {/* Row 1: Scrape → Analyze → Creative Dir. */}
                <div className="flex items-center gap-1.5">
                    <Node step={steps[0]} isActive={active === 0} onEnter={() => enter(0)} onLeave={leave} />
                    <HArrow dir="right" />
                    <Node step={steps[1]} isActive={active === 1} onEnter={() => enter(1)} onLeave={leave} />
                    <HArrow dir="right" />
                    <Node step={steps[2]} isActive={active === 2} onEnter={() => enter(2)} onLeave={leave} />
                </div>

                <VConnector side="right" />

                {/* Row 2: Composite ← Art Dir. ← FLUX.2 Pro */}
                <div className="flex items-center gap-1.5">
                    <Node step={steps[5]} isActive={active === 5} onEnter={() => enter(5)} onLeave={leave} />
                    <HArrow dir="left" />
                    <Node step={steps[4]} isActive={active === 4} onEnter={() => enter(4)} onLeave={leave} />
                    <HArrow dir="left" />
                    <Node step={steps[3]} isActive={active === 3} onEnter={() => enter(3)} onLeave={leave} />
                </div>

                {/* Detail panel — outer shell animates height, inner content cross-fades */}
                <AnimatePresence>
                    {active !== null && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            className="overflow-hidden"
                        >
                            <div className={`mt-3 rounded-lg border bg-neutral-50/60 dark:bg-neutral-800/30 transition-colors duration-300 ${steps[active].border}`}>
                                <div className="px-3.5 py-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`${steps[active].accent} w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-white shrink-0 transition-colors duration-300`}>
                                            {steps[active].num}
                                        </div>
                                        <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                            {steps[active].title}
                                        </span>
                                    </div>
                                    <ul className="space-y-1 pl-7">
                                        {steps[active].details.map((d) => (
                                            <li
                                                key={d}
                                                className="text-[13px] text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                                            >
                                                <span className="mt-[7px] w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 shrink-0" />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile: compact vertical flow */}
            <div className="sm:hidden">
                <div className="space-y-0">
                    {steps.map((step, i) => (
                        <div key={step.num}>
                            <div
                                className={`flex items-center gap-2.5 py-2 px-2 rounded-lg cursor-default transition-all duration-200 ${
                                    active === i
                                        ? `${step.border} border bg-neutral-50/60 dark:bg-neutral-800/30`
                                        : "border border-transparent"
                                }`}
                                onClick={() => setActive(active === i ? null : i)}
                            >
                                <div className={`${step.accent} w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                                    {step.num}
                                </div>
                                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex-1">
                                    {step.title}
                                </span>
                                <motion.span
                                    animate={{ rotate: active === i ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-neutral-400 dark:text-neutral-500 text-sm shrink-0"
                                >
                                    +
                                </motion.span>
                            </div>
                            <AnimatePresence>
                                {active === i && (
                                    <motion.ul
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                                        className="overflow-hidden pl-[42px] pr-2 pt-1.5 pb-2 space-y-1"
                                    >
                                        {step.details.map((d) => (
                                            <li
                                                key={d}
                                                className="text-xs text-neutral-500 dark:text-neutral-400"
                                            >
                                                {d}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                            {i < steps.length - 1 && active !== i && (
                                <div className="pl-2">
                                    <div className="w-6 flex justify-center py-0.5">
                                        <div className="w-px h-2 bg-neutral-300 dark:bg-neutral-600" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

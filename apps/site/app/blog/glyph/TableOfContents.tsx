"use client";

import { useEffect, useState } from "react";

interface Section {
    id: string;
    label: string;
}

export default function TableOfContents({
    sections,
}: {
    sections: Section[];
}) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            { rootMargin: "-20% 0px -60% 0px" }
        );

        for (const section of sections) {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, [sections]);

    return (
        <ul className="space-y-3 text-sm">
            {sections.map((section) => (
                <li key={section.id}>
                    <button
                        onClick={() => {
                            document
                                .getElementById(section.id)
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`text-left transition-colors duration-200 ${
                            activeId === section.id
                                ? "text-neutral-800 dark:text-neutral-200"
                                : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400"
                        }`}
                    >
                        {section.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}

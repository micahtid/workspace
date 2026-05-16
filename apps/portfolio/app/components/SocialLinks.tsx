"use client";

import { useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
    { href: "https://www.linkedin.com/in/micah-tidball-a1b28231b/", icon: <FaLinkedin size={20} />, label: "LinkedIn" },
    { href: "https://github.com/micahtid", icon: <FaGithub size={20} />, label: "GitHub" },
    { href: "/resume.pdf", icon: <FiPaperclip size={20} />, label: "Resume" },
];

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="relative">
            <div className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 text-sm px-2.5 py-1 rounded whitespace-nowrap transition-all ease-out ${hovered ? "duration-300" : "duration-150"} pointer-events-none ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
                {label}
            </div>
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {icon}
            </a>
        </div>
    );
}

export default function SocialLinks() {
    return (
        <div className="flex items-center gap-3 mt-6">
            {links.map((link) => (
                <SocialIcon key={link.label} {...link} />
            ))}
        </div>
    );
}

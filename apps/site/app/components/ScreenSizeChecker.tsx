"use client";

import { useEffect, useState } from "react";
import { FiSmartphone } from "react-icons/fi";

export default function ScreenSizeChecker() {
    const [isTooSmall, setIsTooSmall] = useState(false);

    useEffect(() => {
        const checkSize = () => {
            setIsTooSmall(window.innerWidth < 300);
        };

        // Check immediately
        checkSize();

        // Add listener
        window.addEventListener("resize", checkSize);

        // Cleanup
        return () => window.removeEventListener("resize", checkSize);
    }, []);

    if (!isTooSmall) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-[#F1F5F9] dark:bg-neutral-900 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <FiSmartphone className="text-neutral-400 dark:text-neutral-500 text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">Screen Too Small</h1>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xs leading-relaxed">
                This portfolio is best viewed on a device with a width of at least 300px.
            </p>
        </div>
    );
}

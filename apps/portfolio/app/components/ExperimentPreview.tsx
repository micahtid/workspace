"use client";

import Image from "next/image";

interface ExperimentPreviewProps {
    src?: string;
    alt: string;
    title: string;
    placeholder?: React.ReactNode;
}

export default function ExperimentPreview({ src, alt, title, placeholder }: ExperimentPreviewProps) {
    return (
        <div className="experiment-preview">
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    width={500}
                    height={300}
                    className="w-full h-auto rounded-xl"
                    unoptimized
                />
            ) : (
                <div className="w-full h-48 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    {placeholder}
                </div>
            )}
            <span className="experiment-title">{title}</span>
        </div>
    );
}

import { FaGithub } from "react-icons/fa";

interface HackathonCardProps {
    name: string;
    award: string;
    githubLink?: string;
}

export default function HackathonCard({
    name,
    award,
    githubLink,
}: HackathonCardProps) {
    return (
        <div className="flex flex-row justify-between items-center py-1.5 transition-colors">
            <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-neutral-800 dark:text-neutral-200 font-medium truncate">{name}</span>
                <span className="text-neutral-500 dark:text-neutral-400 text-sm truncate">{award}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-3">
                {githubLink && (
                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                    >
                        <FaGithub size={16} />
                    </a>
                )}
            </div>
        </div>
    );
}

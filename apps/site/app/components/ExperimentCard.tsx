import { FaGithub, FaGlobe } from "react-icons/fa";

interface ExperimentCardProps {
    title: string;
    description?: string;
    githubLink?: string;
    websiteLink?: string;
}

export default function ExperimentCard({
    title,
    githubLink,
    websiteLink,
}: ExperimentCardProps) {
    return (
        <div className="flex flex-row justify-between items-center py-1.5 -mx-2 px-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
            <span className="text-neutral-800 dark:text-neutral-200 font-medium truncate min-w-0">{title}</span>
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
                {websiteLink && (
                    <a
                        href={websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                    >
                        <FaGlobe size={16} />
                    </a>
                )}
            </div>
        </div>
    );
}

import Link from "next/link";

interface BlogCardProps {
    title: string;
    date: string;
    excerpt?: string;
    link: string;
    category?: string;
}

export default function BlogCard({ title, date, link }: BlogCardProps) {
    return (
        <Link
            href={link}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 -mx-2 px-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group"
        >
            <span className="text-neutral-800 dark:text-neutral-200 font-medium">{title}</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm shrink-0">{date}</span>
        </Link>
    );
}

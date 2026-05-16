import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F5F9] dark:bg-neutral-900 px-6 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">404</h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-6">
                Page Not Found
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-8 leading-relaxed">
                The page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
                href="/"
                className="bg-black/80 dark:bg-white/90 text-white dark:text-neutral-900 px-6 py-3 rounded-xl font-medium text-sm hover:bg-black dark:hover:bg-white transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
}

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import BlogCard from "../components/BlogCard";
import { blogPosts } from "./posts";

export const metadata = {
  title: "Blog",
  description: "Writing on building, shipping, and lessons learned.",
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-[680px] px-4 sm:px-6 pt-12 sm:pt-20 pb-32">
        <Link
          href="/"
          className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors mb-8"
        >
          <FiArrowLeft className="mr-1.5" />
          Back
        </Link>

        <article className="prose prose-neutral max-w-none">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
            Blog
          </h1>

          {blogPosts.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Coming soon...
            </p>
          ) : (
            <div>
              {blogPosts.map((post) => (
                <BlogCard key={post.title} {...post} />
              ))}
            </div>
          )}
        </article>
      </main>
    </div>
  );
}

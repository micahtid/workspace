import { FiArrowUpRight } from "react-icons/fi";
import Hero from "./components/Hero";
import ExperienceCard from "./components/ExperienceCard";
import ExperimentCard from "./components/ExperimentCard";
import HackathonCard from "./components/HackathonCard";
import BlogCard from "./components/BlogCard";
import ContactForm from "./components/ContactForm";
import ThemeToggle from "./components/ThemeToggle";
import { blogPosts } from "./blog/posts";

import Link from "next/link";

const experiences = [
  {
    label: "SWE Intern @ Hudl",
    dateRange: "May 2026 - Present",
    link: "/experience/hudl",
    imageSrc: "/hudl.jpg",
  },
  {
    label: "SWE @ FindU",
    dateRange: "Aug 2025 - Dec 2025",
    link: "/experience/findu",
    imageSrc: "/findu.jpg",
  },
];

const hackathons = [
  {
    name: "HackKU",
    award: "Track Winner",
    githubLink: "https://github.com/AruneemB/hackku",
  },
  {
    name: "RaikesHacks",
    award: "Track Winner",
    githubLink: "https://github.com/AruneemB/raikeshacks",
  },
  {
    name: "Hack Midwest",
    award: "2nd Place",
    githubLink: "https://github.com/micahtid/hackmidwest",
  },
];

const experiments = [
  { title: "SnipCode" },
  { title: "CustomCanvas" },
  {
    title: "Restoring Rainbows",
    githubLink: "https://github.com/micahtid/restoring-rainbows",
  },
];

// On hover, dim every non-hovered row (and its children) to a soft gray so the
// hovered row stands out — no background fill. Applied to each section list.
const rowGroup =
  "[&_*]:transition [&_*]:duration-[450ms] [&_*]:ease-[cubic-bezier(0.65,0,0.35,1)] " +
  "[&:has(>*:hover)>*:not(:hover)]:text-neutral-300 dark:[&:has(>*:hover)>*:not(:hover)]:text-neutral-600 " +
  "[&:has(>*:hover)>*:not(:hover)_*]:text-neutral-300 dark:[&:has(>*:hover)>*:not(:hover)_*]:text-neutral-600 " +
  "[&:has(>*:hover)>*:not(:hover)_img]:grayscale [&:has(>*:hover)>*:not(:hover)_img]:opacity-40";

export default function Home() {
  const recentPosts = blogPosts.slice(0, 3);


  return (
    <div>
      {/* Hero - fills viewport, content slightly above center */}
      <div className="min-h-[85vh] sm:h-screen flex items-center justify-center pt-12 sm:pt-0 sm:-mt-12">
        <main className="mx-auto max-w-[680px] px-6 sm:px-6 w-full relative">
          {/* <div className="absolute -top-12 right-0 mr-1 sm:mr-0">
            <ThemeToggle />
          </div> */}
          <Hero
            imageSrc="/profile.jpg"
            name="Micah Tidball"
            description="I'm a freshman at the University of Nebraska-Lincoln studying Computer Science and Data. I ship full-stack applications in my free time. Check out my blog!"
          />
        </main>
      </div>

      {/* Rest of content - peeks above the fold */}
      <main className="mx-auto max-w-[680px] px-6 sm:px-6 -mt-16 sm:-mt-32">
        {/* Experience Section */}
        <section className="mb-10 sm:mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 shrink-0">Work Experience</h2>
            <div className="h-px bg-neutral-200 dark:bg-neutral-800 grow ml-4" />
          </div>
          <div className={rowGroup}>
            {experiences.map((exp) => (
              <ExperienceCard key={exp.label} {...exp} />
            ))}
          </div>
        </section>

        {/* Experiments Section */}
        <section className="mb-10 sm:mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 shrink-0">Experiments</h2>
            <div className="h-px bg-neutral-200 dark:bg-neutral-800 grow mx-4" />
            <a
              href="https://github.com/micahtid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-neutral-900 dark:text-neutral-100 decoration-neutral-300 dark:decoration-neutral-600 underline underline-offset-4 hover:decoration-neutral-500 dark:hover:decoration-neutral-400 transition-colors text-sm font-medium shrink-0"
            >
              <FiArrowUpRight className="mr-0.5 w-4 h-4 inline-block" />
              View all
            </a>
          </div>
          <div className={rowGroup}>
            {experiments.map((exp) => (
              <ExperimentCard key={exp.title} {...exp} />
            ))}
          </div>
        </section>

        {/* Hackathons Section */}
        <section className="mb-10 sm:mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 shrink-0">Hackathons</h2>
            <div className="h-px bg-neutral-200 dark:bg-neutral-800 grow mx-4" />
            <a
              href="https://github.com/micahtid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-neutral-900 dark:text-neutral-100 decoration-neutral-300 dark:decoration-neutral-600 underline underline-offset-4 hover:decoration-neutral-500 dark:hover:decoration-neutral-400 transition-colors text-sm font-medium shrink-0"
            >
              <FiArrowUpRight className="mr-0.5 w-4 h-4 inline-block" />
              View all
            </a>
          </div>
          <div className={rowGroup}>
            {hackathons.map((h) => (
              <HackathonCard key={h.name} {...h} />
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="mb-10 sm:mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 shrink-0">Blog</h2>
            <div className="h-px bg-neutral-200 dark:bg-neutral-800 grow mx-4" />
            <Link
              href="/blog"
              className="inline-flex items-center text-neutral-900 dark:text-neutral-100 decoration-neutral-300 dark:decoration-neutral-600 underline underline-offset-4 hover:decoration-neutral-500 dark:hover:decoration-neutral-400 transition-colors text-sm font-medium shrink-0"
            >
              <FiArrowUpRight className="mr-0.5 w-4 h-4 inline-block" />
              View all
            </Link>
          </div>
          <div className={rowGroup}>
            {recentPosts.map((post) => (
              <BlogCard key={post.title} {...post} />
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="mb-0">
          <ContactForm />
        </section>
      </main>
    </div>
  );
}

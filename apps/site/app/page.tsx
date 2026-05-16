import { FiArrowUpRight } from "react-icons/fi";
import Hero from "./components/Hero";
import ExperienceCard from "./components/ExperienceCard";
import ExperimentCard from "./components/ExperimentCard";
import BlogCard from "./components/BlogCard";
import ContactForm from "./components/ContactForm";
import ThemeToggle from "./components/ThemeToggle";

import Link from "next/link";

const experiences = [
  {
    label: "SWE Intern @ Hudl",
    dateRange: "May 2026 - Present",
    link: "/experience/hudl",
    // imageSrc: "/hudl.png",
  },
  {
    label: "SWE @ FindU",
    dateRange: "Aug 2025 - Dec 2025",
    link: "/experience/findu",
    // imageSrc: "/findu.png",
  },
];

const experiments = [
  // {
  //   title: "Glyph",
  //   description: "Coming soon!",
  // },
  // {
  //   title: "SnipCode",
  //   description: "Coming soon!",
  // },
  {
    title: "Restoring Rainbows",
    description: "An organizational website for a global youth-led NPO, featuring an admin dashboard for centralized data management.",
    githubLink: "https://github.com/micahtid/restoring-rainbows",
    websiteLink: "https://www.restoringrainbows.org/",
  },
  {
    title: "Mira",
    description: "A volunteer platform for youth-led organizations to create and track internship and volunteer opportunities.",
    githubLink: "https://github.com/micahtid/mira",
  },
];

const blogPosts = [
  {
    title: "I Spent Three Months Building Something Nobody Wanted",
    date: "February 2026",
    excerpt: "The story of Glyph, an AI-powered carousel generator for nonprofits — and why it never shipped.",
    link: "/blog/glyph",
    category: "Lessons Learned",
  },
];

export default function Home() {

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
          <div>
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
          <div>
            {experiments.map((exp) => (
              <ExperimentCard key={exp.title} {...exp} />
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
          <div>
            {blogPosts.map((post) => (
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

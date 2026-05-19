export interface BlogPost {
  title: string;
  date: string;
  excerpt?: string;
  link: string;
  category?: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "I Spent Three Months Building Something Nobody Wanted",
    date: "February 2026",
    excerpt:
      "The story of Glyph, an AI-powered carousel generator for nonprofits — and why it never shipped.",
    link: "/blog/glyph",
    category: "Lessons Learned",
  },
];

import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./convex-provider";
import { PageTransition } from "./components/PageTransition";

export const metadata: Metadata = {
  title: "Personal Hub",
  description: "A minimal hub for tracking workouts and habits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <ConvexClientProvider>
          <PageTransition>{children}</PageTransition>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

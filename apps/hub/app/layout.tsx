import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./convex-provider";
import { PageTransition } from "./components/PageTransition";

const manrope = Manrope({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hub",
  description: "A minimal hub for tracking workouts and habits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body suppressHydrationWarning>
        <ConvexClientProvider>
          <PageTransition>{children}</PageTransition>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

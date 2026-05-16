import type { Metadata, Viewport } from "next";
import { Manrope, Rock_Salt } from "next/font/google";
import "./globals.css";
import ScreenSizeChecker from "./components/ScreenSizeChecker";


const manrope = Manrope({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const rockSalt = Rock_Salt({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Micah's Page",
  description: "Micah Tidball's personal portfolio.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body
        className={`${manrope.variable} ${rockSalt.variable} antialiased`}
        suppressHydrationWarning
      >
        <ScreenSizeChecker />
        {children}
      </body>
    </html>
  );
}

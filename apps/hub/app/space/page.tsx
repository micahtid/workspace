"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CanvasSurface } from "./CanvasSurface";

export default function SpacePage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-ink-0">
      <Link
        href="/"
        className="back-link absolute left-4 top-4 z-10 sm:left-6 sm:top-6"
      >
        <ChevronLeft size={16} aria-hidden />
        Hub
      </Link>
      <CanvasSurface />
    </div>
  );
}

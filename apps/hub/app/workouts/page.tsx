"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Calendar } from "./Calendar";
import { DayDetail } from "./DayDetail";
import { localDateString } from "@/lib/date";

export default function WorkoutsPage() {
  const [selected, setSelected] = useState<string>(localDateString(new Date()));

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-[680px] lg:max-w-[680px] mx-auto w-full px-5 sm:px-6 py-10 sm:py-12">
        <PageHeader
          back={{ href: "/", label: "Hub" }}
          title="Workouts"
          subtitle="Pick a day, pick a workout, log the reps."
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-7 lg:items-start">
          <div className="lg:sticky lg:top-6">
            <Calendar selected={selected} onSelect={setSelected} />
          </div>
          <DayDetail date={selected} />
        </div>

        <div className="mt-10">
          <Link href="/workouts/manage" className="btn btn-ghost w-full">
            Edit Workouts
          </Link>
        </div>
      </main>
    </div>
  );
}

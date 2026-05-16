import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { logoutAction } from "./actions";
import { listSubdomains, type DnsRecord } from "./lib/cloudflare";
import { hasValidSession } from "./lib/session";

export const metadata = {
    title: "Admin",
    robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function isMainDomain(record: DnsRecord, zone: string): boolean {
    if (!zone) return false;
    return record.name === zone || record.name === `www.${zone}`;
}

function RecordList({ records }: { records: DnsRecord[] }) {
    return (
        <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {records.map((r) => (
                <li
                    key={r.id}
                    className="flex items-center justify-between gap-4 py-3"
                >
                    <div className="min-w-0">
                        <a
                            href={`https://${r.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline underline-offset-4 truncate"
                        >
                            {r.name}
                        </a>
                        <p className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                            <span>{r.type}</span>
                            <ArrowRight className="w-3 h-3 shrink-0" />
                            <span className="truncate">{r.content}</span>
                        </p>
                    </div>
                    <span
                        className={`shrink-0 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded ${
                            r.proxied
                                ? "bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300"
                                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                        }`}
                    >
                        {r.proxied ? "Proxied" : "DNS only"}
                    </span>
                </li>
            ))}
        </ul>
    );
}

function SectionHeader({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 shrink-0">
                {title}
            </h2>
            <div className="h-px bg-neutral-200 dark:bg-neutral-800 grow ml-4" />
        </div>
    );
}

export default async function AdminPage() {
    if (!(await hasValidSession())) redirect("/admin/login");

    const result = await listSubdomains();
    const mainDomains = result.ok
        ? result.records.filter((r) => isMainDomain(r, result.zone))
        : [];
    const subdomains = result.ok
        ? result.records.filter((r) => !isMainDomain(r, result.zone))
        : [];

    return (
        <div className="min-h-screen">
            <main className="mx-auto max-w-[680px] px-4 sm:px-6 pt-12 sm:pt-20 pb-32">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                            Admin
                        </h1>
                        {result.ok && result.zone && (
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                                Cloudflare Zone: {result.zone}
                            </p>
                        )}
                    </div>
                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer border-none bg-transparent transition-colors"
                        >
                            Sign out
                        </button>
                    </form>
                </div>

                {!result.ok ? (
                    <div className="rounded-md border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                        {result.error}
                    </div>
                ) : result.records.length === 0 ? (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        No DNS records found.
                    </p>
                ) : (
                    <>
                        {mainDomains.length > 0 && (
                            <section className="mb-10">
                                <SectionHeader title="Main domains" />
                                <RecordList records={mainDomains} />
                            </section>
                        )}
                        {subdomains.length > 0 && (
                            <section>
                                <SectionHeader title="Subdomains" />
                                <RecordList records={subdomains} />
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

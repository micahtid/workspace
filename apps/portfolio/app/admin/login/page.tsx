import { redirect } from "next/navigation";
import { loginAction } from "../actions";
import { hasValidSession } from "../lib/session";

export const metadata = {
    title: "Admin Login",
    robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    if (await hasValidSession()) redirect("/admin");
    const { error } = await searchParams;

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <main className="w-full max-w-sm">
                <h1 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                    Admin
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                    Enter password to continue.
                </p>

                <form action={loginAction} className="space-y-3">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoFocus
                        autoComplete="current-password"
                        required
                        className="w-full px-0 py-2 bg-transparent text-sm border-b border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-neutral-800 dark:focus:border-neutral-300 transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                    />

                    {error && (
                        <p className="text-xs text-red-600 dark:text-red-400">
                            Incorrect password.
                        </p>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="text-sm font-medium text-white dark:text-neutral-900 bg-neutral-800 dark:bg-neutral-200 hover:bg-neutral-700 dark:hover:bg-neutral-300 px-5 py-2 rounded-lg cursor-pointer border-none transition-colors"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

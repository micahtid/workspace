"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, verifyPassword } from "./lib/session";

export async function loginAction(formData: FormData): Promise<void> {
    const password = String(formData.get("password") ?? "");
    if (!verifyPassword(password)) {
        redirect("/admin/login?error=1");
    }
    await createSession();
    redirect("/admin");
}

export async function logoutAction(): Promise<void> {
    await destroySession();
    redirect("/admin/login");
}

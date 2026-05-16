import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24;

function getSecret(): string {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error(
            "ADMIN_SESSION_SECRET is missing or too short. Set a >= 32 char random string in .env.local."
        );
    }
    return secret;
}

function sign(payload: string): string {
    return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function safeEqualStrings(a: string, b: string): boolean {
    const ab = Buffer.from(a);
    const bb = Buffer.from(b);
    if (ab.length !== bb.length) {
        timingSafeEqual(ab, Buffer.alloc(ab.length));
        return false;
    }
    return timingSafeEqual(ab, bb);
}

export async function createSession(): Promise<void> {
    const expires = Date.now() + MAX_AGE_SECONDS * 1000;
    const payload = `${randomBytes(16).toString("hex")}.${expires}`;
    const token = `${payload}.${sign(payload)}`;
    const store = await cookies();
    store.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: MAX_AGE_SECONDS,
    });
}

export async function destroySession(): Promise<void> {
    const store = await cookies();
    store.delete(COOKIE_NAME);
}

export async function hasValidSession(): Promise<boolean> {
    const store = await cookies();
    const token = store.get(COOKIE_NAME)?.value;
    if (!token) return false;
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const [nonce, expiresStr, sig] = parts;
    if (!safeEqualStrings(sig, sign(`${nonce}.${expiresStr}`))) return false;
    const expires = Number(expiresStr);
    if (!Number.isFinite(expires) || Date.now() > expires) return false;
    return true;
}

export function verifyPassword(input: string): boolean {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) return false;
    return safeEqualStrings(input, expected);
}

export type DnsRecord = {
    id: string;
    type: string;
    name: string;
    content: string;
    proxied: boolean;
};

export type SubdomainResult =
    | { ok: true; records: DnsRecord[]; zone: string }
    | { ok: false; error: string };

const HOSTNAME_TYPES = new Set(["A", "AAAA", "CNAME"]);

export async function listSubdomains(): Promise<SubdomainResult> {
    const token = process.env.CLOUDFLARE_API_TOKEN;
    const zoneId = process.env.CLOUDFLARE_ZONE_ID;
    if (!token || !zoneId) {
        return {
            ok: false,
            error:
                "Cloudflare not configured. Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID in .env.local.",
        };
    }

    const all: DnsRecord[] = [];
    let page = 1;
    let zoneName = "";

    while (true) {
        const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?per_page=100&page=${page}`;
        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        if (!res.ok) {
            return { ok: false, error: `Cloudflare API ${res.status}: ${await res.text()}` };
        }
        const json: {
            success: boolean;
            errors?: { message: string }[];
            result: DnsRecord[];
            result_info?: { page: number; total_pages: number };
        } = await res.json();
        if (!json.success) {
            return { ok: false, error: json.errors?.map((e) => e.message).join("; ") ?? "Unknown error" };
        }
        all.push(...json.result.filter((r) => HOSTNAME_TYPES.has(r.type)));
        const info = json.result_info;
        if (!info || info.page >= info.total_pages) break;
        page += 1;
    }

    if (all.length > 0) {
        const longest = all.map((r) => r.name).sort((a, b) => a.length - b.length)[0];
        zoneName = longest.split(".").slice(-2).join(".");
    }

    all.sort((a, b) => a.name.localeCompare(b.name));
    return { ok: true, records: all, zone: zoneName };
}

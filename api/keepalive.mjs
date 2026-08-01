const appwriteUrl = process.env.VITE_APPWRITE_URL;

const checks = ["/v1/health", "/v1/health/db", "/v1/health/storage"];

async function ping(path) {
    const url = appwriteUrl + path;
    try {
        const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
        return { path, status: res.status, ok: res.ok };
    } catch (err) {
        return { path, status: 0, ok: false, error: err.message };
    }
}

export default async function handler(req, res) {
    if (!appwriteUrl) {
        return res.status(500).json({ ok: false, error: "VITE_APPWRITE_URL is not set" });
    }

    const services = await Promise.all(checks.map(ping));
    const ok = services[0].ok;

    res.status(ok ? 200 : 502).json({
        ok,
        appwrite: appwriteUrl,
        timestamp: new Date().toISOString(),
        services,
    });
}

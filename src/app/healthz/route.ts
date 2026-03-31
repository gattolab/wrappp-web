import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE ?? "https://api.wrappp.io";

export const dynamic = "force-dynamic";

export async function GET() {
  const start = Date.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${API_BASE}/api/v1/shorten`, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeout);

    const latency = Date.now() - start;
    const apiOk = res.ok || res.status === 401 || res.status === 403;

    if (apiOk) {
      return NextResponse.json(
        {
          status: "ok",
          latency_ms: latency,
          api: "reachable",
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        status: "degraded",
        latency_ms: latency,
        api: `upstream_${res.status}`,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err) {
    const latency = Date.now() - start;
    const isTimeout = err instanceof Error && err.name === "AbortError";

    return NextResponse.json(
      {
        status: "down",
        latency_ms: latency,
        api: isTimeout ? "timeout" : "unreachable",
        timestamp: new Date().toISOString(),
      },
      { status: 200 } // always 200 so the footer fetch itself never throws
    );
  }
}

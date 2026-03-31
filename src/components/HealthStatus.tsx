"use client";

import { useState, useEffect, useCallback } from "react";

type Status = "ok" | "degraded" | "down" | "loading";

interface HealthPayload {
  status: "ok" | "degraded" | "down";
  latency_ms: number;
  api: string;
  timestamp: string;
}

const POLL_INTERVAL_MS = 30_000;

const config: Record<Status, { dot: string; text: string; label: string }> = {
  loading: {
    dot: "bg-slate-500",
    text: "text-slate-500",
    label: "Checking status…",
  },
  ok: {
    dot: "bg-emerald-500",
    text: "text-slate-500",
    label: "All systems operational",
  },
  degraded: {
    dot: "bg-amber-400",
    text: "text-amber-400",
    label: "Partial degradation",
  },
  down: {
    dot: "bg-red-500",
    text: "text-red-400",
    label: "Service disruption",
  },
};

export default function HealthStatus() {
  const [status, setStatus] = useState<Status>("loading");
  const [latency, setLatency] = useState<number | null>(null);
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  const check = useCallback(async () => {
    try {
      const res = await fetch("/healthz", { cache: "no-store" });
      const data: HealthPayload = await res.json();
      setStatus(data.status);
      setLatency(data.latency_ms);
      setLastChecked(data.timestamp);
    } catch {
      setStatus("down");
    }
  }, []);

  useEffect(() => {
    check();
    const id = setInterval(check, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [check]);

  const { dot, text, label } = config[status];

  const title = [
    label,
    latency !== null ? `· API latency ${latency}ms` : "",
    lastChecked ? `· checked ${new Date(lastChecked).toLocaleTimeString()}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="flex items-center gap-1.5 cursor-default select-none"
      title={title}
    >
      {/* Dot with pulse ring */}
      <span className="relative flex items-center justify-center w-2.5 h-2.5">
        {status === "ok" && (
          <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-50 animate-ping" />
        )}
        <span className={`relative inline-flex w-2 h-2 rounded-full ${dot}`} />
      </span>

      <span className={`text-xs ${text} transition-colors duration-500`}>
        {label}
        {status === "ok" && (
          <span className="text-slate-600 ml-1"></span>
        )}
      </span>
    </div>
  );
}

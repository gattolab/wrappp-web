"use client";

import { useState } from "react";
import { ShortenedLink } from "@/types";
import { deleteLink } from "@/app/actions";
import { useRouter } from "next/navigation";

interface Props {
  initialLinks: ShortenedLink[];
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function truncateUrl(url: string, max = 40) {
  if (url.length <= max) return url;
  return url.slice(0, max) + "…";
}

export default function LinksTable({ initialLinks }: Props) {
  const [links, setLinks] = useState(initialLinks);
  const [deletingCode, setDeletingCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (code: string) => {
    setDeletingCode(code);
    try {
      await deleteLink(code);
      setLinks((prev) => prev.filter((l) => l.code !== code));
      router.refresh();
    } catch {
      // ignore
    } finally {
      setDeletingCode(null);
    }
  };

  const handleCopy = async (shortUrl: string, code: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      // ignore
    }
  };

  if (links.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-slate-300">
            <path d="M14 4C8.477 4 4 8.477 4 14C4 19.523 8.477 24 14 24C19.523 24 24 19.523 24 14C24 8.477 19.523 4 14 4Z" stroke="currentColor" strokeWidth="2" />
            <path d="M14 10V14M14 18V18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium text-sm">No links yet</p>
        <p className="text-slate-400 text-xs mt-1">Create your first short link above</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100">
      {/* Table header */}
      <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100">
        {["Short link", "Destination", "Clicks", "Created", ""].map((h, i) => (
          <div key={i} className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {h}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-50">
        {links.map((link) => {
          const shortUrl = link.short_url ?? `go.wrappp.link/r/${link.code}`;
          const isDeleting = deletingCode === link.code;
          const isCopied = copiedCode === link.code;

          return (
            <div
              key={link.code}
              className={`grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 sm:gap-4 px-6 py-4 items-center hover:bg-slate-50/70 transition-colors group ${
                isDeleting ? "opacity-50" : ""
              }`}
            >
              {/* Short URL */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-indigo-500">
                    <path d="M5.5 7.5C5.76 7.83 6.09 8.1 6.46 8.29C6.84 8.47 7.25 8.57 7.67 8.59C8.09 8.61 8.51 8.54 8.9 8.39C9.29 8.24 9.64 8.01 9.92 7.72L11.42 6.22C11.97 5.65 13.27 4.89 13.26 4.1C13.25 3.31 12.93 2.56 12.37 2C11.81 1.44 11.06 1.12 10.27 1.11C9.48 1.1 8.72 1.4 8.15 1.95L7.33 2.77" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M8.5 6.5C8.24 6.17 7.91 5.9 7.54 5.71C7.16 5.53 6.75 5.43 6.33 5.41C5.91 5.39 5.49 5.46 5.1 5.61C4.71 5.76 4.36 5.99 4.08 6.28L2.58 7.78C2.03 8.35 1.73 9.11 1.74 9.9C1.75 10.69 3.07 11.44 3.63 12C4.19 12.56 4.94 12.88 5.73 12.89C6.52 12.9 7.28 12.6 7.85 12.05L8.67 11.23" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 truncate block transition-colors"
                  >
                    {shortUrl.replace(/^https?:\/\//, "")}
                  </a>
                  <p className="text-xs text-slate-400 sm:hidden truncate">{truncateUrl(link.target_url)}</p>
                </div>
              </div>

              {/* Destination */}
              <div className="hidden sm:block min-w-0">
                <p className="text-xs text-slate-500 truncate" title={link.target_url}>
                  {truncateUrl(link.target_url, 35)}
                </p>
              </div>

              {/* Clicks */}
              <div className="hidden sm:flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-slate-400">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M6 4V6L7.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <span className="text-sm font-medium text-slate-700">
                  {typeof link.clicks === "number" ? link.clicks.toLocaleString() : "—"}
                </span>
              </div>

              {/* Created */}
              <div className="hidden sm:block">
                <span className="text-xs text-slate-400">{formatDate(link.created_at)}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleCopy(shortUrl, link.code)}
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    isCopied ? "bg-emerald-100 text-emerald-600" : "hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                  }`}
                  title="Copy link"
                >
                  {isCopied ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="5" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M2 5H3.5V12H10.5V10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(link.code)}
                  disabled={isDeleting}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all duration-200 disabled:opacity-50"
                  title="Delete link"
                >
                  {isDeleting ? (
                    <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 3.5H12M5 3.5V2.5C5 2.22 5.22 2 5.5 2H8.5C8.78 2 9 2.22 9 2.5V3.5M11 3.5L10.5 11.5C10.5 11.78 10.28 12 10 12H4C3.72 12 3.5 11.78 3.5 11.5L3 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

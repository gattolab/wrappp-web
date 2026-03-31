"use client";

import { useState, useTransition, useEffect } from "react";
import QRCode from "qrcode";
import { shortenUrl } from "@/app/actions";

interface ShortenResult {
  code: string;
  short_url: string;
}

interface Props {
  redirectBase?: string;
}

export default function HeroForm({ redirectBase = "https://wrappp.link" }: Props) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ShortenResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const isValidUrl = (value: string) => {
    try { new URL(value); return true; } catch { return false; }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (including https://)");
      return;
    }
    setError(null);
    setResult(null);
    setQrDataUrl(null);

    startTransition(async () => {
      try {
        const data = await shortenUrl({ target_url: url, expires_at: null });
        setResult(data);
        setUrl("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    });
  };

  const shortUrl = result
    ? (result.short_url ?? `${redirectBase}/r/${result.code}`)
    : null;

  // Auto-generate QR as soon as shortUrl is available
  useEffect(() => {
    if (!shortUrl) return;
    let cancelled = false;
    QRCode.toDataURL(shortUrl, {
      width: 400,
      margin: 1,
      color: { dark: "#1E293B", light: "#FFFFFF" },
      errorCorrectionLevel: "H",
    }).then((dataUrl) => {
      if (!cancelled) setQrDataUrl(dataUrl);
    });
    return () => { cancelled = true; };
  }, [shortUrl]);

  const handleCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl || !result) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `qr-${result.code}.png`;
    a.click();
  };

  return (
    <div className="w-full">
      {/* Input form */}
      <form onSubmit={handleSubmit}>
        <div
          className={`flex items-center bg-white rounded-2xl border-2 transition-all duration-200 shadow-lg shadow-slate-100/80 ${
            error
              ? "border-red-300"
              : "border-slate-200 focus-within:border-[#3B5BDB] focus-within:shadow-indigo-100/60"
          }`}
        >
          <div className="pl-4 pr-2 text-slate-400 shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M1.5 9H16.5M9 1.5C9 1.5 12 4.5 12 9C12 13.5 9 16.5 9 16.5M9 1.5C9 1.5 6 4.5 6 9C6 13.5 9 16.5 9 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setError(null); }}
            placeholder="Paste your long URL here..."
            className="flex-1 py-4 pr-2 text-slate-800 placeholder:text-slate-400 text-sm lg:text-base bg-transparent outline-none"
            disabled={isPending}
            aria-label="URL to shorten"
          />

          <div className="p-2 shrink-0">
            <button
              type="submit"
              disabled={isPending || !url.trim()}
              className="relative overflow-hidden flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-linear-to-r from-[#3B5BDB] to-[#6366F1] rounded-xl shadow-md shadow-indigo-200/60 hover:shadow-indigo-300/70 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 btn-shimmer"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="hidden sm:inline">Shortening...</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8H14M9 3L14 8L9 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="hidden sm:inline">Shorten</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-600 text-sm animate-fade-up">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M7.5 4V8M7.5 10.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {error}
        </div>
      )}

      {/* Result card — link + QR side by side */}
      {result && shortUrl && (
        <div className="mt-4 bg-linear-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="flex items-center gap-2 px-5 pt-4 pb-3">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-800">Your link is ready!</span>
          </div>

          {/* Body: link info (left) + QR (right) */}
          <div className="flex items-stretch gap-0 px-4 pb-4">
            {/* Left — link + actions */}
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              {/* Short URL pill */}
              <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-indigo-100">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-indigo-500 shrink-0">
                  <path d="M6 9C6.24 9.32 6.54 9.57 6.89 9.74C7.23 9.91 7.61 10 8 10.02C8.39 10.04 8.77 9.97 9.13 9.83C9.49 9.69 9.81 9.47 10.07 9.19L11.57 7.69C12.07 7.16 12.34 6.46 12.33 5.74C12.32 5.02 12.03 4.33 11.51 3.82C11 3.31 10.31 3.02 9.59 3.01C8.87 3 8.17 3.27 7.64 3.77L6.82 4.58" stroke="#4C6EF5" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M9 6C8.76 5.68 8.46 5.43 8.11 5.26C7.77 5.09 7.39 5 7 4.98C6.61 4.96 6.23 5.03 5.87 5.17C5.51 5.31 5.19 5.53 4.93 5.81L3.43 7.31C2.93 7.84 2.66 8.54 2.67 9.26C2.68 9.98 2.97 10.67 3.49 11.18C4 11.69 4.69 11.98 5.41 11.99C6.13 12 6.83 11.73 7.36 11.23L8.18 10.42" stroke="#4C6EF5" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <span className="font-mono text-sm font-semibold text-indigo-600 flex-1 truncate">
                  {shortUrl}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {/* Copy */}
                <button
                  onClick={handleCopy}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                    copied
                      ? "bg-emerald-100 text-emerald-700 copy-success"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {copied ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="4.5" y="1.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M1.5 4.5H3.5V10.5H9.5V8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                      Copy link
                    </>
                  )}
                </button>

                {/* Download QR */}
                <button
                  onClick={handleDownloadQr}
                  disabled={!qrDataUrl}
                  title="Download QR code as PNG"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1V8M6 8L3.5 5.5M6 8L8.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.5 10H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Download QR
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-indigo-100 mx-4 self-stretch" />

            {/* Right — QR preview */}
            <div className="shrink-0 flex items-center justify-center">
              {!qrDataUrl ? (
                <div className="w-[88px] h-[88px] rounded-xl bg-white border border-indigo-100 flex items-center justify-center">
                  <svg className="animate-spin w-5 h-5 text-indigo-300" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              ) : (
                <div className="p-1.5 rounded-xl bg-white border-2 border-indigo-100 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrDataUrl}
                    alt={`QR code for ${shortUrl}`}
                    width={86}
                    height={86}
                    className="rounded-lg block"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-slate-400 text-center">
        Free &amp; no sign-up required.{" "}
        <span title="Links stay alive as long as they're clicked. If unused for 30 days they expire automatically.">
          Links are active for <strong className="text-slate-500">30 days</strong> — reset automatically on each click.
        </span>
      </p>
    </div>
  );
}

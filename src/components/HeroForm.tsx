"use client";

import { useState, useTransition, useEffect } from "react";
import QRCode from "qrcode";
import { shortenUrl } from "@/app/actions";

interface ShortenResult {
  code: string;
  short_url: string;
}

export default function HeroForm() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ShortenResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  // QR state — qrDataUrl being null while showQr is true means "loading"
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);

  const isValidUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
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
    setShowQr(false);

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
    ? (result.short_url ?? `go.wrappp.io/r/${result.code}`)
    : null;

  // Generate QR once when the user opens the panel
  useEffect(() => {
    if (!showQr || !shortUrl || qrDataUrl) return;
    let cancelled = false;
    QRCode.toDataURL(shortUrl, {
      width: 320,
      margin: 2,
      color: { dark: "#1E293B", light: "#FFFFFF" },
      errorCorrectionLevel: "H",
    }).then((dataUrl) => {
      if (!cancelled) setQrDataUrl(dataUrl);
    });
    return () => { cancelled = true; };
  }, [showQr, shortUrl, qrDataUrl]);

  const handleCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
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
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`flex items-center bg-white rounded-2xl border-2 transition-all duration-200 shadow-lg shadow-slate-100/80 ${
            error
              ? "border-red-300"
              : "border-slate-200 focus-within:border-[#3B5BDB] focus-within:shadow-indigo-100/60"
          }`}
        >
          {/* Globe icon */}
          <div className="pl-4 pr-2 text-slate-400 shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M1.5 9H16.5M9 1.5C9 1.5 12 4.5 12 9C12 13.5 9 16.5 9 16.5M9 1.5C9 1.5 6 4.5 6 9C6 13.5 9 16.5 9 16.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
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

      {/* Success result */}
      {result && shortUrl && (
        <div className="mt-4 rounded-2xl border border-indigo-100 overflow-hidden animate-fade-up">
          {/* Link row */}
          <div className="p-4 bg-linear-to-r from-indigo-50 to-blue-50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-800">Your link is ready!</span>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-xl p-3 border border-indigo-100">
              {/* Link icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-indigo-500 shrink-0">
                <path d="M6.5 9.5C6.76 9.83 7.09 10.1 7.46 10.29C7.84 10.47 8.25 10.57 8.67 10.59C9.09 10.61 9.51 10.54 9.9 10.39C10.29 10.24 10.64 10.01 10.92 9.72L12.42 8.22C12.97 7.65 13.27 6.89 13.26 6.1C13.25 5.31 12.93 4.56 12.37 4C11.81 3.44 11.06 3.12 10.27 3.11C9.48 3.1 8.72 3.4 8.15 3.95L7.33 4.77" stroke="#4C6EF5" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M9.5 6.5C9.24 6.17 8.91 5.9 8.54 5.71C8.16 5.53 7.75 5.43 7.33 5.41C6.91 5.39 6.49 5.46 6.1 5.61C5.71 5.76 5.36 5.99 5.08 6.28L3.58 7.78C3.03 8.35 2.73 9.11 2.74 9.9C2.75 10.69 3.07 11.44 3.63 12C4.19 12.56 4.94 12.88 5.73 12.89C6.52 12.9 7.28 12.6 7.85 12.05L8.67 11.23" stroke="#4C6EF5" strokeWidth="1.3" strokeLinecap="round" />
              </svg>

              <span className="font-mono text-sm font-semibold text-indigo-600 flex-1 truncate">
                {shortUrl}
              </span>

              {/* Copy button */}
              <button
                onClick={handleCopy}
                title="Copy link"
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 shrink-0 ${
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
                    Copy
                  </>
                )}
              </button>

              {/* QR toggle button */}
              <button
                onClick={() => setShowQr((v) => !v)}
                title={showQr ? "Hide QR code" : "Show QR code"}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 shrink-0 ${
                  showQr
                    ? "bg-indigo-100 border-indigo-200 text-indigo-700"
                    : "bg-white border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
                }`}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="8" y="1" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="1" y="8" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="8.5" y="8.5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
                  <rect x="10.5" y="8.5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
                  <rect x="8.5" y="10.5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
                  <rect x="10.5" y="10.5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
                  <rect x="2" y="2" width="2" height="2" rx="0.4" fill="currentColor" />
                  <rect x="9" y="2" width="2" height="2" rx="0.4" fill="currentColor" />
                  <rect x="2" y="9" width="2" height="2" rx="0.4" fill="currentColor" />
                </svg>
                QR
              </button>
            </div>
          </div>

          {/* QR Code panel */}
          {showQr && (
            <div className="bg-white border-t border-indigo-100 p-5 flex flex-col sm:flex-row items-center gap-6 animate-fade-up">
              {/* QR image */}
              <div className="relative shrink-0">
                {!qrDataUrl ? (
                  <div className="w-[140px] h-[140px] rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <svg className="animate-spin w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>
                ) : (
                  <div className="p-2 rounded-2xl border-2 border-indigo-100 bg-white shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrDataUrl}
                      alt={`QR code for ${shortUrl}`}
                      width={140}
                      height={140}
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Info + download */}
              <div className="flex flex-col items-center sm:items-start gap-3 text-center sm:text-left">
                <div>
                  <p className="text-sm font-semibold text-slate-800 mb-1">
                    Scan to open your link
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[220px]">
                    Generated instantly in your browser — nothing is stored. Download as PNG and use anywhere.
                  </p>
                </div>

                <button
                  onClick={handleDownloadQr}
                  disabled={!qrDataUrl}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-[#3B5BDB] to-[#6366F1] rounded-xl shadow-md shadow-indigo-200/50 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M7.5 1V10M7.5 10L4.5 7M7.5 10L10.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  Download PNG
                </button>

              </div>
            </div>
          )}
        </div>
      )}

      <p className="mt-3 text-xs text-slate-400 text-center">
        Free forever. No credit card required. No sign-up needed.
      </p>
    </div>
  );
}

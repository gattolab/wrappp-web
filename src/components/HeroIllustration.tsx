export default function HeroIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Outer glow ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[420px] h-[420px] rounded-full border border-indigo-100/60 animate-spin-slow" />
        <div className="absolute w-[340px] h-[340px] rounded-full border border-blue-100/40" />
      </div>

      {/* Pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full border-2 border-indigo-200/30 animate-ping" style={{ animationDuration: "3s" }} />
      </div>

      {/* Main 3D sphere / core */}
      <div className="relative z-10 animate-float-slow">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sphereGrad" cx="38%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="40%" stopColor="#4C6EF5" />
              <stop offset="100%" stopColor="#2346C0" />
            </radialGradient>
            <radialGradient id="sphereHighlight" cx="30%" cy="28%" r="35%">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sphereShadow" cx="70%" cy="75%" r="40%">
              <stop offset="0%" stopColor="#1a1f6b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1a1f6b" stopOpacity="0" />
            </radialGradient>
            <filter id="sphereBlur">
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Shadow beneath sphere */}
          <ellipse cx="110" cy="190" rx="55" ry="12" fill="rgba(59,91,219,0.12)" filter="url(#sphereBlur)" />

          {/* Main sphere */}
          <circle cx="110" cy="105" r="80" fill="url(#sphereGrad)" filter="url(#glow)" />
          <circle cx="110" cy="105" r="80" fill="url(#sphereHighlight)" />
          <circle cx="110" cy="105" r="80" fill="url(#sphereShadow)" />

          {/* Globe lines - latitude */}
          <ellipse cx="110" cy="105" rx="80" ry="26" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <ellipse cx="110" cy="105" rx="80" ry="54" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          {/* Globe lines - longitude */}
          <path d="M110 25 Q140 65 140 105 Q140 145 110 185" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <path d="M110 25 Q80 65 80 105 Q80 145 110 185" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="30" y1="105" x2="190" y2="105" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          {/* Link chain icon in center */}
          <g transform="translate(82, 77)" filter="url(#glow)">
            <path
              d="M22 11C22 11 20.5 9.5 17 9.5C13.5 9.5 12 11 12 14C12 17 13.5 18.5 17 18.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M34 17C34 17 35.5 18.5 39 18.5C42.5 18.5 44 17 44 14C44 11 42.5 9.5 39 9.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <line x1="18" y1="14" x2="38" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Floating card: Short Link */}
      <div
        className="absolute top-6 right-8 animate-float"
        style={{ animationDelay: "0s" }}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-52">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5.5 7.5C5.76 7.83 6.09 8.1 6.46 8.29C6.84 8.47 7.25 8.57 7.67 8.59C8.09 8.61 8.51 8.54 8.9 8.39C9.29 8.24 9.64 8.01 9.92 7.72L11.42 6.22C11.97 5.65 12.27 4.89 12.26 4.1C12.25 3.31 11.93 2.56 11.37 2C10.81 1.44 10.06 1.12 9.27 1.11C8.48 1.1 7.72 1.4 7.15 1.95L6.33 2.77" stroke="#4C6EF5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 6.5C8.24 6.17 7.91 5.9 7.54 5.71C7.16 5.53 6.75 5.43 6.33 5.41C5.91 5.39 5.49 5.46 5.1 5.61C4.71 5.76 4.36 5.99 4.08 6.28L2.58 7.78C2.03 8.35 1.73 9.11 1.74 9.9C1.75 10.69 2.07 11.44 2.63 12C3.19 12.56 3.94 12.88 4.73 12.89C5.52 12.9 6.28 12.6 6.85 12.05L7.67 11.23" stroke="#4C6EF5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-700">Link created!</span>
          </div>
          <div className="bg-indigo-50 rounded-lg px-3 py-2 mb-2">
            <p className="text-xs font-mono font-bold text-indigo-600">wrappp.link/r/xK9mP</p>
          </div>
          {/* <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-slate-500">1,247 clicks today</span>
          </div> */}
        </div>
      </div>

      {/* Floating card: Analytics */}
      {/* <div
        className="absolute bottom-10 left-4 animate-float-delay"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-44">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Analytics</p>
          <div className="flex items-end gap-1.5 h-10 mb-2">
            {[30, 55, 42, 70, 48, 90, 65].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-[#3B5BDB] to-[#818CF8] opacity-80"
                style={{ height: `${h}%`, transition: "height 0.3s ease" }}
              />
            ))}
          </div>
          <p className="text-lg font-bold text-slate-900">24.8K</p>
          <p className="text-[10px] text-emerald-600 font-medium">↑ 18.4% this week</p>
        </div>
      </div> */}

      {/* Floating badge: QR */}
      <div
        className="absolute top-1/2 -left-2 -translate-y-1/2 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-3">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="4" y="4" width="14" height="14" rx="2" fill="#3B5BDB" opacity="0.1" />
            <rect x="6" y="6" width="10" height="10" rx="1.5" fill="#3B5BDB" opacity="0.7" />
            <rect x="8" y="8" width="6" height="6" rx="1" fill="#3B5BDB" />
            <rect x="22" y="4" width="14" height="14" rx="2" fill="#3B5BDB" opacity="0.1" />
            <rect x="24" y="6" width="10" height="10" rx="1.5" fill="#3B5BDB" opacity="0.7" />
            <rect x="26" y="8" width="6" height="6" rx="1" fill="#3B5BDB" />
            <rect x="4" y="22" width="14" height="14" rx="2" fill="#3B5BDB" opacity="0.1" />
            <rect x="6" y="24" width="10" height="10" rx="1.5" fill="#3B5BDB" opacity="0.7" />
            <rect x="8" y="26" width="6" height="6" rx="1" fill="#3B5BDB" />
            <rect x="22" y="22" width="4" height="4" rx="1" fill="#3B5BDB" />
            <rect x="28" y="22" width="4" height="4" rx="1" fill="#3B5BDB" />
            <rect x="34" y="22" width="2" height="2" rx="0.5" fill="#3B5BDB" />
            <rect x="22" y="28" width="2" height="2" rx="0.5" fill="#3B5BDB" />
            <rect x="26" y="28" width="4" height="4" rx="1" fill="#3B5BDB" />
            <rect x="32" y="26" width="4" height="4" rx="1" fill="#3B5BDB" />
            <rect x="32" y="32" width="4" height="4" rx="1" fill="#3B5BDB" />
            <rect x="22" y="34" width="6" height="2" rx="0.5" fill="#3B5BDB" />
          </svg>
          <p className="text-[9px] font-semibold text-slate-500 text-center mt-1">QR Code</p>
        </div>
      </div>

      {/* Small dot decorations */}
      <div className="absolute top-16 left-16 w-2.5 h-2.5 rounded-full bg-indigo-300 animate-pulse" />
      <div className="absolute bottom-16 right-12 w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/3 right-6 w-1.5 h-1.5 rounded-full bg-indigo-200" />
    </div>
  );
}

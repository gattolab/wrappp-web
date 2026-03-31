export default function CTASection() {
  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-[#1E2D87] via-[#2D3AC0] to-[#3B5BDB]" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl" />

      {/* Decorative dots */}
      <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-white/20 animate-pulse" />
      <div className="absolute top-32 right-32 w-3 h-3 rounded-full bg-white/10 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: "0.5s" }} />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Free to use · No sign-up needed</span>
        </div>

        <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Start shortening links{" "}
          <span className="text-indigo-200">right now</span>
        </h2>
        <p className="text-lg text-indigo-200 leading-relaxed mb-10 max-w-2xl mx-auto">
          No account. No credit card. No setup. Paste your URL and get a short link instantly. Links stay live for 30 days — and every click automatically extends them for another 30. Upgrade anytime for analytics and full API access.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#hero"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-indigo-700 bg-white rounded-xl shadow-xl shadow-black/20 hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L10.909 7.09L16.364 7.09L12.046 10.41L13.637 15.59L9 12.54L4.363 15.59L5.954 10.41L1.636 7.09L7.091 7.09L9 2Z" fill="#3B5BDB" />
            </svg>
            Get started free
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-200"
          >
            View API docs
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {[
            "No credit card",
            "30-day rolling expiry",
            "99.98% uptime",
            "Open API",
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-1.5 text-indigo-200">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5L5 9.5L11 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

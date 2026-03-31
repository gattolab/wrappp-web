const steps = [
  {
    step: "01",
    title: "Paste your URL",
    description: "Copy any long URL — from articles, products, social posts, or documents — and paste it into the input field.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M9 11H19M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M19 3V6M9 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Get your short link",
    description: "Click 'Shorten' and we instantly generate a clean, compact link via our POST /api/v1/shorten endpoint.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M15 5C15 5 13 7 13 11C13 15 15 17 15 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 8C7 8 5 10 5 14C5 18 7 20 7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 8C21 8 23 10 23 14C23 18 21 20 21 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="14" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Share & track",
    description: "Share your short link anywhere. Watch clicks roll in with real-time analytics and performance metrics.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L10 14L14 18L20 10L24 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M24 11V20H4V8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">How it works</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Up and running in{" "}
            <span className="gradient-text">three steps</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            No setup required. Start shortening URLs immediately without creating an account.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-indigo-200 via-blue-200 to-indigo-200" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                {/* Step number + icon */}
                <div className="relative mb-6">
                  {/* Outer ring */}
                  <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B5BDB]/20 to-[#6366F1]/20 scale-125 rounded-3xl group-hover:scale-[1.4] transition-transform duration-300" />
                  <div className="relative w-16 h-16 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-indigo-600 group-hover:shadow-indigo-100/50 group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    {step.icon}
                  </div>
                  {/* Step badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#3B5BDB] to-[#6366F1] flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white">{i + 1}</span>
                  </div>
                </div>

                {/* Text */}
                <div className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">
                  Step {step.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* API Endpoints showcase */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-8 lg:p-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">REST API</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                Full API access included
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Integrate Wrappp into your existing workflow with our clean REST API. Shorten, retrieve, and manage links programmatically.
              </p>
            </div>

            <div className="flex-1 w-full lg:w-auto">
              <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60 font-mono text-sm">
                {[
                  { method: "POST", color: "text-emerald-400", path: "/api/v1/shorten", desc: "Create short link" },
                  { method: "GET", color: "text-blue-400", path: "/api/v1/shorten", desc: "List all links" },
                  { method: "GET", color: "text-blue-400", path: "/api/v1/shorten/:code", desc: "Get link details" },
                  { method: "DELETE", color: "text-red-400", path: "/api/v1/shorten/:code", desc: "Delete a link" },
                  { method: "GET", color: "text-amber-400", path: "/r/:code", desc: "Redirect to URL" },
                ].map((endpoint, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5 border-b border-slate-700/40 last:border-0 group hover:bg-slate-700/30 rounded-lg px-2 -mx-2 transition-colors cursor-default">
                    <span className={`text-xs font-bold w-14 flex-shrink-0 ${endpoint.color}`}>
                      {endpoint.method}
                    </span>
                    <span className="text-slate-300 text-xs flex-1">{endpoint.path}</span>
                    <span className="text-slate-500 text-xs hidden sm:block">{endpoint.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

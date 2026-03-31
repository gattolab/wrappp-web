const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L13.09 8.26L19.18 8.27L14.54 11.97L16.18 18.27L11 14.9L5.82 18.27L7.46 11.97L2.82 8.27L8.91 8.26L11 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    color: "indigo",
    title: "Instant Shortening",
    description: "Transform any URL into a compact, shareable link in milliseconds. No account required to get started.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 3H19V13C19 14.1 18.1 15 17 15H5C3.9 15 3 14.1 3 13V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 15V19M14 15V19M6 19H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 7H15M7 10H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    color: "blue",
    title: "Real-time Analytics",
    description: "Track every click with detailed analytics — geography, devices, referrers, and time-based trends.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="12" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    color: "violet",
    title: "QR Code Generation",
    description: "Every short link comes with a scannable QR code, perfect for print materials and offline campaigns.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "sky",
    title: "Link Management",
    description: "Organize, edit, and manage all your links from one clean dashboard. Bulk operations and tagging included.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11 7V11L14 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "amber",
    title: "Smart Link Expiration",
    description: "Links stay active for 30 days from creation. Every click resets the clock — so active links never disappear. Idle links expire quietly on their own.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M18 3H14L12 7H16L18 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 3H6L4 7H8L10 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M20 7H2V11C2 13.21 3.79 15 6 15H16C18.21 15 20 13.21 20 11V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M11 15V19M8 19H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    color: "emerald",
    title: "REST API Access",
    description: "Full REST API with POST, GET, and DELETE endpoints. Integrate Wrappp into any workflow or application.",
  },
];

const colorMap: Record<string, { bg: string; icon: string; ring: string }> = {
  indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", ring: "ring-indigo-100" },
  blue: { bg: "bg-blue-50", icon: "text-blue-600", ring: "ring-blue-100" },
  violet: { bg: "bg-violet-50", icon: "text-violet-600", ring: "ring-violet-100" },
  sky: { bg: "bg-sky-50", icon: "text-sky-600", ring: "ring-sky-100" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600", ring: "ring-amber-100" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", ring: "ring-emerald-100" },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">Features</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Everything you need to{" "}
            <span className="gradient-text">manage links</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            A complete URL management platform with analytics, customization, and developer tools built right in.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => {
            const colors = colorMap[feature.color];
            return (
              <div
                key={i}
                className="feature-card group relative bg-white rounded-2xl border border-slate-100 p-7 cursor-default"
              >
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-indigo-50/0 to-indigo-50/0 group-hover:from-indigo-50/40 group-hover:to-blue-50/20 transition-all duration-300" />

                <div className="relative z-10">
                  <div
                    className={`inline-flex items-center justify-center w-11 h-11 ${colors.bg} ${colors.icon} rounded-xl ring-4 ${colors.ring} mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

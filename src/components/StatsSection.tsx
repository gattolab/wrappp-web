const stats = [
  { value: "12M+", label: "Links shortened", icon: "🔗" },
  { value: "99.98%", label: "Uptime SLA", icon: "⚡" },
  { value: "<80ms", label: "Avg redirect time", icon: "🚀" },
  { value: "24K+", label: "Active users", icon: "👥" },
];

export default function StatsSection() {
  return (
    <section className="py-16 border-y border-slate-100 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-transparent to-blue-50/30" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

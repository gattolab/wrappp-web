const testimonials = [
  {
    quote: "Wrappp replaced three different tools for us. The analytics are crystal-clear, the API is dead simple, and our team onboarded in an afternoon.",
    author: "Mia Chen",
    role: "Head of Growth",
    company: "Runway AI",
    avatar: "MC",
    color: "from-indigo-400 to-blue-500",
    rating: 5,
  },
  {
    quote: "We process over 100k redirects daily through Wrappp's API. It's been rock-solid. The sub-100ms latency is something we couldn't find elsewhere.",
    author: "James Okafor",
    role: "Platform Engineer",
    company: "Northfield Labs",
    avatar: "JO",
    color: "from-violet-400 to-indigo-500",
    rating: 5,
  },
  {
    quote: "The rolling 30-day expiry is genius — active links just keep renewing themselves, and dead ones clean up automatically. Plus the QR codes work perfectly for our product packaging.",
    author: "Sara Lindqvist",
    role: "Marketing Director",
    company: "Bloom Studio",
    avatar: "SL",
    color: "from-blue-400 to-cyan-500",
    rating: 5,
  },
  {
    quote: "I used to maintain a custom redirect service. Wrappp gave me back 8 hours a week. The dashboard is exactly what I wanted but never built myself.",
    author: "Dev Sharma",
    role: "Full-stack Developer",
    company: "Independent",
    avatar: "DS",
    color: "from-emerald-400 to-teal-500",
    rating: 5,
  },
  {
    quote: "The clean API design makes it trivial to automate. One POST request and I have a shortened link in my clipboard via a shell script.",
    author: "Tomás Rivera",
    role: "DevOps Lead",
    company: "StackCore",
    avatar: "TR",
    color: "from-rose-400 to-pink-500",
    rating: 5,
  },
  {
    quote: "Honestly the best URL shortener I've tried. Simple, fast, and the free tier actually covers real use cases. No dark patterns.",
    author: "Priya Nair",
    role: "Founder",
    company: "Leafly App",
    avatar: "PN",
    color: "from-amber-400 to-orange-500",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1.5L8.545 5.18L12.5 5.45L9.6 7.9L10.59 11.77L7 9.6L3.41 11.77L4.4 7.9L1.5 5.45L5.455 5.18L7 1.5Z" fill="#F59E0B" stroke="#F59E0B" strokeWidth="0.5" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 mb-6">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L7.545 4.18L11 4.45L8.6 6.4L9.39 9.77L6 7.95L2.61 9.77L3.4 6.4L1 4.45L4.455 4.18L6 1Z" fill="#F59E0B" />
            </svg>
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Testimonials</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Loved by{" "}
            <span className="gradient-text">thousands</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            From indie developers to growth teams at fast-moving companies — here&apos;s what they say.
          </p>
        </div>

        {/* Social proof bar */}
        <div className="flex items-center justify-center gap-8 lg:gap-16 mb-16 flex-wrap">
          {[
            { label: "Average rating", value: "4.9/5" },
            { label: "Active users", value: "24,000+" },
            { label: "Links created", value: "12M+" },
            { label: "Uptime", value: "99.98%" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-white rounded-2xl border border-slate-100 p-7 shadow-sm relative overflow-hidden"
            >
              {/* Quote mark */}
              <div className="absolute top-5 right-6 text-slate-100">
                <svg width="36" height="28" viewBox="0 0 36 28" fill="currentColor">
                  <path d="M0 28V17.067C0 12.769 1.231 9.176 3.692 6.286 6.154 3.333 9.615 1.397 14.077 0.476V5.714C11.667 6.254 9.795 7.429 8.462 9.238 7.128 11.047 6.462 13.206 6.462 15.714H13.846V28H0ZM22.154 28V17.067C22.154 12.769 23.385 9.176 25.846 6.286 28.308 3.333 31.769 1.397 36.231 0.476V5.714C33.821 6.254 31.949 7.429 30.615 9.238 29.282 11.047 28.615 13.206 28.615 15.714H36V28H22.154Z" />
                </svg>
              </div>

              <StarRating count={t.rating} />
              <p className="text-sm text-slate-700 leading-relaxed mb-6 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-linear-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.author}</p>
                  <p className="text-xs text-slate-500">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

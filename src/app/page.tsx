import Navbar from "@/components/Navbar";
import HeroIllustration from "@/components/HeroIllustration";
import HeroForm from "@/components/HeroForm";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import LinksTable from "@/components/LinksTable";
import Footer from "@/components/Footer";
import { ShortenedLink } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "https://api.wrappp.io";

async function getLinks(): Promise<ShortenedLink[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/shorten`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.data ?? []);
  } catch {
    return [];
  }
}

export default async function Home() {
  const links = await getLinks();

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center hero-gradient overflow-hidden pt-16"
      >
        {/* Grid background */}
        <div className="absolute inset-0 grid-pattern" />

        {/* Top gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 pointer-events-none" />

        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s", animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-0 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-64px)]">
            {/* Left: Content */}
            <div className="flex flex-col justify-center pt-8 lg:pt-0">
              {/* Badge */}
              {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 w-fit mb-7">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                </div>
                <span className="text-xs font-semibold text-indigo-700">
                  New · Link analytics dashboard is live
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-indigo-400">
                  <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div> */}

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-6">
                Shorten links.{" "}
                <br className="hidden sm:block" />
                <span className="gradient-text">Amplify reach.</span>
              </h1>

              <p className="text-lg lg:text-xl text-slate-500 leading-relaxed mb-10 max-w-xl">
                Transform any URL into a powerful short link with real-time analytics, QR codes, and a full REST API. Free, instant, and no sign-up required.
              </p>

              {/* Hero Form */}
              <div className="max-w-2xl">
                <HeroForm />
              </div>

              {/* Social proof */}
              {/* <div className="mt-10 flex items-center gap-4 flex-wrap">
                <div className="flex -space-x-2">
                  {["from-indigo-400 to-blue-500", "from-violet-400 to-indigo-500", "from-blue-400 to-cyan-500", "from-emerald-400 to-teal-500"].map((gradient, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}
                    >
                      {["MC", "JO", "SL", "DS"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#F59E0B">
                        <path d="M6 1L7.545 4.18L11 4.45L8.6 6.4L9.39 9.77L6 7.95L2.61 9.77L3.4 6.4L1 4.45L4.455 4.18L6 1Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">4.9/5</span> from 2,400+ reviews
                  </p>
                </div>
              </div> */}
            </div>

            {/* Right: 3D Illustration */}
            <div className="hidden lg:flex items-center justify-center relative h-[580px]">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* <StatsSection /> */}

      {/* Features */}
      {/* <FeaturesSection /> */}

      {/* How it works */}
      {/* <HowItWorksSection /> */}

      {/* Testimonials */}
      {/* <TestimonialsSection /> */}

      {/* Dashboard / Link Management */}
      {/* <section id="dashboard" className="py-24 lg:py-32 bg-slate-50 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Live dashboard</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                Your recent links
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Manage, copy, and delete your shortened URLs. Data loaded server-side via{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono text-indigo-600">
                  GET /api/v1/shorten
                </code>
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-emerald-500">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" />
                <path d="M4 7L6.5 9.5L10 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{links.length} link{links.length !== 1 ? "s" : ""} total</span>
            </div>
          </div>

          <LinksTable initialLinks={links} />
        </div>
      </section> */}

      {/* CTA */}
      {/* <CTASection /> */}

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}

import type { Metadata } from "next";
import HeroIllustration from "@/components/HeroIllustration";
import HeroForm from "@/components/HeroForm";
import Footer from "@/components/Footer";

const SITE_URL = process.env.SITE_URL ?? "https://wrappp.io";
const REDIRECT_BASE = process.env.REDIRECT_BASE ?? "https://go.wrappp.io";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Wrappp",
      description:
        "Free URL shortener with QR code generation and 30-day rolling link expiry.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: "Wrappp",
      url: SITE_URL,
      description:
        "Transform long URLs into short links with QR codes. Links are active for 30 days and automatically renewed on each click.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free tier — no account required",
      },
      author: {
        "@type": "Organization",
        name: "Gatto Lab",
        url: "https://github.com/gattolab",
      },
      featureList: [
        "Instant URL shortening",
        "QR code generation",
        "30-day rolling link expiry",
        "REST API access",
        "No account required",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Gatto Lab",
      url: "https://github.com/gattolab",
      logo: `${SITE_URL}/icon.svg`,
      sameAs: [
        "https://github.com/gattolab",
        "https://github.com/gattolab/wrappp",
      ],
    },
  ],
};

export default async function Home() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="h-screen flex flex-col hero-gradient relative overflow-hidden">
        {/* Shared background decorations */}
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-blue-200/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: "6s", animationDelay: "2s" }} />

        {/* Hero */}
        <main id="hero" className="relative flex-1 flex items-center pt-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div className="flex flex-col justify-center py-8 lg:py-0">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-6">
                  Shorten links.{" "}
                  <br className="hidden sm:block" />
                  <span className="gradient-text">Amplify reach.</span>
                </h1>

                <p className="text-lg lg:text-xl text-slate-500 leading-relaxed mb-10 max-w-xl">
                  Transform any URL into a powerful short link with a QR code.
                  Free, instant, no sign-up required.
                </p>

              <div className="max-w-2xl">
                <HeroForm redirectBase={REDIRECT_BASE} />
              </div>
              </div>

              {/* Right: 3D Illustration */}
              <div className="hidden lg:flex items-center justify-center relative h-[520px]" aria-hidden="true">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

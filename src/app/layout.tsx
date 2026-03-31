import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.SITE_URL ?? "https://wrappp.io";
const SITE_NAME = "Wrappp";
const DEFAULT_TITLE = "Wrappp — Smart URL Shortener";
const DEFAULT_DESCRIPTION =
  "Transform long URLs into powerful short links with QR codes and 30-day rolling expiry. Free, instant, no sign-up required. Built for developers and teams.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "URL shortener",
    "link shortener",
    "short links",
    "QR code generator",
    "link management",
    "free URL shortener",
    "open source URL shortener",
    "REST API link shortener",
  ],
  authors: [{ name: "Gatto Lab", url: "https://github.com/gattolab" }],
  creator: "Gatto Lab",
  publisher: "Gatto Lab",

  // Canonical + alternate
  alternates: {
    canonical: "/",
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Wrappp — Smart URL Shortener",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/opengraph-image"],
    creator: "@gattolab",
    site: "@gattolab",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // App-related
  applicationName: SITE_NAME,
  category: "technology",
  classification: "Developer Tools",

  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },  // SVG — scales to any size
      { url: "/icon", type: "image/png" },           // PNG fallback via icon.tsx
    ],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },

  // Verification placeholders — fill in once you have the codes
  // verification: {
  //   google: "YOUR_GOOGLE_SITE_VERIFICATION",
  //   yandex: "YOUR_YANDEX_VERIFICATION",
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

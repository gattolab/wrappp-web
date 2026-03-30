import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wrappp — Smart URL Shortener",
  description: "Transform long URLs into powerful short links. Track clicks, manage links, and grow your audience with Wrappp — the modern URL shortener built for professionals.",
  keywords: ["URL shortener", "link shortener", "short links", "link management", "click tracking"],
  openGraph: {
    title: "Wrappp — Smart URL Shortener",
    description: "Transform long URLs into powerful short links.",
    type: "website",
  },
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

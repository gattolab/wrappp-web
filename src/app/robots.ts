import type { MetadataRoute } from "next";

const SITE_URL = process.env.SITE_URL ?? "https://wrappp.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/r/", "/healthz"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

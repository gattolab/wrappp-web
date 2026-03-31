import { ShortenedLink, CreateShortenRequest, CreateShortenResponse } from "@/types";

const API_BASE = process.env.API_BASE ?? "https://api.wrappp.link";
const REDIRECT_BASE = process.env.REDIRECT_BASE ?? "https://wrappp.link";

export const apiClient = {
  async createShorten(data: CreateShortenRequest): Promise<CreateShortenResponse> {
    const res = await fetch(`${API_BASE}/api/v1/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async getShortenList(): Promise<ShortenedLink[]> {
    const res = await fetch(`${API_BASE}/api/v1/shorten`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.data ?? [];
  },

  async getShortenByCode(code: string): Promise<ShortenedLink | null> {
    const res = await fetch(`${API_BASE}/api/v1/shorten/${code}`);
    if (!res.ok) return null;
    return res.json();
  },

  async deleteShortenByCode(code: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/api/v1/shorten/${code}`, {
      method: "DELETE",
    });
    return res.ok;
  },

  getRedirectUrl(code: string): string {
    return `${REDIRECT_BASE}/r/${code}`;
  },
};

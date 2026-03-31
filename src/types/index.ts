export interface ShortenedLink {
  id: string;
  code: string;
  target_url: string;
  short_url: string;
  clicks: number;
  created_at: string;
  expires_at: string | null;
}

export interface CreateShortenRequest {
  target_url: string;
  expires_at: string | null;
}

export interface CreateShortenResponse {
  code: string;
  short_url: string;
  target_url: string;
  created_at: string;
  expires_at: string | null;
}

export interface ApiListResponse {
  data: ShortenedLink[];
  total: number;
  page: number;
  per_page: number;
}

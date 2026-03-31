"use server";

import { revalidatePath } from "next/cache";
import { CreateShortenRequest } from "@/types";

const API_BASE = process.env.API_BASE ?? "https://api.wrappp.io";

function validateShortCode(code: string): string {
  // Allow only URL-safe short codes to prevent path traversal or malformed requests
  if (!/^[A-Za-z0-9_-]+$/.test(code)) {
    throw new Error("Invalid short code");
  }
  return code;
}

export async function shortenUrl(data: CreateShortenRequest) {
  const res = await fetch(`${API_BASE}/api/v1/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to shorten URL");
  }

  revalidatePath("/");
  return res.json();
}

export async function deleteLink(code: string) {
  const safeCode = validateShortCode(code);
  const res = await fetch(`${API_BASE}/api/v1/shorten/${safeCode}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete link");
  }

  revalidatePath("/");
  return true;
}

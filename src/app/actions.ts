"use server";

import { revalidatePath } from "next/cache";
import { CreateShortenRequest } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "https://api.wrappp.io";

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
  const res = await fetch(`${API_BASE}/api/v1/shorten/${code}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete link");
  }

  revalidatePath("/");
  return true;
}

import { NextRequest, NextResponse } from "next/server";

const REDIRECT_BASE = process.env.NEXT_PUBLIC_REDIRECT_BASE ?? "https://go.wrappp.link";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  return NextResponse.redirect(`${REDIRECT_BASE}/r/${code}`, { status: 302 });
}

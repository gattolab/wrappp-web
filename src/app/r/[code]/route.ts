import { NextRequest, NextResponse } from "next/server";

const REDIRECT_BASE = process.env.REDIRECT_BASE ?? "https://wrappp.link";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  return NextResponse.redirect(`${REDIRECT_BASE}/r/${code}`, { status: 302 });
}

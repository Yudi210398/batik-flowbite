import { NextRequest, NextResponse } from "next/server";

import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get("tag");
  if (!tag) return NextResponse.json({ data: "gk bisa" });
  const data = revalidateTag(tag);
  console.log(`hasil`, data);
  return NextResponse.json({ data: "bisa" });
}

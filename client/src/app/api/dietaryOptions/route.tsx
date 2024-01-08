import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    `${process.env.NEXT_BACKEND_HOST}/api/dietaryOptions`,
  );
  const data = await response.json();
  return NextResponse.json({ data });
}

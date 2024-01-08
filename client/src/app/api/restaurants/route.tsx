import { NextResponse } from "next/server";
export const revalidate = 1;

export async function GET() {
  const response = await fetch(
    `${process.env.NEXT_BACKEND_HOST}/api/restaurants`,
  );
  const data = await response.json();
  return NextResponse.json({ data });
}

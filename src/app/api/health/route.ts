import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    app: "next-standalone",
    status: "ok",
    message: "Frontend + backend are running in the same Next.js app",
    serverTime: new Date().toISOString(),
  });
}

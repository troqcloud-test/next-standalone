import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

const CACHE_KEY = "users:all";
const CACHE_TTL = 60;

export async function GET() {
  try {
    const cached = await redis.get(CACHE_KEY);
    if (cached) {
      return NextResponse.json(JSON.parse(cached), {
        headers: { "X-Cache": "HIT" },
      });
    }
  } catch {
    // Redis unavailable — fall through to DB
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  try {
    await redis.set(CACHE_KEY, JSON.stringify(users), "EX", CACHE_TTL);
  } catch {
    // ignore cache write failures
  }

  return NextResponse.json(users, { headers: { "X-Cache": "MISS" } });
}

import { NextResponse } from "next/server";

import { currentUser } from "@/auth";

export async function GET() {
  const session = await currentUser();

  return NextResponse.json(session);
}

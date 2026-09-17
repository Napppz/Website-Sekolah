import { NextResponse } from "next/server"
import { getSchoolProfile } from "@/lib/data"

export async function GET() {
  const profile = await getSchoolProfile()
  return NextResponse.json({ profile })
}

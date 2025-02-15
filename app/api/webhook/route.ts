import { NextResponse, NextRequest } from "next/server"
import { github } from "@/lib/github/client"

export const POST = async (req: NextRequest) => {
  try {
    await github.webhooks.verifyAndReceive({
      id: req.headers.get("x-github-delivery") as string,
      name: req.headers.get("x-github-event") as string,
      signature: req.headers.get("x-hub-signature-256") as string,
      payload: await req.text(),
    })
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ message: "Authorized" }, { status: 200 })
}

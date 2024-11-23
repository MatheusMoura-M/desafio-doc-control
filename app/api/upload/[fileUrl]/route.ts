import { promises as fs } from "fs"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function GET(
  req: NextRequest,
  { params }: { params: { fileUrl: string } },
) {
  try {
    const { fileUrl } = params

    if (!fileUrl) {
      return NextResponse.json(
        { message: "Arquivo não especificado." },
        { status: 400 },
      )
    }

    const filePath = path.join(process.cwd(), "public/upload", fileUrl)

    try {
      await fs.stat(filePath)
      return NextResponse.json({ exists: true })
    } catch {
      return NextResponse.json({ exists: false })
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao verificar arquivo.", error },
      { status: 500 },
    )
  }
}

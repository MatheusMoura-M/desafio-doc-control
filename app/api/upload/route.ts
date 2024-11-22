import { db } from "@/app/_lib/prisma"
import { OrderOrigin, OrderType } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"
import { randomUUID as uuid } from "crypto"
import { promises as fs } from "fs"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")

    let data: ArrayBuffer | undefined
    let fileUrl = ""

    if (file instanceof File) {
      data = await file.arrayBuffer()

      if (data) {
        const directory = path.join(process.cwd(), "public/upload")
        await fs.mkdir(directory, { recursive: true })

        const uniqueFileName = `${path.parse(file.name).name}&&${uuid()}&&${path.extname(file.name)}`

        const filePath = path.join(directory, uniqueFileName)
        await fs.writeFile(filePath, Buffer.from(data))
        fileUrl = uniqueFileName
      }
    }

    return NextResponse.json(fileUrl)
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao excluir documento", error },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { filePath } = await req.json()

    console.log("AAA", filePath)
    if (!filePath) {
      return NextResponse.json(
        { error: "Nenhum arquivo passado" },
        { status: 400 },
      )
    }

    const absolutePath = path.join(process.cwd(), "public/upload", filePath)

    try {
      await fs.stat(absolutePath)
    } catch {
      return NextResponse.json({ error: "Arquivo não existe" }, { status: 404 })
    }

    await fs.unlink(absolutePath)

    return NextResponse.json({ message: "Arquivo deletado com sucesso" })
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao excluir documento", error },
      { status: 500 },
    )
  }
}

import { db } from "@/app/_lib/prisma"
import { OrderOrigin, OrderType } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"
import { randomUUID as uuid } from "crypto"
import { promises as fs } from "fs"
import { revalidatePath } from "next/cache"
import { NextRequest } from "next/server"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    let origin = formData.get("origin") as string
    let type = formData.get("type") as string
    const emitter = formData.get("emitter") as string
    const taxValue = new Decimal(formData.get("taxValue") as string)
    const netValue = new Decimal(formData.get("netValue") as string)
    const file = formData.get("file")

    let data: ArrayBuffer | undefined
    let fileUrl = ""

    if (file instanceof File) {
      data = await file.arrayBuffer()

      if (data) {
        const directory = path.join(process.cwd(), "upload")
        await fs.mkdir(directory, { recursive: true })

        const uniqueFileName = `${path.parse(file.name).name}&&${uuid()}&&${path.extname(file.name)}`

        const filePath = path.join(directory, uniqueFileName)
        await fs.writeFile(filePath, Buffer.from(data))
        fileUrl = uniqueFileName
      } else {
        console.error("Erro: Nenhum dado encontrado no arquivo.")
      }
    }

    if (origin === "Eletrônico") {
      origin = OrderOrigin.ELECTRONIC
    } else {
      origin = OrderOrigin.DIGITALIZED
    }

    if (type === "Nota fiscal de serviço") {
      type = OrderType.SERVICE_NOTE
    } else {
      type = OrderType.SERVICE_CONTRACT
    }

    console.log("FORM", formData)

    const document = await db.document.create({
      data: {
        origin: origin as OrderOrigin,
        type: type as OrderType,
        fileUrl,
        emitter,
        taxValue,
        netValue,
      },
    })
    console.log("DATA", document)

    return new Response(JSON.stringify(document), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido"

    return new Response(JSON.stringify({ message: errorMessage }), {
      headers: { "Content-Type": "application/json" },
    })
  } finally {
    revalidatePath("/")
  }
}

import { db } from "@/app/_lib/prisma"
import { OrderOrigin, OrderType } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"
import { revalidatePath } from "next/cache"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    let origin = formData.get("origin") as string
    const userId = formData.get("userId") as string
    let type = formData.get("type") as string
    const emitter = formData.get("emitter") as string
    const taxValue = new Decimal(formData.get("taxValue") as string)
    const netValue = new Decimal(formData.get("netValue") as string)
    const fileUrl = formData.get("fileUrl") as string

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

    const document = await db.document.create({
      data: {
        origin: origin as OrderOrigin,
        type: type as OrderType,
        fileUrl,
        emitter,
        taxValue,
        netValue,
        userId,
      },
    })

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

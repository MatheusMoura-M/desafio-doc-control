import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    if (!id) {
      return NextResponse.json(
        { message: "ID inválido ou não fornecido" },
        { status: 400 },
      )
    }
    const document = await db.document.findUnique({
      where: { id },
    })

    if (!document) {
      return NextResponse.json(
        { message: "Documento não encontrado" },
        { status: 404 },
      )
    }

    await db.document.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Documento excluído com sucesso" })
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao excluir documento", error },
      { status: 500 },
    )
  } finally {
    revalidatePath("/")
  }
}

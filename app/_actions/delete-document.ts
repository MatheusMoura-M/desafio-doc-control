"use server"
import { db } from "../_lib/prisma"

export const deleteDocument = async (documentId: string) => {
  const document = await db.document.findUnique({
    where: {
      id: documentId,
    },
  })

  if (document) {
    await db.document.delete({
      where: {
        id: documentId,
      },
    })
  }
}

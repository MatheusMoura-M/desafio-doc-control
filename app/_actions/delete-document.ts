"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const deleteDocument = async (documentId: string) => {
  await db.document.delete({
    where: {
      id: documentId,
    },
  })
  revalidatePath("/")
}

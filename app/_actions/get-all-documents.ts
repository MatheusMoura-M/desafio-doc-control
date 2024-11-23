"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const getAllDocuments = async (userId: string) => {
  const documents = await db.document.findMany({
    where: {
      userId,
    },
  })

  const documentsWithConvertedValues = documents.map((doc) => ({
    ...doc,
    netValue: doc.netValue.toString(),
    taxValue: doc.taxValue.toString(),
  }))

  return documentsWithConvertedValues
}
revalidatePath("/")

"use server"

import { db } from "../_lib/prisma"

export const getAllDocuments = async () => {
  const documents = await db.document.findMany()

  const documentsWithConvertedValues = documents.map((doc) => ({
    ...doc,
    netValue: doc.netValue.toString(),
    taxValue: doc.taxValue.toString(),
  }))

  return documentsWithConvertedValues
}

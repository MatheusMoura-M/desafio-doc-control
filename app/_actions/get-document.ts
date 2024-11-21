"use server"

import { db } from "../_lib/prisma"

export const getDocument = (documentId: number) => {
  return db.document.findMany({
    where: {
      id: documentId,
    },
  })
}

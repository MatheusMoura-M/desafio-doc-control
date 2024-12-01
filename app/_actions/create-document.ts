"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { OrderOrigin, OrderType } from "@prisma/client"

interface CreateDocumentParams {
  origin: OrderOrigin
  type: OrderType
  emitter: string
  taxValue: number
  netValue: number
  fileUrl: string
  typeFile: string
  userId: string
}

export const createDocument = async (data: CreateDocumentParams) => {
  await db.document.create({ data })
  revalidatePath("/")
}

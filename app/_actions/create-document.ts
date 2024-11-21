"use server"

import { Prisma } from "@prisma/client"
import fs from "fs"
import path from "path"
import { db } from "../_lib/prisma"

export const createDocument = async (params: any) => {
  console.log(params)
  // const { emitter, taxAmount, netAmount, name, origin, type, file } = params
  // const filePath = path.join(process.cwd(), "uploads")
  // if (!fs.existsSync(filePath)) fs.mkdirSync(filePath)

  // const fileName = `${Date.now()}-${file.name}`
  // const fullFilePath = path.join(filePath, fileName)

  // const reader = new FileReader()
  // reader.onloadend = () => {
  //   const buffer = Buffer.from(reader.result as ArrayBuffer)
  //   fs.writeFileSync(fullFilePath, buffer)
  //   console.log("Arquivo salvo em", fullFilePath)
  // }

  // reader.readAsArrayBuffer(file)

  // Salvar os dados no banco de dados
  // const document = await db.document.create({
  //   data: {
  //     name,
  //     origin,
  //     type,
  //     fileUrl: `/uploads/${fileName}`,
  //     emitter,
  //     taxValue: parseFloat(taxValue),
  //     netValue: parseFloat(netValue),
  //   },
  // })
  const document = db.document.findMany()

  console.log(document)
  return document
}

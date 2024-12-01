"use server"
import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export const deleteDocument = async (documentId: string) => {
  const document = await db.document.findUnique({
    where: {
      id: documentId,
    },
  })

  if (document) {
    const url = document?.fileUrl.split("/").pop()

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: url,
    }

    const deleteObjectCommand = new DeleteObjectCommand(params)

    s3Client.send(deleteObjectCommand)
    await db.document.delete({
      where: {
        id: documentId,
      },
    })
  }

  revalidatePath("/")
}

"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const acceptedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/svg+xml",
  "image/png",
]

const maxFileSize = 1024 * 1024 * 10 // 10MB

const generateFileID = (bytes = 16) => crypto.randomBytes(bytes).toString("hex")

type getSignedURLProps = {
  name: string
  type: string
  size: number
}

export const getSignedURL = async (fileData: getSignedURLProps) => {
  if (!acceptedTypes.includes(fileData.type)) {
    return { failure: "Invalid file type", b: { fileData } }
  }

  if (fileData.size > maxFileSize) {
    return { failure: "File too large" }
  }

  const fileExtension = fileData.name.split(".")[1]
  const urlKey = `${generateFileID()}.${fileExtension}`

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: urlKey,
    ContentType: fileData.type,
    ContentLength: fileData.size,
  }

  const putObjectCommand = new PutObjectCommand(params)

  const signedURL = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60,
  })

  const data = {
    signedURL: signedURL,
    urlFile: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${urlKey}`,
  }

  return { success: data }
}

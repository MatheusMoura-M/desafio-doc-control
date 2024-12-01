import { z } from "zod"

export const documentSchema = z.object({
  id: z.string(),
  typeFile: z.string(),
  fileUrl: z.string(),
  emitter: z.string(),
  taxValue: z.string(),
  netValue: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  origin: z.enum(["DIGITALIZED", "ELECTRONIC"]),
  type: z.enum(["SERVICE_CONTRACT", "SERVICE_NOTE"]),
})

export type Document = z.infer<typeof documentSchema>

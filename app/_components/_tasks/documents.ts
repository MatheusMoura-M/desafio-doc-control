import { Document } from "@/app/_context/document"

interface iDocumentJson
  extends Omit<
    Document,
    "id" | "createdAt" | "updatedAt" | "taxValue" | "netValue"
  > {
  taxValue: number
  netValue: number
}

export const documentsJson: iDocumentJson[] = [
  {
    origin: "DIGITALIZED",
    type: "SERVICE_NOTE",
    fileUrl:
      "https://desafio-doc-control.s3.sa-east-1.amazonaws.com/050e0eeddd7a1a8dbe5460b919881e29.pdf",
    typeFile: "application/pdf",
    emitter: "Matheus",
    taxValue: 123,
    netValue: 434.86,
    userId: "user_2pDDRpsbljikwfH96eYyjuYTdpE",
  },
  {
    origin: "ELECTRONIC",
    type: "SERVICE_CONTRACT",
    fileUrl:
      "https://desafio-doc-control.s3.sa-east-1.amazonaws.com/050e0eeddd7a1a8dbe5460b919881e29.pdf",
    typeFile: "application/pdf",
    emitter: "João",
    taxValue: 50,
    netValue: 140.6,
    userId: "user_2pDDRpsbljikwfH96eYyjuYTdpE",
  },
  {
    origin: "DIGITALIZED",
    type: "SERVICE_CONTRACT",
    fileUrl:
      "https://desafio-doc-control.s3.sa-east-1.amazonaws.com/050e0eeddd7a1a8dbe5460b919881e29.pdf",
    typeFile: "application/pdf",
    emitter: "Lucas Lima",
    taxValue: 2250.74,
    netValue: 11145.86,
    userId: "user_2pDDRpsbljikwfH96eYyjuYTdpE",
  },
  {
    origin: "ELECTRONIC",
    type: "SERVICE_NOTE",
    fileUrl:
      "https://desafio-doc-control.s3.sa-east-1.amazonaws.com/050e0eeddd7a1a8dbe5460b919881e29.pdf",
    typeFile: "application/pdf",
    emitter: "Zé Felipe",
    taxValue: 345.7,
    netValue: 14754.8,
    userId: "user_2pDDRpsbljikwfH96eYyjuYTdpE",
  },
  {
    origin: "DIGITALIZED",
    type: "SERVICE_CONTRACT",
    fileUrl:
      "https://desafio-doc-control.s3.sa-east-1.amazonaws.com/050e0eeddd7a1a8dbe5460b919881e29.pdf",
    typeFile: "application/pdf",
    emitter: "Maria",
    taxValue: 458,
    netValue: 7444.27,
    userId: "user_2pDDRpsbljikwfH96eYyjuYTdpE",
  },
  {
    origin: "DIGITALIZED",
    type: "SERVICE_CONTRACT",
    fileUrl:
      "https://desafio-doc-control.s3.sa-east-1.amazonaws.com/050e0eeddd7a1a8dbe5460b919881e29.pdf",
    typeFile: "application/pdf",
    emitter: "Zeca",
    taxValue: 441,
    netValue: 4678.22,
    userId: "user_2pDDRpsbljikwfH96eYyjuYTdpE",
  },
]

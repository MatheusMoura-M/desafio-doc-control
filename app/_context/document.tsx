"use client"
import React, { createContext, ReactNode, useContext, useState } from "react"

export interface Document {
  id: string
  emitter: string
  fileUrl: string
  netValue: string
  createdAt: Date
  origin: "DIGITALIZED" | "ELECTRONIC"
  taxValue: string
  type: "SERVICE_CONTRACT" | "SERVICE_NOTE"
  updatedAt: Date
}

interface DocumentContext {
  documents: Document[]
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>
}

const DocumentContext = createContext<DocumentContext | undefined>({
  documents: [],
  setDocuments: () => {},
})

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<Document[]>([])

  return (
    <DocumentContext.Provider value={{ documents, setDocuments }}>
      {children}
    </DocumentContext.Provider>
  )
}

export const useDocuments = (): DocumentContext => {
  const context = useContext(DocumentContext)
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentProvider")
  }
  return context
}

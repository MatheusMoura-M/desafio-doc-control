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
  userId: string
  type: "SERVICE_CONTRACT" | "SERVICE_NOTE"
  updatedAt: Date
}

interface DocumentContext {
  documents: Document[]
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>
  showModalViewer: boolean
  setShowModalViewer: React.Dispatch<React.SetStateAction<boolean>>
  isOpenViewerFile: boolean
  setIsOpenViewerFile: React.Dispatch<React.SetStateAction<boolean>>
  file: File | Blob | null
  setFile: React.Dispatch<React.SetStateAction<File | Blob | null>>
  fileUrl: string
  setFileUrl: React.Dispatch<React.SetStateAction<string>>
  user: string
  setUser: React.Dispatch<React.SetStateAction<string>>
}

const DocumentContext = createContext<DocumentContext | undefined>({
  documents: [],
  setDocuments: () => {},
  showModalViewer: false,
  setShowModalViewer: () => {},
  isOpenViewerFile: false,
  setIsOpenViewerFile: () => {},
  file: null,
  setFile: () => {},
  fileUrl: "",
  setFileUrl: () => {},
  user: "",
  setUser: () => {},
})

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [showModalViewer, setShowModalViewer] = useState<boolean>(false)
  const [file, setFile] = useState<File | Blob | null>(null)
  const [fileUrl, setFileUrl] = useState<string>("")
  const [isOpenViewerFile, setIsOpenViewerFile] = useState<boolean>(false)
  const [user, setUser] = useState<string>("")

  return (
    <DocumentContext.Provider
      value={{
        documents,
        setDocuments,
        showModalViewer,
        setShowModalViewer,
        file,
        fileUrl,
        setFile,
        setFileUrl,
        isOpenViewerFile,
        setIsOpenViewerFile,
        user,
        setUser,
      }}
    >
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

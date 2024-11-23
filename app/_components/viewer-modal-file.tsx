import { Worker } from "@react-pdf-viewer/core"
import { Viewer } from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { useDocuments } from "../_context/document"
import { useEffect, useState } from "react"

const ViewerModalFile = () => {
  const { file, fileUrl } = useDocuments()
  const [fileExists, setFileExists] = useState(false)
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
  })

  useEffect(() => {
    const checkFileExists = async () => {
      if (!fileUrl) return
      try {
        const response = await fetch(`/api/upload/${fileUrl}`)

        const data = await response.json()
        setFileExists(data.exists)
      } catch {
        setFileExists(false)
      }
    }
    checkFileExists()
  }, [fileUrl])

  if (!fileExists) {
    return (
      <DialogContent className="flex h-[610px] max-w-[80%] flex-col bg-white px-6 pb-0">
        <DialogHeader className="h-max">
          <DialogTitle className="text-[#3A424E]">
            Arquivo não encontrado
          </DialogTitle>
          <DialogDescription className="text-[#6B7280]">
            O arquivo especificado não foi encontrado no servidor.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="absolute bottom-0 right-0 flex h-20 min-h-20 justify-between bg-white px-6 py-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="h-10 rounded bg-[#05C151] text-white"
            >
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    )
  }

  return (
    <DialogContent className="flex h-[610px] max-w-[80%] flex-col bg-white px-0 pb-0">
      <DialogHeader className="h-max px-6">
        <DialogTitle className="text-[#3A424E]">
          Pré-visualização do arquivo
        </DialogTitle>
        <DialogDescription className="text-[#6B7280]">
          {file instanceof File ? file.name : undefined}
        </DialogDescription>
      </DialogHeader>

      <div className="group mx-6 overflow-y-auto border-b pb-6">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={`/upload/${fileUrl}`}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>

        <style>
          {`
                .rpv-default-layout__toolbar {
                    background-color: white;
                }
                    
                .rpv-core__inner-page {
                    background-color: #F3F4F6;
                }

                .rpv-default-layout__container:has(.rpv-core__minimal-button[aria-label="Switch to the light theme"]) .rpv-core__inner-page {
                    background-color: #1a1a1a;
                }
                
                .rpv-default-layout__container:has(.rpv-core__minimal-button[aria-label="Switch to the light theme"]) .rpv-default-layout__toolbar {
                    background-color: #000;
                }
            `}
        </style>
      </div>

      <DialogFooter className="flex h-20 min-h-20 justify-between bg-white px-6 py-4">
        <DialogClose asChild>
          <Button
            variant="outline"
            className="h-10 rounded bg-[#05C151] text-white"
          >
            Fechar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}

export default ViewerModalFile

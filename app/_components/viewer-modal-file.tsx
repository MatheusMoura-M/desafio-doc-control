import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
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
import dynamic from "next/dynamic"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import Image from "next/image"

const Viewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false }, // Desativa o SSR para este componente
)

const Worker = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Worker),
  { ssr: false },
)

const ViewerModalFile = () => {
  const { file, fileUrl, isImgType } = useDocuments()
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
  })

  if (!fileUrl) {
    return (
      <DialogContent className="flex h-[610px] max-w-[80%] flex-col bg-white px-6 pb-0">
        <DialogHeader className="h-max">
          <DialogTitle className="text-blue-lighter">
            Arquivo não encontrado
          </DialogTitle>
          <DialogDescription className="text-Gray-blue">
            O arquivo especificado não foi encontrado no servidor.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="absolute bottom-0 right-0 flex h-20 min-h-20 justify-between bg-white px-6 py-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="bg-Blue h-10 rounded text-white"
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
        <DialogTitle className="text-blue-lighter">
          Pré-visualização do arquivo
        </DialogTitle>
        <DialogDescription className="text-Gray-blue">
          {file instanceof File ? file.name : undefined}
        </DialogDescription>
      </DialogHeader>

      {isImgType ? (
        <figure className="flex flex-1 items-center justify-center">
          <Image
            src={fileUrl}
            alt="Imagem para visualização"
            className=""
            width={420}
            height={420}
          />
        </figure>
      ) : (
        <div className="group mx-6 flex-1 overflow-y-auto border-b pb-6">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={fileUrl!}
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
      )}

      <DialogFooter className="flex h-20 min-h-20 justify-between bg-white px-6 py-4">
        <DialogClose asChild>
          <Button variant="outline" className="bg-Blue h-10 rounded text-white">
            Fechar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}

export default ViewerModalFile

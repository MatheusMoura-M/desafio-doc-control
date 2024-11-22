import { Button } from "@/_components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog"
import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"
import { Separator } from "@/_components/ui/separator"
import { ArrowRight, CircleHelp, CircleX, FileUp, X } from "lucide-react"
import { useState } from "react"
import { DataTableFacetedFilter } from "./tasks/components/data-table-faceted-filter"
import { originsDocument, typesDocument } from "./tasks/data/data"
import { useDocuments } from "../_context/document"
import { getAllDocuments } from "../_actions/get-all-documents"
import { Progress } from "./ui/progress"
import { toast } from "sonner"
import ViewerModalFile from "./viewer-modal-file"

export const CreateDocumentoModal = () => {
  const { setDocuments } = useDocuments()

  const [showModalViewer, setShowModalViewer] = useState<boolean>(false)

  const [documentSource, setDocumentSource] = useState<string>("")
  const [documentType, setDocumentType] = useState<string>("")
  const [file, setFile] = useState<File | Blob | null>(null)
  const [fileSize, setFileSize] = useState<number>(0)
  const [fileUrl, setFileUrl] = useState<string>("")
  const [issuer, setIssuer] = useState<string>("")
  const [taxValue, setTaxValue] = useState<number>(0)
  const [netValue, setNetValue] = useState<number>(0)

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const value = event.target.files[0]
      setFile(value)

      const formData = new FormData()
      formData.append("file", value)

      const resp = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const url = await resp.json()
      setFileUrl(url)

      const fileSizeMB = value.size / 1024 / 1024

      setFileSize(parseFloat(fileSizeMB.toFixed(1)))
    }
  }

  const handleDeleteFile = async (filePath: string) => {
    clearStates()

    if (file) {
      try {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filePath }),
        })
      } catch (error) {
        console.error("Error deleting file:", error)
      }
    }
  }

  const clearStates = () => {
    setFile(null)
    setDocumentSource("")
    setDocumentType("")
    setIssuer("")
    setTaxValue(0)
    setNetValue(0)
    setFileSize(0)
  }

  const handleSubmit = async () => {
    if (
      documentSource &&
      documentType &&
      issuer &&
      taxValue &&
      netValue &&
      fileUrl
    ) {
      const formData = new FormData()
      formData.append("origin", documentSource)
      formData.append("type", documentType)
      formData.append("fileUrl", fileUrl)
      formData.append("emitter", issuer)
      formData.append("taxValue", taxValue.toString())
      formData.append("netValue", netValue.toString())

      await fetch("/api/document", {
        method: "POST",
        body: formData,
      })

      const updatedDocuments = await getAllDocuments()
      setDocuments(updatedDocuments)
      clearStates()
    } else {
      toast.error("Preencha todos os campos corretamente")
    }
  }

  return (
    <DialogContent className="flex h-[610px] max-w-[696px] flex-col overflow-y-auto bg-white">
      <DialogHeader className="h-max">
        <DialogTitle>Criar novo documento</DialogTitle>
        <DialogDescription>
          Insira os dados necessários para criar
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Input
            id="document-number"
            disabled
            value="0000"
            className="h-8 w-[57px] cursor-not-allowed rounded-full bg-[#F3F4F6]"
          />
        </div>

        <div>
          <Label htmlFor="name" className="text-right">
            Emitente
          </Label>
          <Input
            id="name"
            value={issuer}
            placeholder="Razão social do emitente"
            className="col-span-3"
            onChange={(e) => setIssuer(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="name" className="text-right">
            Valor total dos tributos
          </Label>
          <Input
            id="name"
            type="number"
            value={taxValue}
            placeholder="Valor em R$"
            className="col-span-3"
            onChange={(e) => setTaxValue(Number(e.target.value))}
          />
        </div>

        <div>
          <Label htmlFor="name" className="text-right">
            Valor líquido
          </Label>
          <Input
            id="name"
            type="number"
            value={netValue}
            placeholder="Valor em R$"
            className="col-span-3"
            onChange={(e) => setNetValue(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-2">
            Origem do documento <CircleHelp size={14} color="gray" />
          </Label>

          <DataTableFacetedFilter
            title="Origem do Documento"
            options={originsDocument}
            setState={setDocumentSource}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-2">
            Tipo documental <CircleHelp size={14} color="gray" />
          </Label>

          <DataTableFacetedFilter
            title="Tipo Documental"
            options={typesDocument}
            setState={setDocumentType}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-[183px] items-center justify-center rounded border-2 border-dashed border-[#05C151] bg-green-50 p-4">
            <label
              htmlFor="file-upload"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-around text-center text-sm text-gray-600"
            >
              <FileUp color="#05C151" />

              <span className="mb-2">
                Arraste e solte aqui ou selecione o arquivo para upload
              </span>

              <Button variant="outline" size="sm" className="bg-white">
                Procurar e selecionar arquivo
              </Button>

              <span className="mb-2 text-xs text-[#9CA3AF]">
                Tamanho max.: 10MB
              </span>

              <input
                id="file-upload"
                type="file"
                // accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {file && file instanceof File && (
            <>
              <div className="relative mt-6 flex items-center gap-6 rounded border py-[18.5px] pl-9">
                {fileSize <= 10 ? (
                  <>
                    <FileUp color="#9CA3AF" />

                    <div className="w-[86%]">
                      <p className="text-sm text-[#3A424E]">
                        Arquivo: {file.name}
                      </p>
                      <p className="mb-2 text-xs text-[#9CA3AF]">
                        {fileSize} de 10mb
                      </p>

                      <Progress value={fileSize * 10} className="w-full" />
                    </div>

                    <X
                      className="absolute right-5 top-5 cursor-pointer"
                      size={16}
                      color="#6B7280"
                      onClick={() => {
                        setFile(null)
                        setShowModalViewer(false)
                      }}
                    />
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <CircleX color="#f87171 " />
                    <p className="text-sm text-red-400">
                      Arquivo ultrapassou o tamanho máximo (10MB)
                    </p>
                  </div>
                )}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-max cursor-pointer content-start text-sm text-[#05C151] opacity-50 shadow-none hover:opacity-100"
                    onClick={() => setShowModalViewer(true)}
                  >
                    Pré-visualizar
                  </Button>
                </DialogTrigger>

                {showModalViewer && (
                  <ViewerModalFile fileName={file.name} fileUrl={fileUrl} />
                )}
              </Dialog>
            </>
          )}
        </div>
      </div>

      <Separator className="mt-4 bg-[#E5E7EB]" />

      <DialogFooter className="flex justify-between">
        <DialogClose asChild>
          <Button
            variant="outline"
            onClick={() => handleDeleteFile(fileUrl)}
            className="h-10"
          >
            Cancelar
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button
            onClick={handleSubmit}
            className="h-10 bg-[#05C151] text-white opacity-50"
          >
            Criar documento
            <ArrowRight />
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}

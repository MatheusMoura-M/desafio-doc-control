import { Button } from "@/_components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/_components/ui/dialog"
import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"
import { Separator } from "@/_components/ui/separator"
import { ArrowRight, CircleHelp, CircleX, FileUp, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { getAllDocuments } from "../_actions/get-all-documents"
import { useDocuments } from "../_context/document"
import { DataTableFacetedFilter } from "./_tasks/components/data-table-faceted-filter"
import { originsDocument, typesDocument } from "./_tasks/data/data"
import { Progress } from "./ui/progress"
import { getSignedURL } from "../_actions/aws/getSignedUrl"
import { createDocument } from "../_actions/create-document"
import { OrderOrigin, OrderType } from "@prisma/client"

export const imgTypes = ["image/jpeg", "image/svg+xml", "image/png"]

export const CreateDocumentoModal = () => {
  const {
    setDocuments,
    setShowModalViewer,
    file,
    setFile,
    fileUrl,
    setFileUrl,
    user,
    setIsImgType,
  } = useDocuments()

  const [documentSource, setDocumentSource] = useState<string>("")
  const [documentType, setDocumentType] = useState<string>("")
  const [fileSize, setFileSize] = useState<number>(0)
  const [issuer, setIssuer] = useState<string>("")
  const [taxValue, setTaxValue] = useState<number>(0)
  const [netValue, setNetValue] = useState<number>(0)

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const value = event.target.files[0]
      setFile(value)

      setIsImgType(imgTypes.includes(value.type))

      const fileSizeMB = value.size / 1024 / 1024
      setFileSize(parseFloat(fileSizeMB.toFixed(1)))

      if (fileUrl) {
        URL.revokeObjectURL(fileUrl)
      }
      if (value) {
        const url = URL.createObjectURL(value)
        setFileUrl(url)
      } else {
        setFileUrl(undefined)
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
    try {
      if (
        documentSource &&
        documentType &&
        issuer &&
        taxValue &&
        netValue &&
        file &&
        file instanceof File
      ) {
        const fileData = {
          name: file.name,
          type: file.type,
          size: file.size,
        }

        const signedURLResult = await getSignedURL(fileData)

        if (signedURLResult.failure !== undefined) {
          throw new Error(signedURLResult.failure)
        }

        const { signedURL, urlFile } = signedURLResult.success

        await fetch(signedURL, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file?.type,
          },
        })

        const updatedDocumentSource =
          documentSource === "Eletrônico"
            ? OrderOrigin.ELECTRONIC
            : OrderOrigin.DIGITALIZED

        const updatedDocumentType =
          documentType === "Nota fiscal de serviço"
            ? OrderType.SERVICE_NOTE
            : OrderType.SERVICE_CONTRACT

        setDocumentSource(updatedDocumentSource)
        setDocumentType(updatedDocumentType)

        const data = {
          origin: updatedDocumentSource as OrderOrigin,
          type: updatedDocumentType as OrderType,
          emitter: issuer,
          taxValue,
          netValue,
          fileUrl: urlFile,
          typeFile: file.type,
          userId: user,
        }

        await createDocument(data)
        const updatedDocuments = await getAllDocuments(user)
        setDocuments(updatedDocuments)
        clearStates()
      } else {
        toast.error("Preencha todos os campos corretamente")
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <DialogContent className="flex h-[610px] max-w-[450px] flex-col overflow-y-auto bg-white sm:max-w-[550px] md:max-w-[696px]">
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
            className="bg-Gray-light h-8 w-[57px] cursor-not-allowed rounded-full"
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
          <Label className="text-blue-lighter flex items-center gap-2">
            Origem do documento <CircleHelp size={14} color="gray" />
          </Label>

          <DataTableFacetedFilter
            title="Origem do Documento"
            options={originsDocument}
            setState={setDocumentSource}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-blue-lighter flex items-center gap-2">
            Tipo documental <CircleHelp size={14} color="gray" />
          </Label>

          <DataTableFacetedFilter
            title="Tipo Documental"
            options={typesDocument}
            setState={setDocumentType}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="border-Green flex h-[183px] items-center justify-center rounded border-2 border-dashed bg-green-50 p-4">
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

              <span className="text-blue-light mb-2 text-xs">
                Tamanho max.: 10MB
              </span>

              <input
                id="file-upload"
                type="file"
                accept=".pdf,.png,.jpg,.svg"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {file && file instanceof File && (
            <>
              <div className="relative mt-6 flex flex-col items-center gap-6 rounded border py-[18.5px] pl-9">
                {fileSize <= 10 ? (
                  <>
                    <FileUp color="#9CA3AF" />

                    <div className="w-[86%]">
                      <p className="text-blue-lighter text-sm">
                        Arquivo: {file.name}
                      </p>
                      <p className="text-blue-light mb-2 text-xs">
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

              <Button
                className="text-Green w-max cursor-pointer content-start text-sm opacity-50 shadow-none hover:opacity-100"
                onClick={() => {
                  setShowModalViewer(true)
                  setFileUrl(fileUrl)
                }}
              >
                Pré-visualizar
              </Button>
            </>
          )}
        </div>
      </div>

      <Separator className="bg-Gray mt-4" />

      <DialogFooter className="flex justify-between">
        <DialogClose asChild>
          <Button variant="outline" className="mt-3 h-10 sm:mt-0">
            Cancelar
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button
            onClick={handleSubmit}
            className={`bg-Green h-10 text-white ${file ? "opacity-100" : "opacity-50"}`}
            disabled={!file}
          >
            Criar documento
            <ArrowRight />
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}

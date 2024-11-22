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
import { CircleHelp, FileUp } from "lucide-react"
import { useState } from "react"
import { DataTableFacetedFilter } from "./tasks/components/data-table-faceted-filter"
import { originsDocument, typesDocument } from "./tasks/data/data"
import { useDocuments } from "../_context/document"
import { getAllDocuments } from "../_actions/get-all-documents"

export const CreateDocumentoModal = () => {
  const { setDocuments } = useDocuments()

  const [documentSource, setDocumentSource] = useState<string>("")
  const [documentType, setDocumentType] = useState<string>("")
  const [file, setFile] = useState<File | Blob>()
  const [issuer, setIssuer] = useState<string>("")
  const [taxValue, setTaxValue] = useState<number>(0)
  const [netValue, setNetValue] = useState<number>(0)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append("origin", documentSource)
    formData.append("type", documentType)
    formData.append("file", file!)
    formData.append("emitter", issuer)
    formData.append("taxValue", taxValue.toString())
    formData.append("netValue", netValue.toString())

    await fetch("/api/document", {
      method: "POST",
      body: formData,
    })

    const updatedDocuments = await getAllDocuments()
    setDocuments(updatedDocuments)
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
        {/* Número do Documento */}
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

        {/* Origem do Documento */}
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

        {/* Tipo de Documento */}
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

        {/* Upload do Arquivo */}
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
            <p className="mt-2 text-sm text-gray-600">Arquivo: {file.name}</p>
          )}
        </div>
      </div>

      <Separator className="mt-4 bg-[#E5E7EB]" />

      {/* Footer */}
      <DialogFooter className="flex justify-between">
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>

        <DialogClose asChild>
          <Button onClick={handleSubmit}>Criar documento</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}

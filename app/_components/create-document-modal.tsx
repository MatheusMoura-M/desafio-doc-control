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
import { createDocument } from "../_actions/create-document"

export const CreateDocumentoModal = () => {
  const [documentSource, setDocumentSource] = useState<string>("")
  const [documentType, setDocumentType] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [issuer, setIssuer] = useState<string>("")
  const [taxAmount, setTaxAmount] = useState<string>("")
  const [netAmount, setNetAmount] = useState<string>("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = async () => {
    if (
      documentSource &&
      documentType &&
      file &&
      issuer &&
      taxAmount &&
      netAmount
    ) {
      //   const data = {
      //     origin: documentSource,
      //     type: documentType,
      //     file: file,
      //     emitter: issuer,
      //     taxAmount,
      //     netAmount,
      //   }

      try {
        const formData = new FormData()
        formData.append("documentSource", documentSource)
        formData.append("documentType", documentType)
        formData.append("file", file)
        formData.append("issuer", issuer)
        formData.append("taxAmount", taxAmount)
        formData.append("netAmount", netAmount)

        const response = await fetch("/api/tasks", {
          method: "POST",
          body: formData,
        })

        console.log("resp", await response.json())
        // await createDocument(data)
      } catch (error) {
        console.error("EERRRORRR", error)
      }
    } else {
      alert("Por favor, preencha todos os campos.")
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
            value={taxAmount}
            placeholder="Valor em R$"
            className="col-span-3"
            onChange={(e) => setTaxAmount(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="name" className="text-right">
            Valor líquido
          </Label>
          <Input
            id="name"
            value={netAmount}
            placeholder="Valor em R$"
            className="col-span-3"
            onChange={(e) => setNetAmount(e.target.value)}
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

          {file && (
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

        <Button onClick={handleSubmit}>Criar documento</Button>
      </DialogFooter>
    </DialogContent>
  )
}

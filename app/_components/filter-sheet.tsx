import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/_components/ui/sheet"
import { Info } from "lucide-react"
import { SetStateAction, useState } from "react"
import { CalendarForm } from "./calendar-form"
import { TableProps } from "./tasks/components/data-table-toolbar"
import { Separator } from "./ui/separator"

interface FilterSheetProps {
  setDocumentName: React.Dispatch<SetStateAction<string>>
}

export const FilterSheet = <TData,>({
  table,
  setDocumentName,
}: FilterSheetProps & TableProps<TData>) => {
  const [documentType, setDocumentType] = useState("")
  const [issuer, setIssuer] = useState("")
  const [taxAmount, setTaxAmount] = useState("")
  const [netAmount, setNetAmount] = useState("")

  const handleDocumentTypeChange = (value: string) => {
    setDocumentType(value)
  }

  const handleIssuerChange = (value: string) => {
    setIssuer(value)
  }

  const handleTaxAmountChange = (value: string) => {
    setTaxAmount(value)
  }

  const handleNetAmountChange = (value: string) => {
    setNetAmount(value)
  }

  const clearStates = () => {
    setDocumentType("")
    setIssuer("")
    setTaxAmount("")
    setNetAmount("")
    setDocumentName("")
  }

  const onSubmit = () => {
    const data = {
      documentType: documentType,
      issuer: issuer,
      taxAmount: taxAmount,
      netAmount: netAmount,
    }

    table.getColumn("tipo_documental")?.setFilterValue(data.documentType)
    table.getColumn("emitente")?.setFilterValue(data.issuer)
    table.getColumn("valor_total_dos_tributos")?.setFilterValue(data.taxAmount)
    table.getColumn("valor_liquido")?.setFilterValue(data.netAmount)
  }

  return (
    <SheetContent className="overflow-y-auto bg-white sm:max-w-[390px]">
      <SheetHeader className="space-y-0">
        <SheetTitle>Filtrar documentos</SheetTitle>
        <SheetDescription>
          Indique os dados necessários para realizar a filtragem
        </SheetDescription>
      </SheetHeader>

      <Separator className="mt-4 bg-[#E5E7EB]" />

      <div className="flex flex-col gap-4 py-4">
        <div className="flex gap-4 rounded border p-4">
          <Info size={42} />

          <p className="text-sm">
            Selecione o tipo de documento necessário para, a partir dele,
            selecionar os tipos de índice para a filtragem.
          </p>
        </div>

        <div>
          <CalendarForm />
        </div>

        <Separator className="mt-4 bg-[#E5E7EB]" />

        <div>
          <Label htmlFor="name" className="text-right">
            Tipo de documento
          </Label>
          <Input
            id="name"
            value={documentType}
            placeholder="Nota fiscal de serviço"
            className="col-span-3"
            onChange={(e) => handleDocumentTypeChange(e.target.value)}
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
            onChange={(e) => handleIssuerChange(e.target.value)}
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
            onChange={(e) => handleTaxAmountChange(e.target.value)}
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
            onChange={(e) => handleNetAmountChange(e.target.value)}
          />
        </div>

        <Separator className="mt-4 bg-[#E5E7EB]" />
      </div>

      <SheetFooter>
        <Button
          type="submit"
          className="border"
          onClick={() => {
            table.resetColumnFilters()
            clearStates()
          }}
        >
          Limpar
        </Button>

        <SheetClose asChild>
          <Button
            type="submit"
            className="bg-[#05C151] text-white opacity-50"
            onClick={onSubmit}
          >
            Aplicar filtro
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}

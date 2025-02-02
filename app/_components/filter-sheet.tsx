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
import { CircleCheck, Info } from "lucide-react"
import { SetStateAction, useState } from "react"
import { CalendarForm } from "./calendar-form"
import { TableProps } from "./_tasks/components/data-table-toolbar"
import { Separator } from "./ui/separator"
import { toast } from "sonner"

interface FilterSheetProps {
  setDocumentName: React.Dispatch<SetStateAction<string>>
}

export const FilterSheet = <TData,>({
  table,
  setDocumentName,
}: FilterSheetProps & TableProps<TData>) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [documentType, setDocumentType] = useState("")
  const [issuer, setIssuer] = useState("")
  const [taxAmount, setTaxAmount] = useState("")
  const [netAmount, setNetAmount] = useState("")

  const isFormFilled = () => {
    return (
      documentType.trim() ||
      issuer.trim() ||
      taxAmount.trim() ||
      netAmount.trim() ||
      selectedDate
    )
  }

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
      date: selectedDate,
    }

    table.getColumn("createdAt")?.setFilterValue(data.date)
    table.getColumn("type")?.setFilterValue(data.documentType)
    table.getColumn("emitter")?.setFilterValue(data.issuer)
    table.getColumn("taxValue")?.setFilterValue(data.taxAmount)
    table.getColumn("netValue")?.setFilterValue(data.netAmount)

    toast("Filtro aplicado com sucesso!", {
      className: "bg-Blue text-white text-sm font-bold",
      icon: <CircleCheck color="white" size={16} />,
      duration: 2000,
    })
  }

  return (
    <SheetContent className="max-w-[390px] overflow-y-auto bg-white">
      <SheetHeader className="space-y-0">
        <SheetTitle className="text-start">Filtrar documentos</SheetTitle>
        <SheetDescription className="text-start">
          Indique os dados necessários para realizar a filtragem
        </SheetDescription>
      </SheetHeader>

      <Separator className="mt-4 bg-Gray" />

      <div className="flex flex-col gap-4 py-4">
        <div className="flex gap-4 rounded border p-4">
          <Info size={42} />

          <p className="text-sm">
            Selecione o tipo de documento necessário para, a partir dele,
            selecionar os tipos de índice para a filtragem.
          </p>
        </div>

        <div>
          <CalendarForm
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        <Separator className="mt-4 bg-Gray" />

        <div>
          <Label htmlFor="document_type" className="text-right">
            Tipo de documento
          </Label>
          <Input
            id="document_type"
            autoComplete="off"
            value={documentType}
            placeholder="Nota fiscal de serviço"
            className="col-span-3"
            onChange={(e) => handleDocumentTypeChange(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="emitter" className="text-right">
            Emitente
          </Label>
          <Input
            id="emitter"
            autoComplete="off"
            value={issuer}
            placeholder="Razão social do emitente"
            className="col-span-3"
            onChange={(e) => handleIssuerChange(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="tax_amout" className="text-right">
            Valor total dos tributos
          </Label>
          <Input
            id="tax_amout"
            autoComplete="off"
            value={taxAmount}
            placeholder="Valor em R$"
            className="col-span-3"
            onChange={(e) => handleTaxAmountChange(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="net_amout" className="text-right">
            Valor líquido
          </Label>
          <Input
            id="net_amout"
            autoComplete="off"
            value={netAmount}
            placeholder="Valor em R$"
            className="col-span-3"
            onChange={(e) => handleNetAmountChange(e.target.value)}
          />
        </div>

        <Separator className="mt-4 bg-Gray" />
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
            className={`bg-Blue text-white ${
              isFormFilled() ? "opacity-100" : "opacity-50"
            }`}
            disabled={!isFormFilled()}
            onClick={onSubmit}
          >
            Aplicar filtro
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}

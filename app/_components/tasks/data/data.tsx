import { FileCheck, FileText } from "lucide-react"

export const originsDocument = [
  {
    value: "digitalizado",
    label: "Digitalizado",
  },
  {
    value: "eletrônico",
    label: "Eletrônico",
  },
]

export const typesDocument = [
  {
    value: "nota fiscal de serviço",
    label: "Nota fiscal de serviço",
    icon: FileCheck,
  },
  {
    value: "contrato de prestação de serviço",
    label: "Contrato de prestação de serviço",
    icon: FileText,
  },
]

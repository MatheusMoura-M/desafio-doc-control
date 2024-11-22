import { FileCheck, FileText } from "lucide-react"

export const originsDocument = [
  {
    value: "DIGITALIZED",
    label: "Digitalizado",
  },
  {
    value: "ELECTRONIC",
    label: "Eletrônico",
  },
]

export const typesDocument = [
  {
    value: "SERVICE_NOTE",
    label: "Nota fiscal de serviço",
    icon: FileCheck,
  },
  {
    value: "SERVICE_CONTRACT",
    label: "Contrato de prestação de serviço",
    icon: FileText,
  },
]

"use client"

import { Filter, MoreVertical, Search, CircleHelp, Plus } from "lucide-react"
import { useState } from "react"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./_components/ui/select"

export default function Home() {
  const [origin, setOrigin] = useState("Digitalizado")
  const [documentType, setDocumentType] = useState("Nota fiscal de serviço")

  return (
    <>
      <Header />

      <main className="p-8 pr-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Documentos</h1>
            <p className="text-sm text-gray-500">
              Crie, gerencie e visualize os documentos
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-sm">
              <Input
                placeholder="Buscar documentos"
                className="w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>

            {/* Botão de filtro */}
            <button className="flex items-center rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-4 border-t pt-6">
          <div className="flex items-center gap-8">
            {/* Origem do documento */}
            <div className="flex flex-col">
              <div className="mb-1 flex items-center gap-2">
                <label htmlFor="origin" className="text-sm text-gray-700">
                  Origem do documento
                </label>
                <CircleHelp size={14} color="gray" />
              </div>

              <Select onValueChange={setOrigin}>
                <SelectTrigger className="w-[320px]">
                  <SelectValue placeholder="Selecione a origem" />
                </SelectTrigger>

                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem value="Digitalizado">Digitalizado</SelectItem>
                    <SelectItem value="Físico">Físico</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo documental */}
            <div className="flex flex-col">
              <div className="mb-1 flex items-center gap-2">
                <label htmlFor="documentType" className="text-sm text-gray-700">
                  Tipo documental
                </label>
                <CircleHelp size={14} color="gray" />
              </div>

              <Select onValueChange={setDocumentType}>
                <SelectTrigger className="w-[320px]">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>

                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem value="Nota fiscal de serviço">
                      Nota fiscal de serviço
                    </SelectItem>
                    <SelectItem value="Recibo">Recibo</SelectItem>
                    <SelectItem value="Contrato">Contrato</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-1 rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">
            <Plus />
            <button>Novo documento</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Nome do Documento</th>
                <th className="px-4 py-2 text-left">Emitente</th>
                <th className="px-4 py-2 text-right">
                  Valor Total dos Tributos
                </th>
                <th className="px-4 py-2 text-right">Valor Líquido</th>
                <th className="px-4 py-2 text-center">Data de Criação</th>
                <th className="px-4 py-2 text-center">Última Atualização</th>
                <th className="px-4 py-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">Nome do documento</td>
                  <td className="px-4 py-2">Emitente Exemplo</td>
                  <td className="px-4 py-2 text-right">R$20,00</td>
                  <td className="px-4 py-2 text-right">R$20,00</td>
                  <td className="px-4 py-2 text-center">12 de abril 2024</td>
                  <td className="px-4 py-2 text-center">12 de abril 2024</td>
                  <td className="px-4 py-2 text-center">
                    <MoreVertical className="inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

import { z } from "zod"

export const documentSchema = z.object({
  id: z.string(),
  nome_documento: z.string(),
  emitente: z.string(),
  valor_total_dos_tributos: z.number(),
  valor_liquido: z.number(),
  data_de_criacao: z.string(),
  ultima_atualizacao: z.string(),
  origem_do_documento: z.enum(["digitalizado", "eletrônico"]),
  tipo_documental: z.enum([
    "nota fiscal de serviço",
    "contrato de prestação de serviço",
  ]),
})

export type Document = z.infer<typeof documentSchema>

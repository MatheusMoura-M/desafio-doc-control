import { documentSchema } from "@/app/_components/tasks/data/schema"
import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "app/_components/tasks/data/tasks.json",
    )

    const data = await fs.readFile(filePath, "utf-8")
    const tasks = z.array(documentSchema).parse(JSON.parse(data))

    return new Response(JSON.stringify(tasks), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new Response(`Erro ao carregar dados: ${error}`, { status: 500 })
  }
}

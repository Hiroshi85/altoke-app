import { z } from "zod";

export const negocioSchema = z.object({
  nombre: z.string(),
  lugar: z.string(),
})

export type negocioSchemaType = z.infer<typeof negocioSchema>


export const registerSchema = z.object({
  negocio: negocioSchema,
  sector: z.string()
})

export type registerSchemaType = z.infer<typeof registerSchema>
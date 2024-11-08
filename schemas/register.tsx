import { z } from "zod";

export const negocioSchema = z.object({
  nombre: z.string(),
  lugar: z.string(),
})

export type negocioSchemaType = z.infer<typeof negocioSchema>

export const sectorSchema = z.object({
  nombre: z.string()
})

export type sectorSchemaType = z.infer<typeof sectorSchema>

export const registerSchema = z.object({
  negocio: negocioSchema,
  sector: sectorSchema
})

export type registerSchemaType = z.infer<typeof registerSchema>
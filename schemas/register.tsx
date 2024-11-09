import { z } from "zod";

export const negocioSchema = z.object({
  nombre: z.string(),
  lugar: z.string(),
  coordenadas: z.object({
    lat: z.number(),
    lng: z.number()
  }),
})

export type negocioSchemaType = z.infer<typeof negocioSchema>

export const sectorSchema = z.object({
  nombre: z.string()
})

export type sectorSchemaType = z.infer<typeof sectorSchema>

export const tipoSchema = z.object({
  nombre: z.string()
})

export type tipoSchemaType = z.infer<typeof tipoSchema>

export const registerSchema = z.object({
  negocio: negocioSchema,
  sector: sectorSchema,
  tipo: tipoSchema,
  ventas: z.coerce.number(),
})

export type registerSchemaType = z.infer<typeof registerSchema>
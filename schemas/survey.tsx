import { z } from 'zod';


export const SurveySchema = z.object({
  // Medición de productividad
  cumplimientoMetaVenta: z.number(),
  volumenVentaDiaria: z.number(),
  comparacionVenta: z.number(),
  capacidadGastoClientes: z.number(),
  satisfaccionVenta: z.number(),

  // Otras métricas
  categoriaProductoMasVendido: z.string(),
  factorExterno : z.string(),
  competencia: z.string(),
  fecha: z.coerce.date(),
})

export type SurveySchemaType = z.infer<typeof SurveySchema>;
import { z } from 'zod';


export const SurveySchema = z.object({
  // Medición de productividad
  cumplimientoMetaVenta: z.number().min(1, "Cumplimiento meta venta requerido"),
  volumenVentaDiaria: z.number().min(1, "Campo requerido"),
  comparacionVenta: z.number().min(1, "Campo requerido"),
  capacidadGastoClientes: z.number().min(1, "Campo requerido"),
  satisfaccionVenta: z.number().min(1, "Campo requerido"),

  // Otras métricas
  categoriaProductoMasVendido: z.string(),
  factorExterno : z.string(),
  ingresosCubrenGastos: z.string(),
  competencia: z.coerce.string(),
  fecha: z.date(),
})

export type SurveySchemaType = z.infer<typeof SurveySchema>;
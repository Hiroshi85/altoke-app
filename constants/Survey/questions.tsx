import { SurveyQuestion } from "@/types/survey";

export const DAILY_SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: "1",
    type: "radio",
    key: "cumplimientoMetaVenta",
    question: "¿Cómo fue el nivel de ventas de hoy?",
    options: [
      { label: ">90%", summary: "Excelente", value: 5 },
      { label: "60-90%", summary: "Bueno", value: 4 },
      { label: "30-60%", summary: "Medio", value: 3 },
      { label: "10-30%", summary: "Bajo", value: 2 },
      { label: "0-10%", summary: "Muy bajo", value: 1 },
    ],
  },
  {
    id: "2",
    type: "radio",
    key: "volumenVentaDiaria",
    question: "¿Cuántas ventas aproximadamente realizaste hoy?",
    options: [
      { label: ">100", summary: "Excepcional", value: 5 },
      { label: "51-100", summary: "Muy alto", value: 4 },
      { label: "21-50", summary: "Volumen alto", value: 3 },
      { label: "11-20", summary: "Volumen moderado", value: 2 },
      { label: "0-10", summary: "Bajo volumen", value: 1 },
    ],
  },
  {
    id: "3",
    type: "radio",
    key: "comparacionVenta",
    question: "¿Cómo se comparan tus ventas hoy con las de la semana pasada?",
    options: [
      { label: "Mucho mejor", summary: "Aumento significativo en ventas", value: 5 },
      { label: "Mejor", summary: "Aumento en ventas", value: 4 },
      { label: "Igual", summary: "Sin cambios", value: 3 },
      { label: "Peor", summary: "Disminución en ventas", value: 2 },
      { label: "Mucho peor", summary: "Disminución significativa en ventas", value: 1 },
    ],
  },
  {
    id: "4",
    type: "radio",
    key: "capacidadGastoClientes",
    question: "¿Cómo percibes la capacidad de gasto de tus clientes hoy?",
    options: [
      { label: "Muy alta", summary: "75 a < 100 %", value: 5 },
      { label: "Alta", summary: "50 a < 75 %", value: 4 },
      { label: "Media", summary: "25 a < 50 %", value: 3 },
      { label: "Baja", summary: "10 a < 25 %", value: 2 },
      { label: "Muy baja", summary: "0 a < 10 %", value: 1 },
    ],
  },
  {
    id: "5",
    type: "radio",
    key: "satisfaccionVenta",
    question: "¿Cuál es el gasto promedio de tus clientes?",
    options: [
      { label: "< S/10", summary: "Bajo gasto", value: 1 },
      { label: "> S/10 y < S/20", summary: "Gasto moderado bajo", value: 2 },
      { label: "> S/20 y < S/50", summary: "Gasto moderado alto", value: 3 },
      { label: "> S/50", summary: "Alto gasto", value: 4 },
    ],
  },
  {
    id: "6",
    type: "select",
    key: "categoriaProductoMasVendido",
    question: "¿Cuál fue el producto o servicio que más vendiste hoy?",
    options: [
      {
        label: "Calzado",
        value: "Calzado",
      },
    ],
  },
  // {
  //   id: "7",
  //   key: "precioPromedioMasVendido",
  //   question:
  //     "¿El precio promedio del producto que más vendiste está en el rango de...?",
  //   options: [
  //     { label: "Menos de S/10", summary: "Precio bajo", value: 1 },
  //     { label: "S/10-S/30", summary: "Precio moderado", value: 2 },
  //     { label: "S/30-S/50", summary: "Precio alto", value: 3 },
  //     { label: "Más de S/50", summary: "Precio muy alto", value: 4 },
  //   ],
  // },
  // {
  //   id: "8",
  //   key: "ingresosCubrenGastos",
  //   question: "¿Qué tan satisfecho estás con las ventas de hoy?",
  //   options: [
  //     { label: "Muy satisfecho", summary: "Excelente satisfacción", value: 5 },
  //     { label: "Satisfecho", summary: "Buena satisfacción", value: 4 },
  //     { label: "Neutro", summary: "Satisfacción neutral", value: 3 },
  //     { label: "Insatisfecho", summary: "Baja satisfacción", value: 2 },
  //     { label: "Muy insatisfecho", summary: "Mala satisfacción", value: 1 },
  //   ],
  // },
  {
    id: "9",
    key: "factorExterno",
    type: "select",
    question: "¿Algún factor específico impactó tus ventas hoy?",
    options: [
      { label: "Clima", value: "Clima" },
      { label: "Festividad", value: "Festividad" },
      {
        label: "Cambios en el tráfico de clientes",
        value: "Cambios en el tráfico de clientes",
      },
      {
        label: "Eventos locales",
        value: "Eventos locales",
      },
    ],
  },
  {
    id: "10",
    key: "competencia",
    type: "radio",
    question: "¿Has notado nuevas empresas o competencia en tu zona?",
    options: [
      { label: "Sí", value: 0 },
      { label: "No", value: 1 },
    ],
  },
];
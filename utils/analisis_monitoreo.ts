import { GeoPoint } from "@react-native-firebase/firestore";

export interface MonitoreoDiario {
    capacidadGastoClientes: number; // número
    categoriaProductoMasVendido: string; // cadena
    comparacionVenta: number; // número
    competencia: string; // cadena
    cumplimientoMetaVenta: number; // número
    emprendimientoId: string; // cadena
    factorExterno: string; // cadena
    fecha: Date; // marca de tiempo
    geo: GeoPoint; // punto geográfico (latitud y longitud)
    metaVenta: number; // número
    satisfaccionVenta: number; // número
    volumenVentaDiaria: number; // número
  }

// Función para calcular la moda
function calcularModa<T>(arr: T[]): T | null {
    const frecuencia: Record<string, number> = {};
    arr.forEach((item) => {
      const key = JSON.stringify(item);
      frecuencia[key] = (frecuencia[key] || 0) + 1;
    });
  
    const maxFrecuencia = Math.max(...Object.values(frecuencia));
    const modas = Object.keys(frecuencia).filter(key => frecuencia[key] === maxFrecuencia);
  
    return modas.length === 1 ? JSON.parse(modas[0]) : null; // Devuelve la moda si es única, si hay empate devuelve null
  }
  
  // Función para calcular el promedio
  function calcularPromedio(arr: number[]): number {
    const total = arr.reduce((acc, val) => acc + val, 0);
    return arr.length ? total / arr.length : 0;
  }

  export function obtenerResultados(data: MonitoreoDiario[]): string {
    // Cálculos según las métricas requeridas
    const capacidadGastoClientesModa = calcularModa(data.map(d => d.capacidadGastoClientes));
    const categoriaProductoMasVendidoModa = calcularModa(data.map(d => d.categoriaProductoMasVendido));
    const comparacionVentaModa = calcularModa(data.map(d => d.comparacionVenta));
    const competenciaModa = calcularModa(data.map(d => d.competencia));
    const cumplimientoMetaVentaModa = calcularModa(data.map(d => d.cumplimientoMetaVenta));
    const factorExternoModa = calcularModa(data.map(d => d.factorExterno));
    const metaVentaPromedio = calcularPromedio(data.map(d => d.metaVenta));
    const satisfaccionVentaModa = calcularModa(data.map(d => d.satisfaccionVenta));
    const volumenVentaDiariaModa = calcularModa(data.map(d => d.volumenVentaDiaria));
    
    // Concatenar los resultados en una sola cadena separada por comas
    return [
      `Capacidad Gasto Clientes (Moda): ${capacidadGastoClientesModa}`,
      `Categoría Producto Más Vendido (Moda): ${categoriaProductoMasVendidoModa}`,
      `Comparación Venta (Moda): ${comparacionVentaModa}`,
      `Competencia (Moda): ${competenciaModa}`,
      `Cumplimiento Meta Venta (Moda): ${cumplimientoMetaVentaModa}`,
      `Factor Externo (Moda): ${factorExternoModa}`,
      `Meta Venta (Promedio): ${metaVentaPromedio}`,
      `Satisfacción Venta (Moda): ${satisfaccionVentaModa}`,
      `Volumen Venta Diaria (Moda): ${volumenVentaDiariaModa}`
    ].join(", ");
  }

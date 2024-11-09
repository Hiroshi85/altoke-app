import { GeoPoint } from "@react-native-firebase/firestore";

export type MonitoreoDiario = {
    capacidadGastoClientes: number;
    categoriaProductoMasVendido: string;
    comparacionVenta: number;
    competencia: "SI" | "NO";
    cumplimientoMetaVenta: number;
    emprendimientoId: string;
    factorExterno: string;
    fecha: Date;
    geo: GeoPoint;
    "meta-venta": number;
    satisfaccionVenta: number;
    volumenVentaDiaria: number;
}
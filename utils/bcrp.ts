import { externalApis } from "@/settings/extenal";

export async function getInflacionData() {
    const response = await fetch(externalApis.inflacionApiUrl);
    const data = await response.json();
    const valoresPeriodo = data.periods.map((period: any) => period.values[0]);
    const evolucion = calcularVariaciones(valoresPeriodo);
    return evolucion.toString();
}

export async function getCambioNominalVentaBancarioData() {
    const response = await fetch(externalApis.cambioNominalVentaBancarioApiUrl);
    const data = await response.json();
    const valoresPeriodo = data.periods.map((period: any) => Number(period.values[0]));
    const evolucion = calcularVariaciones(valoresPeriodo);
    return evolucion.toString();
}


function calcularVariaciones(arr: number[]): number[] {
    const variaciones: number[] = [];

    for (let i = 1; i < arr.length; i++) {
        variaciones.push(arr[i] - arr[i - 1]); // Resta el elemento actual con el anterior
    }

    return variaciones;
}
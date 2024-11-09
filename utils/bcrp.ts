import { externalApis } from "@/settings/extenal";

export async function getInflacionData() {
    const response = await fetch(externalApis.inflacionApiUrl);
    const data = await response.json();
    const evolucion = data.periods.map((period: any) => period.values[0]);
    console.log(getInflacionData());
    return evolucion;
}
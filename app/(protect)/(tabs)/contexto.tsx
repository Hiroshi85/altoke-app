import { useAuth } from "@/providers/auth";
import { quitarEstiloMarkdown, obtenerContextoDelModelo } from "@/utils/gemini";
import { getQueryInsideRadius } from "@/utils/geoquery";
import { doc, query, collection, where, getDocs, FirebaseFirestoreTypes, GeoPoint } from "@react-native-firebase/firestore";
import { Tabs } from "expo-router"
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text } from "react-native-paper"
import firestore from '@react-native-firebase/firestore';
import { getLugaresCerca } from "@/utils/places";
import { getCambioNominalVentaBancarioData, getInflacionData } from "@/utils/bcrp";
import { MonitoreoDiario, obtenerResultados } from "@/utils/analisis_monitoreo";




export default function Contexto() {
    const { signOut, authData } = useAuth();
    const [contexto, setContexto] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function getContexto() {
            const monitoreosCercanos = getQueryInsideRadius("monitoreo-diario", "geo", authData?.geo?.longitude!, authData?.geo?.latitude!);
            const monitoreosCercanosMes = await monitoreosCercanos.where("fecha", ">", new Date(new Date().setDate(new Date().getDate() - 30))).get();
            const monitoreosContexto = monitoreosCercanosMes.docs.map(doc => doc.data() as MonitoreoDiario);
            const lugaresInteres = await getLugaresCerca(authData?.geo!, ['corporate_office', 'hospital', 'school', 'university', 'casino', 'government_office']);
            const competenciaCerca = await getLugaresCerca(authData?.geo!, ['grocery_store', 'market']);
            const evolucionInflacion = await getInflacionData();
            const tipoCambio = await getCambioNominalVentaBancarioData();

            console.log("interes", lugaresInteres);
            console.log("comp", competenciaCerca);
            console.log("contexto", monitoreosContexto);

            const monitoreoResumido = obtenerResultados(monitoreosContexto);
            const lugaresInteresResumido = lugaresInteres.map(lugar => lugar.displayName.text);
            const competenciaCercaResumido = competenciaCerca.map(lugar => lugar.displayName.text);
            const evolucionInflacionResumido = evolucionInflacion.toString();
            const tipoCambioResumido = tipoCambio.toString();

            const contextoAnalizado = await obtenerContextoDelModelo(monitoreoResumido, lugaresInteresResumido, 
                competenciaCercaResumido, evolucionInflacionResumido, tipoCambioResumido);
                
            const contextoLimpio = quitarEstiloMarkdown(contextoAnalizado);
            console.log(contextoLimpio);
            setContexto(contextoLimpio);
        }

        if (!contexto) getContexto();
    }, []);

    return (
        <>
            <Tabs.Screen
                options={{
                    title: "Contexto",
                }}
            />
            <ScrollView>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 50
                }}>
                    <Text>{contexto}</Text>
                </View>
            </ScrollView>

        </>

    );
}
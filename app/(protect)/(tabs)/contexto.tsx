import { useAuth } from "@/providers/auth";
import { quitarEstiloMarkdown, obtenerContextoDelModelo } from "@/utils/gemini";
import { Tabs } from "expo-router"
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context";

export default function Contexto() {
    const { signOut } = useAuth();
    const [contexto, setContexto] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function getContexto() {
            const contextoAnalizado = await obtenerContextoDelModelo();
            setContexto(quitarEstiloMarkdown(contextoAnalizado));
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
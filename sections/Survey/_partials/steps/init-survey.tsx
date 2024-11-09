import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSurvey } from "../../context";

export default function InitSurvey() {
    const { setStep } = useSurvey();
    return (
        <View style={{
            height: '100%',
            justifyContent: 'center',
            paddingHorizontal: 20,
            gap: 40
        }}>
            <Text variant='headlineLarge' style={{ fontWeight: "bold" }}>Cuéntanos un poco de tu negocio</Text>
            <Button
                onPress={() => setStep("questions")}
            >
                Continuar
            </Button>
        </View>
    );
}
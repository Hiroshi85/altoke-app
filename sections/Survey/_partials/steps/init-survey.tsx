import { View } from "react-native";
import { Text } from "react-native-paper";

export default function InitSurvey() {
    return (
        <View style={{
            height: '100%',
            justifyContent: 'center',
            paddingHorizontal: 20,
            gap: 40
        }}>
            <Text variant='headlineLarge' style={{ fontWeight: "bold" }}>Cuéntanos un poco de tu negocio</Text>
            Siguiente
        </View>
    );
}
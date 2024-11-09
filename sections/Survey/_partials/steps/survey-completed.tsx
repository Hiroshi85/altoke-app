import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function SurveyCompleted() {
  // Final screen for survey completiomn
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        paddingHorizontal: 20,
        gap: 40,
      }}
    >
      <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
        Gracias por completar la encuesta
      </Text>
      <Text>Resultados de productividad</Text>
      <Button>Ir a inicio</Button>
    </View>
  );
}

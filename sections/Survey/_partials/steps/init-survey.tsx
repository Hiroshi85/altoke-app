import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSurvey } from "../../context";

export default function InitSurvey() {
  const { setStep } = useSurvey();
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
        ¡Evalúa tu día y haz crecer tu negocio!
      </Text>
      <Text variant="bodyMedium">
        Contesta estas breves preguntas sobre tu jornada en el negocio para
        recibir recomendaciones personalizadas y tener un seguimiento de tu
        productividad.
      </Text>
      <Button onPress={() => setStep("questions")}>
        ¡Vamos a crecer juntos!
      </Button>
    </View>
  );
}

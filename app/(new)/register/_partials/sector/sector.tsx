import { View } from "react-native";
import { Text } from "react-native-paper";

export function SectorStep() {
  return (
    <View style={{
      // flex: 1,
      height: '100%',
      justifyContent: 'center',
      paddingHorizontal: 20,
      gap: 40
    }}>
      <Text variant='headlineLarge' style={{ fontWeight: "bold" }}>¿Cual es tu sector?</Text>
      <FormSector />
    </View>
  );
}

function FormSector() {
  return (
    <View style={{
      gap: 20
    }}>
      <Text>Formulario de sector</Text>
    </View>
  )
}
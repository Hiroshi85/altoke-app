import { View } from "react-native";
import { Text } from "react-native-paper";

export interface ISectorItemProps {
  name: string;
  description: string;
  icon: string;
  onPress: () => void;
}

export function SectorItem({
  sector
}: {
  sector: ISectorItemProps
}) {


  return <View>
    <Text>{sector.name}</Text>
    <Text>{sector.description}</Text>
    <Text>{sector.icon}</Text>
  </View>
}
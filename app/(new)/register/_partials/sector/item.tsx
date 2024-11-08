import { Button, View } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";

export interface ISectorItemProps {
  key: string;
  name: string;
  description: string;
  icon: string;
}
export function SectorItem({
  sector,
  active = false,
  onPress,
}: {
  sector: ISectorItemProps
  active?: boolean

  onPress?: () => void
}) {
  const { colors } = useTheme();

  return <View style={{
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: active ? colors.background : "white",
  }}>
    <TouchableRipple onPress={onPress}
      style={{
        padding: 10
      }}
    >
      <View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5
          }}>
            <Text>{sector.icon}</Text>
            <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>{sector.name}</Text>
          </View>
          <Text>{active ? "✅" : ""}</Text>
        </View>
        <Text variant="bodyMedium">{sector.description}</Text>
      </View>
    </TouchableRipple>
  </View>
}
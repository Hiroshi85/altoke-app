import { APP_NAME } from "@/constants/App";
import { useAuth } from "@/providers/auth";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function HomeScreen() {
  const {signOut} = useAuth();

  return (
    <>
      <Tabs.Screen 
        options={{
          title: "Apoyo",
        }}
      />
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Button mode="contained" 
          onPress={() => signOut()} 
        >
          Cerrar Sesión
        </Button>
      </View>
    </>
  )
}
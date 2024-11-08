import { Pressable, View, Image, StatusBar, ToastAndroid } from "react-native";
import { useState } from "react";
import { Href, router } from "expo-router";
import { Button, Snackbar, Text } from "react-native-paper";
import { APP_NAME } from "@/constants/App";
import { useAuth } from "@/providers/auth";
import { UserData } from "@/types/auth";

export default function SignIn() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    userInfo: null as UserData | null,
    error: null as any | null,
  });

  async function _signIn() {
    setLoading(true);
    const { redirect } = await signIn();

    if (redirect) {
      router.navigate(redirect);
    }

    setLoading(false);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        position: "relative",
      }}
    >
      <View>
        <Text
          variant="headlineLarge"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
         {APP_NAME} 
        </Text>

        <Text
          variant="bodyMedium"
          style={{
            textAlign: "center",
            marginVertical: 5,
            color: "gray",
          }}
        >
          Mejora tu negocio con ayuda de la Inteligencia Artificial
        </Text>

        <View style={{
          marginTop: 20,
        }}>
          <Button
            mode="outlined"
            textColor="black"
            disabled={loading}
            onPress={_signIn}
          >
            Comienza ahora
          </Button>
        </View>
      </View>
    </View>
  );
}
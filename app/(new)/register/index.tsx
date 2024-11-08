import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RegisterProvider, useRegister } from "./_partials/context";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/providers/auth";

export default function Page() {
    return <RegisterProvider>
        <Register />
    </RegisterProvider>
}

function Register() {
    const { step } = useRegister();
    const { signOut } = useAuth();


    return <>
        <SafeAreaView style={{
            position: "relative"
        }}>
            <View style={{
                position: "absolute",
                top: 50,
                right: 20,
            }}>
                <Button onPress={
                    () => signOut()
                }>
                    Salir
                </Button>
                {/* <Text>Step: {step.key}</Text> */}
            </View>
            <step.component />
        </SafeAreaView>
    </>
}
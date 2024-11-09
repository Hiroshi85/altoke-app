import { Pressable, View, Image, StatusBar, ToastAndroid } from "react-native";
import { useState } from "react";
import { Href, router } from "expo-router";
import { Button, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { APP_NAME } from "@/constants/App";
import { useAuth } from "@/providers/auth";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const login = z.object({
  telefono: z.string(),
  password: z.string(),
})


export default function SignIn() {
  const { signIn } = useAuth();

  async function _signIn(data: z.infer<typeof login>) {
    const { redirect } = await signIn(data.telefono, data.password);

    if (redirect) {
      router.navigate(redirect);
    }
  }

  const { colors } = useTheme();

  const form = useForm<z.infer<typeof login>>({
    resolver: zodResolver(login),
    defaultValues: {
      // id: "YxbgkWoAT8eSHwKP1oX0",
      telefono: "987654321",
      password: ""
    },
  });

  return (
    <Form {...form}>
      
      <View
        style={{
          // flex: 1,
          // marginTop: 400,
          // height: "100%",
          justifyContent: "center",
          paddingHorizontal: 40,
          position: "relative",
          backgroundColor: colors.background,
        }}
      >
        <View style={{
          // marginTop: 500,
          height: "100%",
          justifyContent: "center",
        }}>
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
            gap: 20
          }}>
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <TextInput
                      mode="outlined"
                      style={{
                        backgroundColor: "white",
                      }}
                      onChange={(e) =>
                        field.onChange(
                          e.nativeEvent.text
                        )
                      }
                      value={String(field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <TextInput
                      mode="outlined"
                      style={{
                        backgroundColor: "white",
                      }}
                      secureTextEntry={true}
                      onChange={(e) =>
                        field.onChange(
                          e.nativeEvent.text
                        )
                      }
                      value={String(field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              mode="contained"
              disabled={form.formState.isSubmitting}
              onPress={form.handleSubmit(_signIn)}
            >
              Comienza ahora
            </Button>
          </View>
        </View>
      </View>
    </Form>
  );
}
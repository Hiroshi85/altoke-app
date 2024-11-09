import { View } from "react-native";
import { Button, Text, TouchableRipple, useTheme } from "react-native-paper";
import { useRegister } from "./context";
import { AntDesign } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { tipoSchema, tipoSchemaType } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/forms";

export default function TipoStep() {
  const { setStep } = useRegister();
  const { colors } = useTheme();
  return (
    <View style={{
      height: '100%',
      justifyContent: 'center',
      paddingHorizontal: 20,
      gap: 20
    }}>
      <Button style={{
        alignSelf: 'flex-start',
        alignItems: 'center',
        gap: 5
      }}
        onPress={
          () => { setStep("sector") }
        }
      >
        <AntDesign name="left" size={10} color={colors.primary} />
        Atras
      </Button>
      <Text variant='headlineLarge' style={{ fontWeight: "bold", paddingBottom: 20 }}>
        Tu negocio es ...
      </Text>
      <TipoForm />
    </View>
  );
}

const tipos = [
  {
    nombre: "Nuevo",
    descripcion: "Negocio que recien va a empezar"
  },
  {
    nombre: "Establecido",
    descripcion: "Negocio que lleva menos de 1 año"
  }
]

function TipoForm() {
  const { colors } = useTheme();
  const {setStep, form: fatherForm} = useRegister();
  const form = useForm<tipoSchemaType>({
    resolver: zodResolver(tipoSchema),
    defaultValues: {
      nombre: ""
    }
  })


  function handleSubmit(data: tipoSchemaType) {
    fatherForm.setValue("tipo", data)
    setStep("finish") 
  }

  return (
    <Form {...form}>
      <View style={{
        gap: 20
      }}>
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <View style={{
                  flexDirection: "row",
                  gap: 10,
                }}>
                  {
                    tipos.map((tipo, index) => {
                      const active = tipo.nombre === field.value
                      return <View key={tipo.nombre} style={{
                        flex: 1,
                        borderColor: active ? colors.primary : 'gray',
                        borderWidth: 1,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: active ? colors.background : "white",
                      }}>
                        <TouchableRipple key={index}
                          style={{
                          }}
                          onPress={() => field.onChange(tipo.nombre)}>
                          <View style={{
                            padding: 10
                          }}>
                            <Text variant="bodyLarge" style={{ fontWeight: "bold",
                              color: active ? colors.primary : "black"

                             }}>
                              {tipo.nombre}
                            </Text>
                            <Text variant="bodyMedium" >
                              {tipo.descripcion}
                            </Text>
                          </View>
                        </TouchableRipple>

                      </View>
                    })
                  }

                </View>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onPress={form.handleSubmit(handleSubmit)} mode="outlined">Siguiente</Button>
      </View>
    </Form>
  )


}
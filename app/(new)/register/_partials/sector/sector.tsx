import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { ISectorItemProps, SectorItem } from "./item";
import { useForm } from "react-hook-form";
import { sectorSchema, sectorSchemaType } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/forms";
import { useRegister } from "../context";
import { AntDesign } from "@expo/vector-icons";

export function SectorStep() {
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
          () => { setStep("init") }
        }
      >
        <AntDesign name="left" size={10} color={colors.primary} />
        Atras
      </Button>
      <Text variant='headlineLarge' style={{ fontWeight: "bold", paddingBottom: 20 }}>¿Cual es tu sector?</Text>
      <FormSector />
    </View>
  );
}


const sectores: ISectorItemProps[] = [
  {
    key: "comida",
    name: "Comida",
    description: "Restaurantes, comida rápida, etc",
    icon: "🍔",
  },
  {
    key: "aberrotes",
    name: "Abarrotes",
    description: "Quioscos, tiendas de barrio, etc",
    icon: "🍞",
  },
  {
    key: "servicios",
    name: "Servicios",
    description: "Peluquerías, talleres, etc",
    icon: "🔧",
  }
]

function FormSector() {

  const form = useForm<sectorSchemaType>({
    resolver: zodResolver(sectorSchema),
    defaultValues: {
      nombre: ''
    }
  })

  function handleSubmit() {
    console.log(form.getValues())
  }

  return (
    <Form {...form}>
      <View style={{
        gap: 20,
      }}>
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <View style={{
                  gap: 20,
                }}>
                  {
                    sectores.map((sector) => (
                      <SectorItem key={sector.key} sector={sector} onPress={() => {
                        field.onChange(sector.key)
                      }}
                        active={sector.key === field.value}
                      />
                    ))
                  }
                </View>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onPress={() => handleSubmit()} mode='outlined'>
          Siguiente
        </Button>
      </View>
    </Form>

  )
}
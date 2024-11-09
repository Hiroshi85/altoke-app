import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/forms";
import { registerSchema, registerSchemaType } from "@/schemas/register";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { TextInput,Text, Button } from "react-native-paper";
import { useRegister } from "./context";

export default function MetaStep() {
  return (
    <View style={{
      height: '100%',
      justifyContent: 'center',
      paddingHorizontal: 20,
      gap: 40
    }}>
      <Text variant='headlineLarge' style={{ fontWeight: "bold" }}>
        ¿Cual es tu meta de ventas diarías? (S/.)
      </Text>
      <MetaForm />
    </View>
  );
}

function MetaForm() {
  const { form, handleSubmit} = useRegister();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="ventas"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <TextInput
                placeholder='1000'
                mode="outlined"
                keyboardType="numeric"
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
    <Button mode="contained" onPress={form.handleSubmit(handleSubmit)} disabled={form.formState.isSubmitting}>
      Enviar
    </Button>

    </Form>
  );
}
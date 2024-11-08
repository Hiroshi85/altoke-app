import { negocioSchema, negocioSchemaType } from '@/schemas/register';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/forms';

export default function InitRegister() {
    return (
            <View style={{
                // flex: 1,
                height: '100%',
                justifyContent: 'center',
                paddingHorizontal: 20,
                gap: 40
            }}>
                <Text variant='headlineLarge' style={{ fontWeight: "bold" }}>Cuéntanos un poco de tu negocio</Text>
                <FormNegocio />
            </View>
    );
}

function FormNegocio() {
    const form = useForm<negocioSchemaType>({
        resolver: zodResolver(negocioSchema),
        defaultValues: {
            nombre: "",
            lugar: ""
        }
    })

    function handleSubmit() {
        console.log("submit")
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
                            <FormLabel>¿Como se llama tu negocio?</FormLabel>
                            <FormControl>
                                <TextInput
                                    placeholder='Nombre del negocio'
                                    mode="outlined"
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
                    name="lugar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>¿Dónde está ubicado?</FormLabel>
                            <FormControl>
                                <TextInput
                                    placeholder='Ingresa tu ubicación'
                                    mode="outlined"
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
                <Button onPress={() => handleSubmit()} mode='outlined'>
                    Siguiente
                </Button>
            </View>


        </Form>
    )

}
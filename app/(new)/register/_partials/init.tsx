import { negocioSchema, negocioSchemaType } from '@/schemas/register';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/forms';
import { useRegister } from './context';
import { useEffect } from 'react';

export default function InitRegister() {
    
    return (
            <View style={{
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
    const {form: fatherForm, setStep} = useRegister()

    const form = useForm<negocioSchemaType>({
        resolver: zodResolver(negocioSchema),
        defaultValues: fatherForm.getValues('negocio') || {
            nombre: "",
            lugar: ""
        }
    })

    function handleSubmit(data: negocioSchemaType) {
        fatherForm.setValue('negocio', form.getValues())
        setStep('sector')
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
                <Button onPress={form.handleSubmit(handleSubmit)} mode='outlined'>
                    Siguiente
                </Button>
            </View>


        </Form>
    )

}
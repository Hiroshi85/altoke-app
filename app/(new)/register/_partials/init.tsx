import { negocioSchema, negocioSchemaType } from '@/schemas/register';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Button, List, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/forms';
import { useRegister } from './context';
import { useEffect, useState } from 'react';


type Suggestion = {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  };

const GOOGLE_PLACES_API_KEY = 'AIzaSyBst37YpS00brfg_9-MSaGLIqtMFHq8RvA';

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
    const { form: fatherForm, setStep } = useRegister()
    const [suggestions, setSuggestions] = useState([] as Suggestion[]);

    const form = useForm<negocioSchemaType>({
        resolver: zodResolver(negocioSchema),
        defaultValues: fatherForm.getValues('negocio') || {
            nombre: "",
            lugar: "",
            coordenadas: {
                lat: 0,
                lng: 0
            }
        }
    })

    const fetchSuggestions = async (input: string) => {
        if (input.length > 2) {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_PLACES_API_KEY}&language=es&components=country:pe`
          );
          const data = await response.json();
          setSuggestions(data.predictions);
        } else {
          setSuggestions([]);
        }
    };

    const fetchGeolocation = async (address: string) => {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_PLACES_API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          console.log(location)
          form.setValue('coordenadas', location);
        //   setGeoPosition(location);
          console.log('Geoposición obtenida:', location);
        } else {
          console.log('No se pudo obtener la geolocalización');
        }
    };

    function handleSubmit(data: negocioSchemaType) {
        fatherForm.setValue('negocio', form.getValues())
        console.log(fatherForm.getValues())
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

                <Controller
                    control={form.control}
                    name="lugar"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <View>
                            <TextInput
                                label="Ubicación"
                                mode="outlined"
                                value={value}
                                onChangeText={(text) => {
                                    onChange(text);
                                    fetchSuggestions(text); // Llama a la función para buscar sugerencias
                                }}
                                // style={styles.textInput}
                                error={!!error}
                            />
                            {/* {error && <Text style={styles.errorText}>Campo obligatorio</Text>} */}

                            {/* Lista de sugerencias */}
                            <FlatList
                                data={suggestions}
                                keyExtractor={(item) => item.place_id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity 
                                        onPress={() => {
                                            onChange(item.description);
                                            form.setValue("lugar", item.description); // Actualiza el valor del campo
                                            setSuggestions([]); // Cierra las sugerencias
                                            fetchGeolocation(item.description); 
                                        }}
                                    >
                                        <List.Item
                                            title={item.structured_formatting.main_text}
                                            description={item.structured_formatting.secondary_text}
                                            left={(props) => <List.Icon {...props} icon="map-marker" />}
                                        />
                                    </TouchableOpacity>
                                )}
                                // style={styles.suggestionsList}
                            />
                        </View>
                    )}
                    rules={{
                        required: true, // Reglas de validación
                    }}
                />
                {/* <View style={{width:0,height:0}}> */}
                    <TextInput {...form.register('coordenadas')}/>
                {/* </View> */}
                

                <Button onPress={form.handleSubmit(handleSubmit)} mode='outlined'>
                    Siguiente
                </Button>
            </View>


        </Form>
    )

}
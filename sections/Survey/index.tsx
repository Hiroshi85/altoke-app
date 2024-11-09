import { ThemedText } from "@/components/ThemedText";
import { Fragment, useState } from "react";
import {
  Button,
  List,
  ProgressBar,
  RadioButton,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DAILY_SURVEY_QUESTIONS } from "@/constants/Survey/questions";
import { useSurvey } from "./context";
import { Controller, useForm } from "react-hook-form";
import { SurveySchema, SurveySchemaType } from "@/schemas/survey";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/forms";

export const getRadioButtonColor = (value: number) => {
  switch (value) {
    case 1:
      return "#ff4c4c"; // Rojo claro
    case 2:
      return "#ff8080"; // Rojo suave
    case 3:
      return "#E6AD09"; // Rojo oscuro
    case 4:
      return "#77C58C"; // Verde suave
    case 5:
      return "#0C8F3D"; // Verde claro
    default:
      return "#000";
  }
};

export default function Survey() {
  const [quizProgrees, setQuizProgress] = useState(0); // calcular en base a item seleccionado
  const [page, setPage] = useState(0);
  const totalQuestions = DAILY_SURVEY_QUESTIONS.length;
  const totalPages = Math.ceil(totalQuestions / 2);

  const handleNext = () => {
    if (page === totalPages - 1) {
      return;
    }
    // setQuizProgress(quizProgrees + 2);
    setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page === 0) {
      return;
    }
    // setQuizProgress(quizProgrees - 2);
    setPage(page - 1);
  };

  const { form: surveyForm, setStep } = useSurvey();

  const form = useForm<SurveySchemaType>({
    resolver: zodResolver(SurveySchema),
    defaultValues: {
      cumplimientoMetaVenta: undefined,
      volumenVentaDiaria: undefined,
      comparacionVenta: undefined,
      capacidadGastoClientes: undefined,
      satisfaccionVenta: undefined,
      categoriaProductoMasVendido: "",
      factorExterno: undefined,
      ingresosCubrenGastos: undefined,
      fecha: new Date(),
    },
  });

  function handleSubmit(data: SurveySchemaType) {
    console.log(data);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Monitoreo diario</ThemedText>
        <ProgressBar progress={12} />
      </View>
      <ScrollView style={styles.content}>
        <Form {...form}>
          {DAILY_SURVEY_QUESTIONS.slice(page * 2, page * 2 + 2).map(
            (question) => (
              <View key={question.id}>
                <Text>{question.question}</Text>
                {question.type == "radio" ? (
                  question.options.map((option) => (
                    <View key={option.label} style={styles.radioInput}>
                      <FormField
                        control={form.control}
                        name={question.key as keyof SurveySchemaType}
                        render={({ field }) => (
                          <FormItem style={styles.radioInput}>
                            <RadioButton.Android
                              color={getRadioButtonColor(
                                option.value as number
                              )}
                              value={option.value.toString()}
                              status={
                                field.value === option.value
                                  ? "checked"
                                  : "unchecked"
                              }
                              onPress={() => field.onChange(option.value)}
                            />
                            <View style={styles.radioLabel}>
                              <Text>{option.label}</Text>
                              <Text>{option.summary}</Text>
                            </View>
                          </FormItem>
                        )}
                      />
                    </View>
                  ))
                ) : question.type === "select" ? (
                  <Controller
                    control={form.control}
                    name={question.key as keyof SurveySchemaType}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <View>
                        <TextInput
                          // label={question.question}
                          mode="outlined"
                          value={value as string}
                          onChangeText={(text) => {
                            onChange(text);
                            // fetchSuggestions(text); // solo filtrar options de la lista de sugerencias
                          }}
                          error={!!error}
                        />

                        {/* Lista de sugerencias */}
                        <FlatList
                          data={question.options}
                          keyExtractor={(item) => item.value.toString()}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              onPress={() => {
                                onChange(item.value.toString());
                                form.setValue(
                                  question.key as keyof SurveySchemaType,
                                  item.value.toString()
                                );
                                // setSuggestions([]); // Cierra las sugerencias
                                // fetchGeolocation(item.description);
                              }}
                            >
                              <List.Item
                                title={item.label}
                                description={item.summary}
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
                ) : question.type === "text" ? (
                  <FormField
                    control={form.control}
                    name={question.key as keyof SurveySchemaType}
                    render={({ field }) => (
                      <FormItem>
                        <TextInput
                          placeholder={"Seleccione una opción"}
                          mode="outlined"
                          value={field.value.toString()}
                          onChangeText={(text) => {
                            field.onChange(text);
                          }}
                        />
                      </FormItem>
                    )}
                  />
                ) : (
                  <Fragment></Fragment>
                )}
              </View>
            )
          )}
        </Form>
      </ScrollView>
      <View style={styles.footer}>
        <Button onPress={handlePrevious} disabled={page === 0}>
          Anterior
        </Button>
        <Button
          onPress={
            quizProgrees === totalQuestions - 1
              ? form.handleSubmit(handleSubmit)
              : handleNext
          }
          disabled={page === totalPages - 1}
        >
          {page === totalPages - 1 ? "Finalizar encuesta" : "Siguiente"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    overflow: "visible",
    height: "60%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  radioInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  radioLabel: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 0,
  },
});

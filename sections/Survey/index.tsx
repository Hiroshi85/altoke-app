import { ThemedText } from "@/components/ThemedText";
import { Fragment, useState } from "react";
import {
  Appbar,
  Button,
  List,
  ProgressBar,
  RadioButton,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { DAILY_SURVEY_QUESTIONS } from "@/constants/Survey/questions";
import { useSurvey } from "./context";
import { Controller } from "react-hook-form";
import { SurveySchemaType } from "@/schemas/survey";
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
  const [page, setPage] = useState(0);
  const totalQuestions = DAILY_SURVEY_QUESTIONS.length;
  const totalPages = Math.ceil(totalQuestions / 2);

  const handleNext = () => {
    if (page === totalPages - 1) {
      form.handleSubmit(handleSubmit)();
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

  const { form, setStep } = useSurvey();

  const watchFields = form.watch();
  const answeredQuestions = Object.values(watchFields).filter(value => value !== undefined && value !== "").length;
  const progress = (answeredQuestions - 1) / totalQuestions; //restar fecha

  function handleSubmit(data: SurveySchemaType) {
    console.log("Form data", data);
    if (progress !== 1){
      return; 
    }
    setStep("results");
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ThemedText type="title">Encuesta diaria</ThemedText>
        <ProgressBar
          progress={progress}
        />
      </View>
      <Form {...form}>
        <FlatList
          data={DAILY_SURVEY_QUESTIONS.slice(page * 2, page * 2 + 2)}
          keyExtractor={(question) => question.id.toString()}
          style={styles.content}
          renderItem={({ item: question }) => (
            <View key={question.id}>
              <Text variant="titleMedium">{question.question}</Text>
              {question.type === "radio" ? (
                question.options.map((option) => (
                  <View key={option.label} style={styles.radioInput}>
                    <FormField
                      control={form.control}
                      name={question.key as keyof SurveySchemaType}
                      render={({ field }) => (
                        <FormItem style={styles.radioInput}>
                          <RadioButton.Android
                            color={getRadioButtonColor(option.value as number)}
                            value={option.value.toString()}
                            status={
                              field.value == option.value
                                ? "checked"
                                : "unchecked"
                            }
                            onPress={() => field.onChange(option.value)}
                          />
                          <View style={styles.radioLabel}>
                            <Text>{option.label}</Text>
                            <ThemedText type="link">{option.summary}</ThemedText>
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
                        mode="outlined"
                        value={value as string}
                        onChangeText={(text) => onChange(text)}
                        error={!!error}
                      />
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
                            }}
                          >
                            <List.Item
                              title={item.label}
                              description={item.summary}
                            />
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  )}
                  rules={{ required: true }}
                />
              ) : question.type === "text" ? (
                <FormField
                  control={form.control}
                  name={question.key as keyof SurveySchemaType}
                  render={({ field }) => (
                    <FormItem>
                      <TextInput
                        {...field}
                        placeholder="Seleccione una opción"
                        mode="outlined"
                        value={field.value?.toString()}
                        onChangeText={(text) => field.onChange(text)}
                      />
                    </FormItem>
                  )}
                />
              ) : (
                <Fragment></Fragment>
              )}
            </View>
          )}
        />
      </Form>
      <View style={styles.footer}>
        <Button onPress={handlePrevious} disabled={page === 0}>
          Anterior
        </Button>
        <Button onPress={handleNext}>
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
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding: 15,
    overflow: "hidden",
    gap: 10,
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
    gap: -2,
  },
});

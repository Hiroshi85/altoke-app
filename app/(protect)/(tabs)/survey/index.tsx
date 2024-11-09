import { Text } from "react-native-paper";
import { Tabs } from "expo-router";
import { Fragment } from "react";
import Survey from "@/sections/Survey";
import { SurveyProvider } from "@/sections/Survey/context";
import SurveyPage from "@/sections/Survey/views";

export default function DailySurvey() {
  return (
    <SurveyProvider>
      <Tabs.Screen
        options={{
          title: "Encuesta diaria",
        }}
      />
      <SurveyPage />
    </SurveyProvider>
  );
}

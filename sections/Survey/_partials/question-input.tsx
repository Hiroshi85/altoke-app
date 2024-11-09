import * as React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import RatingButton from "./ratting_button";
import { SurveyOption, SurveyQuestion } from "@/types/survey";

interface Props {
  surveyQuestion: SurveyQuestion;
  onChange: (value: SurveyOption) => void;
}

const QuestionInput = (props: Props) => {
  const { question, options } = props.surveyQuestion
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null);

  return (
    <SafeAreaView>
      <Text variant="titleLarge">{question}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {options.map((option) => (
          <RatingButton
            key={option.value}
            label={option.label}
            value={option.value}
            summary={option.summary}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default QuestionInput;

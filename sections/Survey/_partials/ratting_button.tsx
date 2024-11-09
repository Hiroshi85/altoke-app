import { ThemedText } from "@/components/ThemedText";
import { SurveyOption } from "@/types/survey";
import React, { Fragment, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

const RatingButton = ({ label, value, summary }: SurveyOption) => {
  const [rating, setRating] = useState(0);

  const getColor = (value: number) => {
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

  const handlePress = (value: number) => {
    setRating(value);
  };

  return (
    <Fragment>
      <TouchableOpacity
        key={value}
        // onPress={() => handlePress(value)}
        style={styles.button}
      >
        <IconButton
          icon="check-circle"
          size={30}
          style={[styles.iconButton]}
          iconColor={rating === value ? getColor(value) : "#000"}
        />
        <Text style={styles.buttonText}>{label}</Text>
        {summary && <ThemedText type="link">{summary}</ThemedText>}
      </TouchableOpacity>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  iconButton: {
    borderRadius: 50,
    padding: 0,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default RatingButton;

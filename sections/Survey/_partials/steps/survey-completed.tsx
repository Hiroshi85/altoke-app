import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
// import { ChatBubbleLeftEllipsisIcon, ChartBarIcon } from 'react-native-heroicons/outline';

export default function SurveyCompleted() {
  const irAlDashboard = () => {
    // Navegar a la pantalla de dashboard
    router.navigate({
      pathname: "/",
    });
  };

  const irAlChat = () => {
    // Navegar a la pantalla de chat
    router.navigate({
      pathname: "/chat",
    });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>¡Encuesta Completada!</Title>
      <Text style={styles.description}>
        Gracias por completar tu encuesta diaria. Tus respuestas nos ayudan a
        mejorar tu experiencia y a entender mejor tus necesidades.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={irAlDashboard}>
          <Icon source="chart-bar" size={24} color="#ffffff" />
          <Text style={styles.buttonText}>Ver Resultados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={irAlChat}>
          <Icon source="chat" size={24} color="#ffffff" />
          <Text style={styles.buttonText}>Obtener recomendaciones</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    gap: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

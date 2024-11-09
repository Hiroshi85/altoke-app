import React, { useState, useMemo, useEffect } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, Button, Text, Icon, IconButton } from "react-native-paper";
import ProductCategoryChart from "./_partials/product-category-chart";
import firestore from "@react-native-firebase/firestore";
import ProductivityLineChart from "./_partials/productivity-line-chart";
import DailyMetricsChart from "./_partials/daily-metrics-chart";
import { MonitoreoDiario } from "@/types/Models/monitoreo-diario";
import { getMonthByNumber } from "@/utils/get-month-by-number";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/providers/auth";

// Datos simulados de respuestas de encuesta para los últimos 7 días
const fetchMonitoreoData = async (filter?: {
  startDate: Date;
  endDate: Date;
}) => {
  try {
    const collection = firestore().collection("monitoreo-diario");
    if (filter) {
      collection
        .where("fecha", ">=", filter.startDate)
        .where("fecha", "<=", filter.endDate);
    }
    const payload = await collection.get();
    const data = payload.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        ...(docData as MonitoreoDiario),
        fecha: docData.fecha.toDate(),
      };
    });
    return data;
  } catch (error) {
    console.error("Error fetching monitoreo data:", error);
    return [];
  }
};

const surveyQuestions = {
  cumplimientoMetaVenta: {
    question: "¿Cómo fue el nivel de ventas de hoy?",
    options: [
      { label: ">90%", summary: "Excelente", value: 5 },
      { label: "60-90%", summary: "Bueno", value: 4 },
      { label: "30-60%", summary: "Medio", value: 3 },
      { label: "10-30%", summary: "Bajo", value: 2 },
      { label: "0-10%", summary: "Muy bajo", value: 1 },
    ],
  },
  volumenVentaDiaria: {
    question: "¿Cuántas ventas aproximadamente realizaste hoy?",
    options: [
      { label: ">100", summary: "Excepcional", value: 5 },
      { label: "51-100", summary: "Muy alto", value: 4 },
      { label: "21-50", summary: "Volumen alto", value: 3 },
      { label: "11-20", summary: "Volumen moderado", value: 2 },
      { label: "0-10", summary: "Bajo volumen", value: 1 },
    ],
  },
};

export default function DashboardDiario() {
  const [monitoreoData, setMonitoreoData] = useState<MonitoreoDiario[] | null>(
    null
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Chart Data
  const [BarData, setBarData] = useState<{ value: number; label: string }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMonitoreoData();
      console.log("Fetched data", data);
      setMonitoreoData(data as MonitoreoDiario[]);
      setSelectedDate(data[data.length - 1].fecha);
    };
    fetchData();
  }, []);

  const selectedDayData = useMemo(() => {
    if (monitoreoData) {
      const _monitoreoDiario = monitoreoData.find(
        (day) => day.fecha === selectedDate
      );
      if (_monitoreoDiario) {
        setBarData([
          {
            value: _monitoreoDiario.cumplimientoMetaVenta,
            label: "CMV",
          },
          {
            value: _monitoreoDiario.volumenVentaDiaria,
            label: "VVD",
          },
          {
            value: _monitoreoDiario.capacidadGastoClientes,
            label: "CGC",
          },
          {
            value: _monitoreoDiario.comparacionVenta,
            label: "CV",
          },
          {
            value: _monitoreoDiario.satisfaccionVenta,
            label: "SV",
          },
        ]);
      }
      console.log(monitoreoData.find((day) => day.fecha == selectedDate));
      console.log("Selected date", selectedDate?.getTime());
      console.log("Monitoreo data", monitoreoData);
      return (
        monitoreoData.find(
          (day) => day.fecha.getTime() === selectedDate?.getTime()
        ) || monitoreoData[monitoreoData.length - 1]
      );
    }
  }, [selectedDate]);

  const renderDateSelector = () => {
    const currentDate = new Date();

    // Generar un array de fechas de los últimos 7 días
    const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      return date;
    });

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[ styles.selectorContainer, {
        } ]}
      >
        {lastSevenDays.map((date, index) => (
          <Button
            key={index}
            mode={
              selectedDate?.toDateString() === date.toDateString()
                ? "contained"
                : "outlined"
            }
            onPress={() => {
              console.log("Date selected:", date);
              setSelectedDate(date);
            }}
            style={[
              styles.selectorButton,
              {
                borderTopRightRadius: index != lastSevenDays.length - 1 ? 0 : undefined,
                borderBottomRightRadius: index != lastSevenDays.length - 1 ? 0 : undefined,
                borderTopLeftRadius: index != 0 ? 0 : undefined,
                borderBottomLeftRadius: index != 0 ? 0 : undefined,
                borderRightWidth: index != lastSevenDays.length - 1 ? 0 : 1,
              }
            ]}
            textColor={selectedDate?.toDateString() === date.toDateString() ? "#fff" : "#000"}
          >
            {date.getDate()} {/* Muestra solo el día del mes */}
          </Button>
        ))}
      </ScrollView>
    );
  };

  const lineData = useMemo(
    () =>
      monitoreoData &&
      monitoreoData.map((day) => ({
        value: day.cumplimientoMetaVenta,
        label: day.fecha.toString().split("-")[2], // Día del mes
        dataPointText: day.cumplimientoMetaVenta.toString(),
      })),
    [monitoreoData]
  );

  const getSummary = (key: string, value?: number) => {
    const question = surveyQuestions[key as keyof typeof surveyQuestions];
    if (question) {
      const option = question.options.find((opt) => opt.value === value);
      return option ? option.summary : "N/A";
    }
    return "N/A";
  };

  const {signOut} = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Title style={[ styles.title, {maxWidth: "80%"} ]}>Dashboard de Encuesta Diaria</Title>
        {/* Cerrar Sessión Button */}
        <IconButton
          icon="logout"
          mode="contained"
          size={30}
          onPress={async () => {
            await signOut();
          }} 
        />
      </View>

      <View style={
        {
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }
      }>
        <View style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}>
        <Icon
          source={"calendar"}
          size={30}
          color={"#1e88e5"}
        />
        <ThemedText type="subtitle" style={{
          fontSize: 18,
          fontWeight: 500,
        }}>{selectedDate && getMonthByNumber(selectedDate.getMonth())} </ThemedText>
        </View>
        {renderDateSelector()}
      </View>
      <Card style={styles.card} elevation={0}>
        <Card.Content>
          <Title>Resumen del Día</Title>
          <Paragraph>Fecha: {selectedDayData?.fecha.toString()}</Paragraph>
          <Paragraph>
            Nivel de ventas:{" "}
            {getSummary(
              "cumplimientoMetaVenta",
              selectedDayData?.cumplimientoMetaVenta
            )}
          </Paragraph>
          <Paragraph>
            Volumen de ventas:{" "}
            {getSummary(
              "volumenVentaDiaria",
              selectedDayData?.volumenVentaDiaria
            )}
          </Paragraph>
          <Paragraph>
            Factor externo: {selectedDayData?.factorExterno}
          </Paragraph>
          <Paragraph>
            Aumento en la competencia: {selectedDayData?.competencia}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={0}>
        <Card.Content>
          <Title
            style={{
              textAlign: "center",
            }}
          >
            Categoría de producto más vendido {"(últimos 7 días)"}
          </Title>
          <ProductCategoryChart />
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={0}>
        <Card.Content>
          <Title>Nivel de Ventas (Últimos 7 días)</Title>
          <ProductivityLineChart data={lineData || []} />
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={0}>
        <Card.Content>
          <Title>Métricas del Día</Title>
          <DailyMetricsChart barData={BarData} />
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={0}>
        <Card.Content>
          <Title>Análisis y Recomendaciones</Title>
          {selectedDayData && (
            <Paragraph>
              Basado en las respuestas del {selectedDayData.fecha.toISOString()}
              :
              {selectedDayData.cumplimientoMetaVenta >= 4
                ? "\n- El nivel de ventas fue bueno hoy. Mantén las estrategias actuales."
                : "\n- Considera revisar tus tácticas de venta para mejorar el cumplimiento de la meta."}
              {selectedDayData.volumenVentaDiaria >= 4
                ? "\n- Excelente volumen de ventas. Analiza qué factores contribuyeron a este éxito."
                : "\n- Busca formas de aumentar el número de transacciones diarias."}
              {selectedDayData.capacidadGastoClientes >= 4
                ? "\n- Los clientes muestran buena capacidad de gasto. Considera ofrecer productos o servicios premium."
                : "\n- Evalúa la posibilidad de ofrecer opciones más asequibles o promociones."}
              {selectedDayData.comparacionVenta >= 4
                ? "\n- Las ventas se comparan favorablemente con días anteriores."
                : "\n- Analiza qué factores pueden haber influido en la disminución de las ventas comparativas."}
              {selectedDayData.satisfaccionVenta < 3
                ? "\n- Presta atención a la satisfacción del cliente. Identifica áreas de mejora en el servicio."
                : "\n- Mantén el buen nivel de satisfacción del cliente."}
              {selectedDayData.factorExterno === "Festividad"
                ? "\n- Aprovecha la festividad para crear promociones o eventos especiales."
                : ""}
              {selectedDayData.competencia === "SI"
                ? "\n- Estate atento a las estrategias de la competencia y ajusta tus tácticas según sea necesario."
                : ""}
            </Paragraph>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: ( StatusBar.currentHeight || 0 ) + 10,
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
  selectorContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  selectorButton: {
    minWidth: 60,
  },
  legendContainer: {
    marginTop: 16,
  },
});

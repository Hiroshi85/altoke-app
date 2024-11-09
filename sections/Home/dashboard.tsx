import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';

const { width } = Dimensions.get('window');

// Datos simulados de respuestas de encuesta para los últimos 7 días
const mockData = [
  { fecha: '2024-11-03', cumplimientoMetaVenta: 3, volumenVentaDiaria: 2, capacidadGastoClientes: 4, comparacionVenta: 3, satisfaccionVenta: 4, factorExterno: "Normal", competencia: "NO" },
  { fecha: '2024-11-04', cumplimientoMetaVenta: 4, volumenVentaDiaria: 3, capacidadGastoClientes: 3, comparacionVenta: 4, satisfaccionVenta: 3, factorExterno: "Normal", competencia: "NO" },
  { fecha: '2024-11-05', cumplimientoMetaVenta: 5, volumenVentaDiaria: 4, capacidadGastoClientes: 5, comparacionVenta: 5, satisfaccionVenta: 5, factorExterno: "Festividad", competencia: "SÍ" },
  { fecha: '2024-11-06', cumplimientoMetaVenta: 4, volumenVentaDiaria: 3, capacidadGastoClientes: 4, comparacionVenta: 4, satisfaccionVenta: 4, factorExterno: "Normal", competencia: "SÍ" },
  { fecha: '2024-11-07', cumplimientoMetaVenta: 4, volumenVentaDiaria: 3, capacidadGastoClientes: 5, comparacionVenta: 4, satisfaccionVenta: 3, factorExterno: "Festividad", competencia: "NO" },
  { fecha: '2024-11-08', cumplimientoMetaVenta: 4, volumenVentaDiaria: 3, capacidadGastoClientes: 5, comparacionVenta: 5, satisfaccionVenta: 2, factorExterno: "Festividad", competencia: "NO" },
  { fecha: '2024-11-09', cumplimientoMetaVenta: 3, volumenVentaDiaria: 2, capacidadGastoClientes: 4, comparacionVenta: 4, satisfaccionVenta: 4, factorExterno: "Normal", competencia: "NO" },
];

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
  const [selectedDate, setSelectedDate] = useState(mockData[mockData.length - 1].fecha);

  const selectedDayData = useMemo(() => 
    mockData.find(day => day.fecha === selectedDate) || mockData[mockData.length - 1],
  [selectedDate]);

  const lineData = useMemo(() => mockData.map(day => ({
    value: day.cumplimientoMetaVenta,
    label: day.fecha.split('-')[2], // Día del mes
    dataPointText: day.cumplimientoMetaVenta.toString(),
  })), []);

  const barData = [
    { value: selectedDayData.cumplimientoMetaVenta, label: 'CMV', frontColor: '#1e88e5' },
    { value: selectedDayData.volumenVentaDiaria, label: 'VVD', frontColor: '#43a047' },
    { value: selectedDayData.capacidadGastoClientes, label: 'CGC', frontColor: '#fdd835' },
    { value: selectedDayData.comparacionVenta, label: 'CV', frontColor: '#fb8c00' },
    { value: selectedDayData.satisfaccionVenta, label: 'SV', frontColor: '#e53935' },
  ];

  const renderDateSelector = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorContainer}>
      {mockData.map((day) => (
        <Button
          key={day.fecha}
          mode={selectedDate === day.fecha ? 'contained' : 'outlined'}
          onPress={() => setSelectedDate(day.fecha)}
          style={styles.selectorButton}
        >
          {day.fecha.split('-')[2]}
        </Button>
      ))}
    </ScrollView>
  );

  const getSummary = (key : string, value : number) => {
    const question = surveyQuestions[key as keyof typeof surveyQuestions];
    if (question) {
      const option = question.options.find(opt => opt.value === value);
      return option ? option.summary : 'N/A';
    }
    return 'N/A';
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Dashboard de Encuesta Diaria</Title>

      {renderDateSelector()}

      <Card style={styles.card} elevation={0}>
        <Card.Content>
          <Title>Resumen del Día</Title>
          <Paragraph>Fecha: {selectedDayData.fecha}</Paragraph>
          <Paragraph>Nivel de ventas: {getSummary('cumplimientoMetaVenta', selectedDayData.cumplimientoMetaVenta)}</Paragraph>
          <Paragraph>Volumen de ventas: {getSummary('volumenVentaDiaria', selectedDayData.volumenVentaDiaria)}</Paragraph>
          <Paragraph>Factor externo: {selectedDayData.factorExterno}</Paragraph>
          <Paragraph>Aumento en la competencia: {selectedDayData.competencia}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={0}>
        <Card.Content>
          <Title>Nivel de Ventas (Últimos 7 días)</Title>
          <LineChart
            data={lineData}
            width={width - 64}
            height={200}
            spacing={40}
            color="#1e88e5"
            thickness={2}
            startFillColor="rgba(30,136,229,0.3)"
            endFillColor="rgba(30,136,229,0.01)"
            startOpacity={0.9}
            endOpacity={0.2}
            initialSpacing={0}
            noOfSections={4}
            maxValue={5}
            yAxisColor="lightgray"
            yAxisThickness={1}
            rulesType="solid"
            rulesColor="lightgray"
            yAxisTextStyle={{ color: 'gray' }}
            xAxisColor="lightgray"
            xAxisThickness={1}
            xAxisLabelTextStyle={{ color: 'gray' }}
            hideDataPoints
            hideRules
          />
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={0}>
        <Card.Content>
          <Title>Métricas del Día</Title>
          <BarChart
            data={barData}
            width={width - 64}
            height={200}
            barWidth={32}
            spacing={24}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: 'gray' }}
            xAxisLabelTextStyle={{ color: 'gray' }}
            noOfSections={5}
            maxValue={5}
          />
          <View style={styles.legendContainer}>
            <Text>CMV: Cumplimiento Meta de Venta</Text>
            <Text>VVD: Volumen Venta Diaria</Text>
            <Text>CGC: Capacidad de Gasto de Clientes</Text>
            <Text>CV: Comparación de Venta</Text>
            <Text>SV: Satisfacción de Venta</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={0}>
        <Card.Content>
          <Title>Análisis y Recomendaciones</Title>
          <Paragraph>
            Basado en las respuestas del {selectedDayData.fecha}:
            {selectedDayData.cumplimientoMetaVenta >= 4 ? '\n- El nivel de ventas fue bueno hoy. Mantén las estrategias actuales.' : '\n- Considera revisar tus tácticas de venta para mejorar el cumplimiento de la meta.'}
            {selectedDayData.volumenVentaDiaria >= 4 ? '\n- Excelente volumen de ventas. Analiza qué factores contribuyeron a este éxito.' : '\n- Busca formas de aumentar el número de transacciones diarias.'}
            {selectedDayData.capacidadGastoClientes >= 4 ? '\n- Los clientes muestran buena capacidad de gasto. Considera ofrecer productos o servicios premium.' : '\n- Evalúa la posibilidad de ofrecer opciones más asequibles o promociones.'}
            {selectedDayData.comparacionVenta >= 4 ? '\n- Las ventas se comparan favorablemente con días anteriores.' : '\n- Analiza qué factores pueden haber influido en la disminución de las ventas comparativas.'}
            {selectedDayData.satisfaccionVenta < 3 ? '\n- Presta atención a la satisfacción del cliente. Identifica áreas de mejora en el servicio.' : '\n- Mantén el buen nivel de satisfacción del cliente.'}
            {selectedDayData.factorExterno === 'Festividad' ? '\n- Aprovecha la festividad para crear promociones o eventos especiales.' : ''}
            {selectedDayData.competencia === 'SÍ' ? '\n- Estate atento a las estrategias de la competencia y ajusta tus tácticas según sea necesario.' : ''}
          </Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectorContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  selectorButton: {
    minWidth: 60,
    marginRight: 8,
  },
  legendContainer: {
    marginTop: 16,
  },
});
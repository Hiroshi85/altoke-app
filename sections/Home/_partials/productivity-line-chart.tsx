import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';


export default function ProductivityLineChart() {
  // Datos para el gráfico de barras
  const barData = [
    {value: 250, label: 'L'},
    {value: 500, label: 'M', frontColor: '#177AD5'},
    {value: 745, label: 'M', frontColor: '#177AD5'},
    {value: 320, label: 'J'},
    {value: 600, label: 'V', frontColor: '#177AD5'},
    {value: 256, label: 'S'},
    {value: 300, label: 'D'},
  ];

  // Datos para el gráfico de líneas
  const lineData = [
    {value: 0},
    {value: 20},
    {value: 18},
    {value: 40},
    {value: 36},
    {value: 60},
    {value: 54},
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.title}>{`Productividad`}</ThemedText>
      
      <View style={styles.chartContainer}>
        <ThemedText style={styles.chartTitle}>Ventas Semanales</ThemedText>
        <BarChart
          data={barData}
          barWidth={22}
          spacing={24}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={styles.chartText}
          xAxisLabelTextStyle={styles.chartText}
        />
      </View>

      <View style={styles.chartContainer}>
        <ThemedText style={styles.chartTitle}>Tendencia de Usuarios</ThemedText>
        <LineChart
          data={lineData}
          color="#177AD5"
          thickness={2}
          maxValue={100}
          noOfSections={5}
          areaChart
          yAxisTextStyle={styles.chartText}
          xAxisLabelTextStyle={styles.chartText}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>2,971</ThemedText>
          <ThemedText style={styles.statLabel}>Usuarios Totales</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>$12,345</ThemedText>
          <ThemedText style={styles.statLabel}>Ingresos</ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: 24,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartText: {
    color: '#333',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
});
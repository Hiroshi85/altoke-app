// import { ThemedText } from '@/components/ThemedText';
// import React from 'react';
// import { View, ScrollView, StyleSheet } from 'react-native';
// import { BarChart, LineChart } from 'react-native-gifted-charts';


// export default function ProductivityLineChart() {
//   // Datos para el gráfico de barras
//   const barData = [
//     {value: 250, label: 'L'},
//     {value: 500, label: 'M', frontColor: '#177AD5'},
//     {value: 745, label: 'M', frontColor: '#177AD5'},
//     {value: 320, label: 'J'},
//     {value: 600, label: 'V', frontColor: '#177AD5'},
//     {value: 256, label: 'S'},
//     {value: 300, label: 'D'},
//   ];

//   // Datos para el gráfico de líneas
//   const lineData = [
//     {value: 0},
//     {value: 20},
//     {value: 18},
//     {value: 40},
//     {value: 36},
//     {value: 60},
//     {value: 54},
//   ];

//   return (
//     <ScrollView style={styles.container}>
//       <ThemedText style={styles.title}>{`Productividad`}</ThemedText>
      
//       <View style={styles.chartContainer}>
//         <ThemedText style={styles.chartTitle}>Ventas Semanales</ThemedText>
//         <BarChart
//           data={barData}
//           barWidth={22}
//           spacing={24}
//           roundedTop
//           roundedBottom
//           hideRules
//           xAxisThickness={0}
//           yAxisThickness={0}
//           yAxisTextStyle={styles.chartText}
//           xAxisLabelTextStyle={styles.chartText}
//         />
//       </View>

//       <View style={styles.chartContainer}>
//         <ThemedText style={styles.chartTitle}>Tendencia de Usuarios</ThemedText>
//         <LineChart
//           data={lineData}
//           color="#177AD5"
//           thickness={2}
//           maxValue={100}
//           noOfSections={5}
//           areaChart
//           yAxisTextStyle={styles.chartText}
//           xAxisLabelTextStyle={styles.chartText}
//         />
//       </View>

//       <View style={styles.statsContainer}>
//         <View style={styles.statItem}>
//           <ThemedText style={styles.statValue}>2,971</ThemedText>
//           <ThemedText style={styles.statLabel}>Usuarios Totales</ThemedText>
//         </View>
//         <View style={styles.statItem}>
//           <ThemedText style={styles.statValue}>$12,345</ThemedText>
//           <ThemedText style={styles.statLabel}>Ingresos</ThemedText>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   chartContainer: {
//     marginBottom: 24,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     padding: 16,
//   },
//   chartTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   chartText: {
//     color: '#333',
//     fontSize: 12,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 24,
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   statValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#666',
//   },
// });
import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';

const { width } = Dimensions.get('window');

// Datos simulados para varios meses
const mockData = [
  { fecha: '2024-09-07', capacidadGastoClientes: 4, categoriaProductoMasVendido: "Calzado", comparacionVenta: 3, competencia: "NO", cumplimientoMetaVenta: 3, factorExterno: "Normal", metaVenta: 900, satisfaccionVenta: 4, volumenVentaDiaria: 4 },
  { fecha: '2024-09-15', capacidadGastoClientes: 3, categoriaProductoMasVendido: "Ropa", comparacionVenta: 4, competencia: "NO", cumplimientoMetaVenta: 4, factorExterno: "Normal", metaVenta: 950, satisfaccionVenta: 3, volumenVentaDiaria: 5 },
  { fecha: '2024-10-03', capacidadGastoClientes: 5, categoriaProductoMasVendido: "Accesorios", comparacionVenta: 5, competencia: "SÍ", cumplimientoMetaVenta: 5, factorExterno: "Festividad", metaVenta: 1200, satisfaccionVenta: 5, volumenVentaDiaria: 7 },
  { fecha: '2024-10-20', capacidadGastoClientes: 4, categoriaProductoMasVendido: "Calzado", comparacionVenta: 4, competencia: "SÍ", cumplimientoMetaVenta: 4, factorExterno: "Normal", metaVenta: 1000, satisfaccionVenta: 4, volumenVentaDiaria: 6 },
  { fecha: '2024-11-07', capacidadGastoClientes: 5, categoriaProductoMasVendido: "Ropa", comparacionVenta: 4, competencia: "NO", cumplimientoMetaVenta: 4, factorExterno: "Festividad", metaVenta: 1000, satisfaccionVenta: 3, volumenVentaDiaria: 6 },
  { fecha: '2024-11-09', capacidadGastoClientes: 5, categoriaProductoMasVendido: "Calzado", comparacionVenta: 5, competencia: "NO", cumplimientoMetaVenta: 4, factorExterno: "Festividad", metaVenta: 1000, satisfaccionVenta: 2, volumenVentaDiaria: 5 }
];

export default function ProductivityLineChart() {
  const [selectedMonth, setSelectedMonth] = useState('11'); // Mes seleccionado (noviembre por defecto)

  const groupedData = useMemo(() => {
    const grouped = mockData.reduce((acc: { [key: string]: any[] }, curr) => {
      const month = curr.fecha.split('-')[1];
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(curr);
      return acc;
    }, {});
    return grouped;
  }, []);

  const months = Object.keys(groupedData).sort();

  const currentMonthData = groupedData[selectedMonth] || [];

  const lineData = currentMonthData.map((day : any) => ({
    value: day.volumenVentaDiaria,
    label: day.fecha.split('-')[2], // Día del mes
    dataPointText: day.volumenVentaDiaria.toString(),
  }));

  const averageMetrics = currentMonthData.reduce((acc : any, curr: any) => {
    acc.capacidadGastoClientes += curr.capacidadGastoClientes;
    acc.comparacionVenta += curr.comparacionVenta;
    acc.cumplimientoMetaVenta += curr.cumplimientoMetaVenta;
    acc.satisfaccionVenta += curr.satisfaccionVenta;
    return acc;
  }, { capacidadGastoClientes: 0, comparacionVenta: 0, cumplimientoMetaVenta: 0, satisfaccionVenta: 0 });

  Object.keys(averageMetrics).forEach(key => {
    averageMetrics[key] = +(averageMetrics[key] / currentMonthData.length).toFixed(1);
  });

  const barData = [
    { value: averageMetrics.capacidadGastoClientes, label: 'CGC', frontColor: '#1e88e5' },
    { value: averageMetrics.comparacionVenta, label: 'CV', frontColor: '#43a047' },
    { value: averageMetrics.cumplimientoMetaVenta, label: 'CMV', frontColor: '#fdd835' },
    { value: averageMetrics.satisfaccionVenta, label: 'SV', frontColor: '#e53935' },
  ];

  const renderMonthSelector = () => (
    <View style={styles.selectorContainer}>
      {months.map((month) => (
        <Button
          key={month}
          mode={selectedMonth === month ? 'contained' : 'outlined'}
          onPress={() => setSelectedMonth(month)}
          style={styles.selectorButton}
        >
          {new Date(2024, parseInt(month) - 1).toLocaleString('default', { month: 'short' })}
        </Button>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Dashboard de Productividad</Title>

      {renderMonthSelector()}

      <Card style={styles.card} elevation={0}>
        <Card.Content>
          <Title>Resumen del Mes</Title>
          <Paragraph>Mes: {new Date(2024, parseInt(selectedMonth) - 1).toLocaleString('default', { month: 'long' })}</Paragraph>
          <Paragraph>Días registrados: {currentMonthData.length}</Paragraph>
          <Paragraph>Producto más vendido: {currentMonthData[currentMonthData.length - 1]?.categoriaProductoMasVendido || 'N/A'}</Paragraph>
          <Paragraph>Meta de venta promedio: ${(currentMonthData.reduce((sum, day) => sum + day.metaVenta, 0) / currentMonthData.length).toFixed(2)}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={0}>
        <Card.Content>
          <Title>Volumen de Ventas Diarias</Title>
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
            noOfSections={3}
            maxValue={10}
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
          <Title>Métricas Promedio del Mes</Title>
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
            <Text>CGC: Capacidad de Gasto de Clientes</Text>
            <Text>CV: Comparación de Venta</Text>
            <Text>CMV: Cumplimiento Meta de Venta</Text>
            <Text>SV: Satisfacción de Venta</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={0}>
        <Card.Content>
          <Title>Análisis y Recomendaciones</Title>
          <Paragraph>
            Basado en los datos de {new Date(2024, parseInt(selectedMonth) - 1).toLocaleString('default', { month: 'long' })}:
            {averageMetrics.capacidadGastoClientes > 3 ? '\n- La capacidad de gasto de los clientes es favorable.' : '\n- Considere ofrecer opciones de productos más económicos.'}
            {averageMetrics.cumplimientoMetaVenta >= 4 ? '\n- Buen cumplimiento de la meta de ventas.' : '\n- Revise estrategias para mejorar el cumplimiento de la meta.'}
            {averageMetrics.satisfaccionVenta < 3 ? '\n- Enfóquese en mejorar la satisfacción del cliente.' : '\n- Mantenga el buen nivel de satisfacción del cliente.'}
            {currentMonthData.some(day => day.factorExterno === 'Festividad') ? '\n- Aproveche las festividades del mes para promociones especiales.' : ''}
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
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  selectorButton: {
    minWidth: 80,
  },
  legendContainer: {
    marginTop: 16,
  },
});
// import React, { useState } from 'react';
// import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
// import { LineChart, BarChart } from 'react-native-gifted-charts';
// import { Card, Title, Paragraph, Button } from 'react-native-paper';

// const { width } = Dimensions.get('window');

// // Datos simulados para tres días
// const mockData = [
//   {
//     fecha: '07/11/2024',
//     capacidadGastoClientes: 4,
//     categoriaProductoMasVendido: "Calzado",
//     comparacionVenta: 3,
//     competencia: "NO",
//     cumplimientoMetaVenta: 3,
//     factorExterno: "Normal",
//     metaVenta: 900,
//     satisfaccionVenta: 4,
//     volumenVentaDiaria: 4
//   },
//   {
//     fecha: '08/11/2024',
//     capacidadGastoClientes: 5,
//     categoriaProductoMasVendido: "Ropa",
//     comparacionVenta: 4,
//     competencia: "NO",
//     cumplimientoMetaVenta: 4,
//     factorExterno: "Festividad",
//     metaVenta: 1000,
//     satisfaccionVenta: 3,
//     volumenVentaDiaria: 6
//   },
//   {
//     fecha: '09/11/2024',
//     capacidadGastoClientes: 5,
//     categoriaProductoMasVendido: "Calzado",
//     comparacionVenta: 5,
//     competencia: "NO",
//     cumplimientoMetaVenta: 4,
//     factorExterno: "Festividad",
//     metaVenta: 1000,
//     satisfaccionVenta: 2,
//     volumenVentaDiaria: 5
//   }
// ];

// export default function ProductivityLineChart() {
//   const [selectedDay, setSelectedDay] = useState(2); // Índice del día seleccionado

//   const lineData = mockData.map((day, index) => ({
//     value: day.volumenVentaDiaria,
//     label: day.fecha.split('/')[0], // Sólo mostramos el día
//     dataPointText: day.volumenVentaDiaria.toString(),
//   }));

//   const barData = [
//     { value: mockData[selectedDay].capacidadGastoClientes, label: 'CGC', frontColor: '#1e88e5' },
//     { value: mockData[selectedDay].comparacionVenta, label: 'CV', frontColor: '#43a047' },
//     { value: mockData[selectedDay].cumplimientoMetaVenta, label: 'CMV', frontColor: '#fdd835' },
//     { value: mockData[selectedDay].satisfaccionVenta, label: 'SV', frontColor: '#e53935' },
//   ];

//   const renderDaySelector = () => (
//     <View style={styles.selectorContainer}>
//       {mockData.map((day, index) => (
//         <Button
//           key={day.fecha}
//           mode={selectedDay === index ? 'contained' : 'outlined'}
//           onPress={() => setSelectedDay(index)}
//           style={styles.selectorButton}
//         >
//           {day.fecha.split('/')[0]}
//         </Button>
//       ))}
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <Title style={styles.title}>Dashboard de Productividad</Title>

//       {renderDaySelector()}

//       <Card style={styles.card}>
//         <Card.Content>
//           <Title>Resumen del Día</Title>
//           <Paragraph>Fecha: {mockData[selectedDay].fecha}</Paragraph>
//           <Paragraph>Producto más vendido: {mockData[selectedDay].categoriaProductoMasVendido}</Paragraph>
//           <Paragraph>Meta de venta: ${mockData[selectedDay].metaVenta}</Paragraph>
//           <Paragraph>Factor externo: {mockData[selectedDay].factorExterno}</Paragraph>
//         </Card.Content>
//       </Card>

//       <Card style={styles.card}>
//         <Card.Content>
//           <Title>Volumen de Ventas Diarias</Title>
//           <LineChart
//             data={lineData}
//             width={width - 64}
//             height={200}
//             spacing={40}
//             color="#1e88e5"
//             thickness={2}
//             startFillColor="rgba(30,136,229,0.3)"
//             endFillColor="rgba(30,136,229,0.01)"
//             startOpacity={0.9}
//             endOpacity={0.2}
//             initialSpacing={0}
//             noOfSections={3}
//             maxValue={10}
//             yAxisColor="lightgray"
//             yAxisThickness={1}
//             rulesType="solid"
//             rulesColor="lightgray"
//             yAxisTextStyle={{ color: 'gray' }}
//             xAxisColor="lightgray"
//             xAxisThickness={1}
//             xAxisLabelTextStyle={{ color: 'gray' }}
//             hideDataPoints
//             hideRules
//           />
//         </Card.Content>
//       </Card>

//       <Card style={styles.card}>
//         <Card.Content>
//           <Title>Métricas del Día</Title>
//           <BarChart
//             data={barData}
//             width={width - 64}
//             height={200}
//             barWidth={32}
//             spacing={24}
//             roundedTop
//             roundedBottom
//             hideRules
//             xAxisThickness={0}
//             yAxisThickness={0}
//             yAxisTextStyle={{ color: 'gray' }}
//             xAxisLabelTextStyle={{ color: 'gray' }}
//             noOfSections={5}
//             maxValue={5}
//           />
//           <View style={styles.legendContainer}>
//             <Paragraph>CGC: Capacidad de Gasto de Clientes</Paragraph>
//             <Paragraph>CV: Comparación de Venta</Paragraph>
//             <Paragraph>CMV: Cumplimiento Meta de Venta</Paragraph>
//             <Paragraph>SV: Satisfacción de Venta</Paragraph>
//           </View>
//         </Card.Content>
//       </Card>

//       <Card style={styles.card}>
//         <Card.Content>
//           <Title>Análisis y Recomendaciones</Title>
//           <Paragraph>
//             Basado en los datos del {mockData[selectedDay].fecha}:
//             {mockData[selectedDay].capacidadGastoClientes > 3 ? '\n- La capacidad de gasto de los clientes es favorable.' : '\n- Considere ofrecer opciones de productos más económicos.'}
//             {mockData[selectedDay].cumplimientoMetaVenta >= 4 ? '\n- Buen cumplimiento de la meta de ventas.' : '\n- Revise estrategias para mejorar el cumplimiento de la meta.'}
//             {mockData[selectedDay].satisfaccionVenta < 3 ? '\n- Enfóquese en mejorar la satisfacción del cliente.' : '\n- Mantenga el buen nivel de satisfacción del cliente.'}
//             {mockData[selectedDay].factorExterno === 'Festividad' ? '\n- Aproveche la festividad para promociones especiales.' : ''}
//           </Paragraph>
//         </Card.Content>
//       </Card>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   card: {
//     marginBottom: 16,
//   },
//   selectorContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 16,
//   },
//   selectorButton: {
//     minWidth: 80,
//   },
//   legendContainer: {
//     marginTop: 16,
//   },
// });
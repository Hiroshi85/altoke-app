import { Dimensions, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Text } from "react-native-paper";

interface BarDataProps {
  value: number;
  label: string;
}

const colors = ["#1e88e5", "#43a047", "#fdd835", "#e53935", "#fb8c00"];
const { width } = Dimensions.get("window");
export default function DailyMetricsChart({
  barData,
}: {
  barData: BarDataProps[];
}) {
  const barDataWithColors = barData.map((item, index) => ({
    ...item,
    frontColor: colors[index % colors.length],
  }));

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BarChart
        data={barDataWithColors}
        width={width - 64}
        height={200}
        barWidth={32}
        spacing={24}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        xAxisLabelTextStyle={{ color: "gray" }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  legendContainer: {
    marginTop: 16,
  },
});

import { Dimensions, StyleSheet, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Text } from "react-native-paper";

const colors = ["#177AD5", "#79D2DE", "#ED6665"];

interface PieChartDataProps {
  label: string;
  value: number;
  text: string;
}
const mockpieData = [
  { label: "Calzado", value: 54, text: "54%" },
  { label: "Bebidas", value: 30, text: "30%" },
  { label: "Alimentos", value: 26, text: "26%" },
];

export default function ProductCategoryChart({
  pieData = mockpieData,
}: { pieData?: PieChartDataProps[] } = {}) {
  const pieDataWithColors = pieData.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
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
      <PieChart
        donut
        showText
        textColor="black"
        innerRadius={70}
        showTextBackground
        textBackgroundColor="white"
        textBackgroundRadius={22}
        data={pieDataWithColors}
      />
      <View style={styles.legendContainer}>
        {pieData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: colors[index % colors.length] },
              ]}
            />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  },
});

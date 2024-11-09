import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface ProductivityLineChartProps {
  data: {
    value: number;
    label: string;
    dataPointText: string;
  }[];
}

const { width } = Dimensions.get("window");

export default function ProductivityLineChart({
  data,
}: ProductivityLineChartProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LineChart
        data={data}
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
        yAxisTextStyle={{ color: "gray" }}
        xAxisColor="lightgray"
        xAxisThickness={1}
        xAxisLabelTextStyle={{ color: "gray" }}
        hideDataPoints
        hideRules
      />
    </View>
  );
}

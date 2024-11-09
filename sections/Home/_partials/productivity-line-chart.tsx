import { LineChart } from "react-native-gifted-charts";
 
const ProductivityLineChart = () => {
    const data = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];
    return <LineChart data={data}/>;
};

export default ProductivityLineChart;
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Header from "../components/HeaderComponents/Header";
import styles from "./Dashboard.module.css";
import { useItems } from "../contexts/ItemsContext";

function Dashboard() {
  const { totalTrans } = useItems();

  const data = totalTrans.map((total, i) => ({
    transaction: i + 1,
    Total: total,
  }));

  return (
    <div className={styles.container}>
      <Header />
      <BarChart width={350} height={300} data={data} barSize={30}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="transaction" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Total" fill="hsl(0, 0%, 0%)" />
      </BarChart>
    </div>
  );
}

export default Dashboard;

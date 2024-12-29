import { useEffect, useState } from "react";
import { useItems } from "../../contexts/ItemsContext";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function DailySalesSummary({ chartStyle, labelStyle }) {
  const [dailySales, setDailySales] = useState([]);
  const { previousTransactions, getCurrentDate } = useItems();

  //Daily sales summary
  useEffect(() => {
    setDailySales(() => {
      const dates = previousTransactions.map((trans) =>
        getCurrentDate(trans.day)
      );

      const uniqueDates = Array.from(new Set(dates));

      const dailySales = uniqueDates.map((date) => {
        const dayTotal = previousTransactions
          .filter((trans) => getCurrentDate(trans.day) === date)
          .reduce((acc, curr) => (acc += curr.total), 0);

        return { date, total: dayTotal };
      });

      return dailySales;
    });
  }, [previousTransactions, getCurrentDate]);

  return (
    <div className={chartStyle}>
      <h3 className={labelStyle}>Daily Sales Summary</h3>
      <LineChart
        width={400}
        height={300}
        data={dailySales}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#000" />
      </LineChart>
    </div>
  );
}

export default DailySalesSummary;

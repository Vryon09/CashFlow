import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { useItems } from "../../contexts/ItemsContext";
import { initialSalesByDay } from "../../InitialData/initialSalesByDay";

function SalesByDay({ chartStyle, labelStyle, salesByDay, setSalesByDay }) {
  const { previousTransactions, getDayName } = useItems();

  //Sales by day
  useEffect(() => {
    setSalesByDay(() =>
      initialSalesByDay.map((sale) => {
        const totalByDay = previousTransactions
          .filter((trans) => sale.day === getDayName(new Date(trans.day)))
          .reduce((acc, curr) => (acc += curr.total), 0);

        return { day: sale.day, sales: totalByDay };
      })
    );
  }, [previousTransactions, getDayName, setSalesByDay]);

  return (
    <div className={chartStyle}>
      <h3 className={labelStyle}>Sales by day</h3>
      <BarChart width={400} height={300} data={salesByDay} barSize={30}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="hsl(0, 0%, 0%)" />
      </BarChart>
    </div>
  );
}

export default SalesByDay;

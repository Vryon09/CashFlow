import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Header from "../components/HeaderComponents/Header";
import styles from "./Dashboard.module.css";
import { useItems } from "../contexts/ItemsContext";
import { useEffect, useState } from "react";

function Dashboard() {
  const [salesByDay, setSalesByDay] = useState([
    { day: "Monday", sales: 0 },
    { day: "Tuesday", sales: 0 },
    { day: "Wednesday", sales: 0 },
    { day: "Thursday", sales: 0 },
    { day: "Friday", sales: 0 },
    { day: "Saturday", sales: 0 },
    { day: "Sunday", sales: 0 },
  ]);

  const [dailySales, setDailySales] = useState([]);
  const [paymentDistribution, setPaymentDistribution] = useState([]);

  const {
    prevPayments,
    handlePaymentMethodTotal,
    previousTransactions,
    getDayName,
    getCurrentDate,
  } = useItems();

  useEffect(() => {
    setSalesByDay((sales) =>
      sales.map((sale) => {
        const totalByDay = previousTransactions
          .filter((trans) => sale.day === getDayName(trans.day))
          .reduce((acc, curr) => (acc += curr.total), 0);

        return { ...sale, sales: totalByDay };
      })
    );
  }, [previousTransactions, getDayName]);

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

  //convert payment data into state

  useEffect(() => {
    setPaymentDistribution(() => {
      const dates = previousTransactions.map((trans) =>
        getCurrentDate(trans.day)
      );

      const uniqueDates = Array.from(new Set(dates));

      return uniqueDates.map((date) => {
        const paymentDistribution = previousTransactions
          .filter((trans) => getCurrentDate(trans.day) === date)
          .reduce(
            (acc, curr) => {
              const cash = curr.paymentList.reduce((acc, curr) => {
                if (curr.method === "Cash") acc += curr.amount;
                return acc;
              }, 0);
              const card = curr.paymentList.reduce((acc, curr) => {
                if (curr.method === "Card") acc += curr.amount;

                return acc;
              }, 0);

              acc.cash += cash;
              acc.card += card;
              return acc;
            },
            { cash: 0, card: 0 }
          );

        return { date, ...paymentDistribution };
      });
    });
  }, [previousTransactions]);

  //only 5 datas should be displayed

  //change the line chart data into total sales not amount of payment guest's paid

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.charts}>
        <div className={styles.barCharts}>
          <div>
            <h3>Sales by day</h3>
            <BarChart width={350} height={300} data={salesByDay} barSize={30}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="hsl(0, 0%, 0%)" />
            </BarChart>
          </div>

          {/* Eto nalang problema, I just have to convert this data into a state */}
          <div>
            <h3>Payment Method Distribution</h3>
            <BarChart
              width={350}
              height={300}
              data={paymentDistribution}
              barSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cash" fill="hsl(0, 0%, 40%)" />
              <Bar dataKey="card" fill="hsl(0, 0%, 0%)" />
              {/* <Bar dataKey="Total" fill="hsl(0, 0%, 20%)" /> */}
            </BarChart>
            <div className={styles.totals}>
              <h4>
                Cash: ${" "}
                {handlePaymentMethodTotal(
                  previousTransactions
                ).cash.toLocaleString()}
              </h4>
              <h4>
                Card: ${" "}
                {handlePaymentMethodTotal(
                  previousTransactions
                ).card.toLocaleString()}
              </h4>
              <h4>
                Total: ${" "}
                {(
                  handlePaymentMethodTotal(previousTransactions).card +
                  handlePaymentMethodTotal(previousTransactions).cash
                ).toLocaleString()}
              </h4>
            </div>
          </div>
        </div>
        <div className={styles.lineCharts}>
          <h3>Daily Sales Summary</h3>
          <LineChart
            width={730}
            height={250}
            data={dailySales}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

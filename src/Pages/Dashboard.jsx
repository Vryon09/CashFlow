import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Header from "../components/HeaderComponents/Header";
import styles from "./Dashboard.module.css";
import { useItems } from "../contexts/ItemsContext";
import { useEffect, useState } from "react";
import { productCategories } from "../InitialData/productCategories";
import { initialSalesByDay } from "../InitialData/initialSalesByDay";

function Dashboard({
  salesByDay,
  setSalesByDay,
  categoryDistribution,
  setCategoryDistribution,
}) {
  const [dailySales, setDailySales] = useState([]);
  const [paymentDistribution, setPaymentDistribution] = useState([]);

  const {
    handlePaymentMethodTotal,
    previousTransactions,
    getDayName,
    getCurrentDate,
    products,
  } = useItems();

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

  //Payment Distribution
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
  }, [previousTransactions, getCurrentDate]);

  //only 5 datas should be displayed

  //change the line chart data into total sales not amount of payment guest's paid

  //Category Distribution
  useEffect(() => {
    setCategoryDistribution(() => {
      const onlyCategories = productCategories.filter(
        (category) => category !== "All"
      );

      const catDis = onlyCategories.map((category) => {
        const distributedCategory = products
          .filter((product) => product.category === category)
          .reduce((acc, curr) => {
            acc += curr.stock - curr.currentStock;

            return acc;
          }, 0);

        return { category, sales: distributedCategory };
      });

      return catDis.filter((cat) => cat.sales !== 0);
    });
  }, [products, setCategoryDistribution]);

  const COLORS = [
    "#B821CF",
    "#8AB913",
    "#F38469",
    "#AC4F6F",
    "#5B431A",
    "#41F68C",
    "#D6CF85",
    "#B21B2A",
    "#ED113B",
    "#560957",
    "#1CB17C",
    "#B1042E",
    "#5FFE24",
    "#229751",
    "#63F284",
    "#CCBAF8",
  ];

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
            <Line type="monotone" dataKey="total" stroke="#000" />
          </LineChart>
        </div>
        <div className={styles.pieCharts}>
          <h3>Category Distribution</h3>
          <PieChart width={730} height={300}>
            <Pie
              data={categoryDistribution}
              dataKey="sales"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ category }) => category}
            >
              {categoryDistribution.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

//Reports
//save necessary datas into local storage
//auth, sign up log in logout feature

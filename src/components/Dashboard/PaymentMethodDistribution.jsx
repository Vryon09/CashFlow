import { useEffect, useState } from "react";
import { useItems } from "../../contexts/ItemsContext";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function PaymentMethodDistribution({ chartStyle, labelStyle, totalStyle }) {
  const [paymentDistribution, setPaymentDistribution] = useState([]);
  const { handlePaymentMethodTotal, previousTransactions, getCurrentDate } =
    useItems();

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

  return (
    <div className={chartStyle}>
      <h3 className={labelStyle}>Payment Method Distribution</h3>
      <BarChart
        width={400}
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
      <div className={totalStyle}>
        <h4>
          Cash: ${" "}
          {handlePaymentMethodTotal(previousTransactions).cash.toLocaleString()}
        </h4>
        <h4>
          Card: ${" "}
          {handlePaymentMethodTotal(previousTransactions).card.toLocaleString()}
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
  );
}

export default PaymentMethodDistribution;

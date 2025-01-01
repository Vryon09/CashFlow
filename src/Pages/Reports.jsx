import styles from "./Reports.module.css";
import Header from "../components/HeaderComponents/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { initialSalesByDay } from "../InitialData/initialSalesByDay";
import { useItems } from "../contexts/ItemsContext";
import { productCategories } from "../InitialData/productCategories";

function Reports({
  salesByDay,
  setSalesByDay,
  categoryDistribution,
  setCategoryDistribution,
  activeUser,
  setActiveUser,
}) {
  const [payment, setPayment] = useState([]);
  const { previousTransactions, getDayName, products } = useItems();

  useEffect(() => {
    setPayment(() => {
      const transWithCash = previousTransactions.filter((trans) =>
        trans.paymentList.some((payment) => payment.method === "Cash")
      );

      const transWithCard = previousTransactions.filter((trans) =>
        trans.paymentList.some((payment) => payment.method === "Card")
      );

      const cash = transWithCash.reduce((acc, curr) => {
        const sumCash = curr.paymentList.reduce((acc, curr) => {
          if (curr.method === "Cash") acc += curr.amount;
          return acc;
        }, 0);

        acc += sumCash;
        return acc;
      }, 0);

      const card = transWithCard.reduce((acc, curr) => {
        const sumCard = curr.paymentList.reduce((acc, curr) => {
          if (curr.method === "Card") acc += curr.amount;
          return acc;
        }, 0);

        acc += sumCard;
        return acc;
      }, 0);

      const change = previousTransactions.reduce((acc, curr) => {
        acc += curr.change;
        return acc;
      }, 0);

      const cashNum = transWithCash.length;
      const cardNum = transWithCard.length;
      return {
        cash,
        card,
        change,
        cashNum,
        cardNum,
        totalNum: cashNum + cardNum,
        total: cash + card - change,
      };
    });
  }, [previousTransactions]);

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

  const salesByDayRows = salesByDay.map((day, i) => {
    return { id: i, ...day };
  });

  const salesByDayColumns = [
    {
      field: "day",
      headerName: "Day",
      width: 200,
      // headerClassName: styles.header,
    },
    {
      field: "sales",
      headerName: "Sales (Revenue)",
      // headerClassName: styles.header,
      flex: 1,
    },
  ];

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

  const categoryDistributionRows = categoryDistribution.map((category, i) => {
    return { id: i, ...category };
  });

  const categoryDistributionColumns = [
    {
      field: "category",
      headerName: "Category",
      width: 200,
      // headerClassName: styles.header,
    },
    {
      field: "sales",
      headerName: "Sales (Unit sold)",
      flex: 1,
      // headerClassName: styles.header,
    },
  ];

  return (
    <div className={styles.container}>
      <Header activeUser={activeUser} setActiveUser={setActiveUser} />
      <div className={styles.reportsContainer}>
        <div className={styles.bottomContainer}>
          <div className={styles.paymentSummary}>
            <h3 className={styles.paymentHeader}>Payment Summary</h3>
            <div className={styles.summaries}>
              <p>Total Cash</p>
              <p>{payment.cashNum}</p>
              <p>{payment.cash?.toFixed(1)}</p>
            </div>
            <div className={styles.summaries}>
              <p>Total Card</p>
              <p>{payment.cardNum}</p>
              <p>{payment.card?.toFixed(1)}</p>
            </div>
            <div className={styles.summaries}>
              <p>Change</p>
              <p>{payment.change?.toFixed(1)}</p>
            </div>
            <div className={`${styles.summaries} ${styles.grandTotal}`}>
              <p>Grand Total</p>
              <p>{payment.totalNum}</p>
              <p>$ {payment.total?.toFixed(1)}</p>
            </div>
          </div>
        </div>
        <div className={styles.topContainer}>
          <div className={styles.topReport}>
            <DataGrid
              rows={salesByDayRows}
              columns={salesByDayColumns}
              sx={{
                border: "1px solid hsl(0, 0%, 70%)", // Outer border
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid hsl(0, 0%, 85%)", // Horizontal cell borders
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderBottom: "1px solid hsl(0, 0%, 70%)", // Border between headers and rows
                },
              }}
            />
          </div>
          <div className={styles.topReport}>
            <DataGrid
              rows={categoryDistributionRows}
              columns={categoryDistributionColumns}
              sx={{
                border: "1px solid hsl(0, 0%, 70%)", // Outer border
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid hsl(0, 0%, 85%)", // Horizontal cell borders
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderBottom: "1px solid hsl(0, 0%, 70%)", // Border between headers and rows
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;

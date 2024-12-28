import styles from "./Reports.module.css";
import Header from "../components/HeaderComponents/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { initialSalesByDay } from "../InitialData/initialSalesByDay";
import { useItems } from "../contexts/ItemsContext";
import { productCategories } from "../InitialData/productCategories";

function Reports({
  salesByDay,
  setSalesByDay,
  categoryDistribution,
  setCategoryDistribution,
}) {
  const { previousTransactions, getDayName, products } = useItems();

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
      headerClassName: styles.header,
    },
    {
      field: "sales",
      headerName: "Sales (Revenue)",
      headerClassName: styles.header,
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
      headerClassName: styles.header,
    },
    {
      field: "sales",
      headerName: "Sales (Unit sold)",
      headerClassName: styles.header,
      flex: 1,
    },
  ];

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.salesByDayContainer}>
        <div className={styles.salesByDay}>
          <DataGrid rows={salesByDayRows} columns={salesByDayColumns} />
        </div>
        <div className={styles.salesByDay}>
          <DataGrid
            rows={categoryDistributionRows}
            columns={categoryDistributionColumns}
          />
        </div>
      </div>
    </div>
  );
}

export default Reports;

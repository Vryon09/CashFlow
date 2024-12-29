import Header from "../components/HeaderComponents/Header";
import styles from "./Dashboard.module.css";
import SalesByDay from "../components/Dashboard/SalesByDay";
import CategoryDistribution from "../components/Dashboard/CategoryDistribution";
import DailySalesSummary from "../components/Dashboard/DailySalesSummary";
import PaymentMethodDistribution from "../components/Dashboard/PaymentMethodDistribution";

function Dashboard({
  salesByDay,
  setSalesByDay,
  categoryDistribution,
  setCategoryDistribution,
}) {
  //only 5 datas should be displayed
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.charts}>
        <div className={styles.topCharts}>
          <SalesByDay
            chartStyle={styles.topChart}
            labelStyle={styles.label}
            salesByDay={salesByDay}
            setSalesByDay={setSalesByDay}
          />
          <CategoryDistribution
            chartStyle={styles.topChart}
            labelStyle={styles.label}
            categoryDistribution={categoryDistribution}
            setCategoryDistribution={setCategoryDistribution}
          />
        </div>

        <div className={styles.bottomCharts}>
          <DailySalesSummary
            chartStyle={styles.topChart}
            labelStyle={styles.label}
          />
          <PaymentMethodDistribution
            chartStyle={styles.topChart}
            labelStyle={styles.label}
            totalStyle={styles.totals}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

//Reports
//save necessary datas into local storage
//auth, sign up log in logout feature

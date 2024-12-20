import Header from "../components/HeaderComponents/Header";
import InventoryContainer from "../components/Inventory/InventoryContainer";
import styles from "./Inventory.module.css";

function Inventory() {
  return (
    <div className={styles.container}>
      <Header />
      <InventoryContainer />
    </div>
  );
}

export default Inventory;

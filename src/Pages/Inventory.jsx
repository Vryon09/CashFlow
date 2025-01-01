import Header from "../components/HeaderComponents/Header";
import InventoryContainer from "../components/Inventory/InventoryContainer";
import styles from "./Inventory.module.css";

function Inventory({ activeUser }) {
  return (
    <div className={styles.container}>
      <Header activeUser={activeUser} />
      <InventoryContainer />
    </div>
  );
}

export default Inventory;

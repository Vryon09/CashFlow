import Header from "../components/HeaderComponents/Header";
import InventoryContainer from "../components/Inventory/InventoryContainer";
import styles from "./Inventory.module.css";

function Inventory({ activeUser, setActiveUser }) {
  return (
    <div className={styles.container}>
      <Header activeUser={activeUser} setActiveUser={setActiveUser} />
      <InventoryContainer />
    </div>
  );
}

export default Inventory;

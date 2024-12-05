import ItemActions from "./ItemActions";
import SaleSummary from "./SaleSummary";
import styles from "./ItemBottom.module.css";
function ItemBottom() {
  return (
    <div className={styles.itemBottom}>
      <ItemActions />
      <SaleSummary />
    </div>
  );
}

export default ItemBottom;

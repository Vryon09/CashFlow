import { useItems } from "../../contexts/ItemsContext";
import styles from "./InventoryContainer.module.css";
import InventoryItems from "./InventoryItems";

function InventoryContainer() {
  const { products } = useItems();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.name}>Name</p>
        <p className={styles.price}>Price</p>
        <p className={styles.stock}>Stock</p>
      </div>
      <ul className={styles.products}>
        {products.map((item, i) => (
          <InventoryItems item={item} i={i} />
        ))}
      </ul>
    </div>
  );
}

export default InventoryContainer;

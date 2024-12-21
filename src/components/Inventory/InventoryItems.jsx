import styles from "./InventoryItems.module.css";

function InventoryItems({ item }) {
  const level = (item.currentStock / item.stock) * 100;

  function stockLevel() {
    if (level > 0 && level < 20) return styles.critical;
    if (level >= 20 && level < 70) return styles.reorder;
    if (level >= 70 && level < 100) return styles.ideal;
    if (level === 0) return styles.out;
    if (level === 100) return styles.full;
  }

  return (
    <li className={styles.product}>
      <h2 className={styles.name}>{item.productName}</h2>

      <p className={styles.price}>$ {item.price}</p>

      <div className={`${styles.stockContainer} ${styles.stock}`}>
        <p>
          {item.currentStock} / {item.stock}
        </p>
        <progress
          className={`${styles.progress} ${stockLevel()} `}
          value={item.currentStock}
          max={item.stock}
        ></progress>
      </div>
    </li>
  );
}
export default InventoryItems;

import { useItems } from "../../contexts/ItemsContext";
import styles from "./InventoryContainer.module.css";

const color = "red";

function InventoryContainer() {
  const { products } = useItems();
  return (
    <div className={styles.container}>
      <div>
        <p>Name</p>
        <p>Price</p>
        <p>Stock</p>
      </div>
      <ul className={styles.products}>
        {products.map((item, i) => (
          <li className={styles.product} key={i}>
            <h2 className={styles.name}>{item.productName}</h2>

            <p className={styles.price}>$ {item.price}</p>

            <div className={styles.stock}>
              <p>
                {item.stock} / {item.stock}
              </p>
              <progress
                className={`${styles.progress}`}
                value={item.currentStock}
                max={item.stock}
              ></progress>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryContainer;

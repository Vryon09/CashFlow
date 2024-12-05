import { useItems } from "../../contexts/ItemsContext";
import Item from "./Item";
import styles from "./ItemList.module.css";

function ItemList() {
  const { scannedItems } = useItems();

  return (
    <div className={styles.itemList}>
      <ul className={styles.labels}>
        <li className={styles.name}>Name</li>
        <li>Price</li>
        <li>Quantity</li>
        <li>Total Price</li>
      </ul>

      <ul className={styles.scannedItems}>
        {scannedItems.map((item, i) => (
          <Item
            productName={item.productName}
            price={item.price}
            quantity={item.quantity}
            code={item.code}
            key={i}
          />
        ))}
      </ul>
    </div>
  );
}

export default ItemList;

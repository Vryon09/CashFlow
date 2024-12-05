import { useItems } from "../../contexts/ItemsContext";
import styles from "./Item.module.css";

function Item({ productName, price, quantity, code }) {
  const { dispatch, selectedItem } = useItems();

  return (
    <li onClick={() => dispatch({ type: "selectItem", payload: code })}>
      <div
        className={`${styles.description} ${
          selectedItem === code ? styles.selected : ""
        }`}
      >
        <p className={styles.name}>{productName}</p>
        <p>${price}</p>
        <p>{quantity}</p>
        <p>${price * quantity}</p>
      </div>
    </li>
  );
}

export default Item;

import ItemList from "./ItemList";
import styles from "./ItemContainer.module.css";
import ItemBottom from "./ItemBottom";

function ItemContainer() {
  return (
    <div className={styles.itemContainer}>
      <ItemList />
      <ItemBottom />
    </div>
  );
}

export default ItemContainer;

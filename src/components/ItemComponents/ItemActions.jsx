import { useItems } from "../../contexts/ItemsContext";
import styles from "./ItemActions.module.css";
function ItemActions() {
  const { dispatch, selectedItem } = useItems();

  function handleRemoveConfirmation() {
    if (selectedItem === null) return;
    dispatch({ type: "openModal", payload: "removeConfirmation" });
  }

  function handleChangeQuantity() {
    if (selectedItem === null) return;
    dispatch({ type: "openModal", payload: "quantityModal" });
  }

  return (
    <div className={styles.itemActions}>
      <button onClick={handleChangeQuantity} className={styles.change}>
        Change Quantity
      </button>
      <button onClick={handleRemoveConfirmation} className={styles.remove}>
        Remove
      </button>
    </div>
  );
}

export default ItemActions;

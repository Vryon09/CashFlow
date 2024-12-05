import { useItems } from "../../contexts/ItemsContext";
import Modal from "./Modal";
import styles from "./RemoveConfirmation.module.css";

function RemoveConfirmation() {
  const { selectedItem, dispatch } = useItems();

  function handleRemoveButton() {
    if (selectedItem === null) return;
    dispatch({ type: "removeItem" });
  }

  return (
    <Modal>
      <h2>Are you sure you want to remove this item? </h2>
      <div className={styles.buttons}>
        <button onClick={() => dispatch({ type: "closeModal" })}>No</button>
        <button onClick={handleRemoveButton}>Yes</button>
      </div>
    </Modal>
  );
}

export default RemoveConfirmation;

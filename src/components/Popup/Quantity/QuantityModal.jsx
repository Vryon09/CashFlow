import { useItems } from "../../../contexts/ItemsContext";
import Modal from "../Modal/Modal";
import styles from "./QuantityModal.module.css";

function QuantityModal({ productName }) {
  const { dispatch, quantityInput } = useItems();

  function handleInput(e) {
    dispatch({ type: "setQuantityInput", payload: e.target.value });
  }

  const haveDecimal = +quantityInput % 1;

  function handleChangeQuantity() {
    if (isNaN(+quantityInput) || +quantityInput <= 0 || haveDecimal > 0) {
      alert("Invalid quantity value!");
      dispatch({ type: "closeModal" });
      return;
    }

    dispatch({ type: "changeQuantity" });
    dispatch({ type: "closeModal" });
  }

  return (
    <Modal>
      <h3 className={styles.productName}>{productName}</h3>
      <label>Quantity: </label>
      <input
        type="numbers"
        value={quantityInput}
        onChange={handleInput}
        className={styles.input}
      />

      <div className={styles.buttons}>
        <button onClick={() => dispatch({ type: "closeModal" })}>Close</button>
        <button onClick={handleChangeQuantity}>Change</button>
      </div>
    </Modal>
  );
}

export default QuantityModal;

import { useItems } from "../../../contexts/ItemsContext";
import Modal from "../Modal";
import styles from "./Discount.module.css";
import DiscountCards from "./DiscountCards";

function Discount() {
  const { dispatch, selectedDiscount, currentDiscount } = useItems();

  function handleApply() {
    dispatch({ type: "applyDiscount", payload: currentDiscount });
    dispatch({ type: "closeModal" });
  }

  return (
    <Modal>
      <div className={styles.discountContainer}>
        <div className={styles.header}>
          <h1>Discount</h1>
        </div>
        <DiscountCards />
        <div className={styles.buttons}>
          <button
            disabled={selectedDiscount ? false : true}
            className={styles.apply}
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Discount;

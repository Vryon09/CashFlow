import { useItems } from "../../contexts/ItemsContext";
import styles from "./ActionButtons.module.css";

function ActionButtons() {
  const { dispatch, scannedItems, suspendedTransaction } = useItems();

  function handleOpenModal(modal) {
    if (scannedItems.length === 0) return;
    dispatch({ type: "openModal", payload: modal });
  }

  function handleSuspend() {
    if (scannedItems.length > 0 && suspendedTransaction.length === 0) {
      dispatch({ type: "suspendTransaction" });
      return;
    }
    dispatch({ type: "resumeTransaction" });
  }

  return (
    <div className={styles.actionButtons}>
      {/* <button>Product Search</button> */}
      <button
        onClick={() => handleOpenModal("paymentModal")}
        className={styles.pay}
      >
        Pay
      </button>
      <button
        className={styles.discount}
        onClick={() => handleOpenModal("discountModal")}
      >
        Discount
      </button>
      <button className={styles.default} onClick={handleSuspend}>
        {suspendedTransaction.length > 0 ? "Resume Transaction" : "Suspend"}
      </button>
      <button className={styles.default}>Void</button>
    </div>
  );
}

export default ActionButtons;

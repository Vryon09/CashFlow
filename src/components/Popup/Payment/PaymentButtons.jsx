import { useItems } from "../../../contexts/ItemsContext";
import styles from "./PaymentButtons.module.css";

function PaymentButtons() {
  const { dispatch, paymentInput } = useItems();

  function handleButton(method) {
    if (isNaN(+paymentInput) || paymentInput === "" || +paymentInput < 0)
      return;
    dispatch({
      type: "addPayment",
      payload: { method: method, amount: +paymentInput },
    });
  }

  return (
    <div className={styles.buttons}>
      <button onClick={() => handleButton("Cash")}>
        Cash <span>💵</span>
      </button>
      <button onClick={() => handleButton("Card")}>
        Card <span>💳</span>
      </button>
    </div>
  );
}

export default PaymentButtons;

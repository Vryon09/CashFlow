import { useItems } from "../../../contexts/ItemsContext";
import styles from "./PaymentForm.module.css";

function PaymentForm() {
  const { paymentInput, dispatch, saleTotal } = useItems();

  function handlePaymentInput(e) {
    dispatch({ type: "setPaymentInput", payload: e.target.value });
  }
  return (
    <div className={styles.form}>
      <h2>Total : ${saleTotal.toLocaleString()}</h2>
      <div className={styles.input}>
        <p>$</p>
        <input type="text" value={paymentInput} onChange={handlePaymentInput} />
      </div>
    </div>
  );
}

export default PaymentForm;

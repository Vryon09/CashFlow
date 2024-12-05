import { useItems } from "../../../contexts/ItemsContext";
import styles from "./PaymentList.module.css";

function PaymentList() {
  const { paymentList, dispatch } = useItems();

  return (
    <ul className={styles.list}>
      {paymentList.length > 0 &&
        paymentList.map((payment, i) => (
          <li key={i} className={styles.item}>
            <p className={styles.description}>{payment.method}</p>
            <p className={styles.amount}>${payment.amount}</p>
            <div className={styles.button}>
              <button
                className={styles.x}
                onClick={() => dispatch({ type: "deletePayment", payload: i })}
              >
                &times;
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default PaymentList;

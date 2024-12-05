import Modal from "../Modal";
import styles from "./Payment.module.css";
import PaymentButtons from "./PaymentButtons";
import PaymentForm from "./PaymentForm";
import Summary from "./Summary";

function Payment() {
  const paymentStyle = {
    width: "55%",
  };

  return (
    <Modal styleObject={paymentStyle}>
      <div className={styles.payment}>
        <h2>Payment</h2>
        <div className={styles.container}>
          <PaymentForm />
          <PaymentButtons />
          <Summary />
        </div>
      </div>
    </Modal>
  );
}

export default Payment;

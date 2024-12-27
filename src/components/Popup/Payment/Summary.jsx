import { useItems } from "../../../contexts/ItemsContext";
import PaymentList from "./PaymentList";
import styles from "./Summary.module.css";

function Summary() {
  const { paymentList, dispatch, saleTotal, scannedItems, products } =
    useItems();

  const paymentTotal = paymentList.reduce((acc, curr) => {
    acc += curr.amount;
    return acc;
  }, 0);

  const remaining = saleTotal - paymentTotal;

  function handleProceed() {
    const outOfStockItems = scannedItems
      .map((item) => {
        const curr = products.find((product) => product.code === item.code);

        return {
          productName: item.productName,
          itemQuantity: item.quantity,
          itemStock: curr.currentStock,
          excess: item.quantity - curr.currentStock,
        };
      })
      .filter((item) => item.excess > 0);

    if (outOfStockItems.length > 0) {
      outOfStockItems.forEach((item) =>
        alert(
          `${item.productName} currently has only ${
            item.itemStock
          } units in stock. Your order exceeds the available quantity by ${
            item.itemQuantity - item.itemStock
          }.`
        )
      );

      return;
    }

    if (remaining > 0) {
      alert("Customer payment is not enough");
      return;
    }
    // dispatch({ type: "addMethodTotal" });
    dispatch({
      type: "proceedPayment",
      payload: remaining < 0 ? Math.abs(remaining) : 0,
    });
    dispatch({ type: "updateStocks" });
    dispatch({ type: "openModal", payload: "receiptModal" });
  }

  return (
    <div className={styles.summary}>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <p className={styles.description}>Method</p>
          <p className={styles.amount}>Amount</p>
        </div>
        <PaymentList />
      </div>
      <div>
        <p>Paid: ${paymentTotal.toLocaleString()}</p>
        <p>
          {remaining < 0
            ? `Change: $${Math.abs(remaining).toLocaleString()}`
            : `Remaining: $${remaining.toLocaleString()}`}
        </p>
      </div>
      <button className={styles.button} onClick={handleProceed}>
        Proceed
      </button>
    </div>
  );
}

export default Summary;

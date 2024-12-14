import { useItems } from "../../contexts/ItemsContext";
import styles from "./SaleSummary.module.css";
function SaleSummary() {
  const { change, appliedDiscount, saleTotal, discount, vatTotal } = useItems();

  return (
    <div className={styles.saleSummary}>
      {change > 0 ? (
        <>
          <p>Change: </p> <h2>$ {change.toFixed(1)}</h2>{" "}
        </>
      ) : (
        <>
          {appliedDiscount && (
            <>
              <p>Discount:</p> <h2>-$ {discount}</h2>
            </>
          )}
          {saleTotal > 0 && (
            <>
              <p>VAT:</p>
              <h2>$ {vatTotal.toFixed(1)}</h2>
            </>
          )}
          <p>Sale Total:</p>
          <h2>$ {saleTotal.toFixed(1)}</h2>
        </>
      )}
    </div>
  );
}

export default SaleSummary;

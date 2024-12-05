import { useItems } from "../../contexts/ItemsContext";
import styles from "./SaleSummary.module.css";
function SaleSummary() {
  const { change, appliedDiscount, saleTotal, discount, rawTotal } = useItems();

  return (
    <div className={styles.saleSummary}>
      {change > 0 ? (
        <>
          <p>Change: </p> <h2>${change.toFixed(2)}</h2>{" "}
        </>
      ) : (
        <>
          {appliedDiscount && (
            <>
              <p>Discount:</p> <h2>-${discount}</h2>
            </>
          )}
          <p>Sale Total:</p>
          {appliedDiscount ? (
            <h2>
              ${rawTotal} - ${discount} = ${saleTotal}
            </h2>
          ) : (
            <h2> ${saleTotal} </h2>
          )}
        </>
      )}
    </div>
  );
}

export default SaleSummary;

import { useItems } from "../../../contexts/ItemsContext";
import styles from "./DiscountCards.module.css";

function DiscountCards() {
  const { dispatch, discounts, selectedDiscount } = useItems();

  function selectDiscount(code) {
    dispatch({ type: "selectDiscount", payload: code });
  }

  return (
    <div className={styles.discountCards}>
      {discounts.map((discount) => (
        <div
          className={`${styles.card} ${
            selectedDiscount === discount.code ? styles.selected : ""
          }`}
          onClick={() => selectDiscount(discount.code)}
          key={discount.code}
        >
          <h2>{discount.percentage}% Discount</h2>
          <p>{discount.description}</p>
        </div>
      ))}
      {/* <div className={`${styles.card}`}>
        <h2>50% Discount</h2>
        <p>For only one (1) selected item</p>
      </div> */}
    </div>
  );
}

export default DiscountCards;

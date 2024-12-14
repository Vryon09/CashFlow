import { useItems } from "../../../contexts/ItemsContext";
import Modal from "../Modal/Modal";
import styles from "./Receipt.module.css";

const style = {
  width: "35%",
};

function Receipt() {
  const { scannedItems, rawTotal, discount, vatTotal, saleTotal, dispatch } =
    useItems();

  function clear() {
    dispatch({ type: "clear" });
  }

  return (
    <Modal styleObject={style} clear={clear}>
      <div className={styles.container}>
        <h2>Payment Success</h2>
        <ul className={styles.list}>
          {scannedItems.map((item, i) => (
            <li className={styles.item} key={i}>
              <p className={styles.name}>{item.productName}</p>
              <p className={styles.qty}>{item.quantity}x</p>
              <p className={styles.price}>$ {item.price}</p>
            </li>
          ))}
        </ul>
        <div className={styles.total}>
          <h3>Total: $ {rawTotal.toFixed(1)}</h3>
          <h3>Vat: $ {vatTotal.toFixed(1)}</h3>
          {!isNaN(discount) && <h3>Discount: -$ {discount.toFixed(1)} </h3>}
          <h3>Sale Total: $ {saleTotal.toFixed(1)}</h3>
        </div>
      </div>
    </Modal>
  );
}

export default Receipt;

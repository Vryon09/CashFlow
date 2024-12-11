import { useItems } from "../../../contexts/ItemsContext";
import styles from "./VoidMain.module.css";

function VoidMain() {
  const { dispatch } = useItems();

  function handleYes() {
    dispatch({ type: "voidItems" });
    dispatch({ type: "closeModal" });
  }

  return (
    <div className={styles.voidMain}>
      <h3 className={styles.h3}>Are you sure you want to void this sale?</h3>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={handleYes}>
          Yes
        </button>
        <button
          className={styles.btn}
          onClick={() => dispatch({ type: "closeModal" })}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default VoidMain;

import { useItems } from "../../../contexts/ItemsContext";
import styles from "./VoidPermission.module.css";

function VoidPermission({ setActiveVoid }) {
  const { dispatch, supervisorCodeInput } = useItems();

  function handleInput(e) {
    dispatch({ type: "setSupervisorCode", payload: e.target.value });
  }

  function handleButton() {
    if (supervisorCodeInput === "qwerty") {
      setActiveVoid("voidMain");
    }
  }

  return (
    <div className={styles.voidPermission}>
      <label className={styles.label}>Current user: Vryon Antonio</label>
      <label className={styles.label}>Task: Void Sale (Supervisor)</label>
      <input
        type="password"
        className={styles.input}
        value={supervisorCodeInput}
        onChange={handleInput}
      />
      <button className={styles.btn} onClick={handleButton}>
        Enter
      </button>
    </div>
  );
}

export default VoidPermission;

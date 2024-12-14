import { useItems } from "../../../contexts/ItemsContext";
import styles from "./Modal.module.css";

function Modal({ children, style, styleObject, clear }) {
  const { dispatch } = useItems();

  function handleBlack() {
    clear();
    dispatch({ type: "closeModal" });
  }
  return (
    <>
      <div className={styles.black} onClick={handleBlack}></div>
      <div
        className={`${styles.modal} ${style ? style : ""} `}
        style={styleObject}
      >
        {children}
      </div>
    </>
  );
}

export default Modal;

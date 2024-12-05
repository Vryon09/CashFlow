import { useItems } from "../../contexts/ItemsContext";
import styles from "./Modal.module.css";

function Modal({ children, style, styleObject }) {
  const { dispatch } = useItems();
  return (
    <>
      <div
        className={styles.black}
        onClick={() => dispatch({ type: "closeModal" })}
      ></div>
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

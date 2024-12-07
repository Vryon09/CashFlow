import { useItems } from "../../contexts/ItemsContext";
import styles from "./SearchResult.module.css";
function SearchResult({ name, code, price }) {
  const { dispatch } = useItems();

  return (
    <li className={styles.searchResult}>
      <p className={styles.name}>{name}</p>
      <p className={styles.code}>{code}</p>
      <p className={styles.price}>${price}</p>
      <button
        onClick={() => dispatch({ type: "addItem", payload: code })}
        className={styles.add}
      >
        Add
      </button>
    </li>
  );
}

export default SearchResult;

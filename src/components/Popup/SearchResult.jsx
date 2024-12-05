import { useItems } from "../../contexts/ItemsContext";
import styles from "./SearchResult.module.css";
function SearchResult({ name, code, price }) {
  const { dispatch } = useItems();

  return (
    <li className={styles.searchResult}>
      <p className={styles.name}>{name}</p>
      <p>{code}</p>
      <p>${price}</p>
      <button onClick={() => dispatch({ type: "addItem", payload: code })}>
        Add
      </button>
    </li>
  );
}

export default SearchResult;

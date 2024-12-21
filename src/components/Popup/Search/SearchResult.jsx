import { useItems } from "../../../contexts/ItemsContext";
import styles from "./SearchResult.module.css";
function SearchResult({ item }) {
  const { dispatch } = useItems();

  const { productName: name, code, price } = item;

  function handleAdd() {
    dispatch({ type: "addItem", payload: code });
  }

  return (
    <li className={styles.searchResult}>
      <p className={styles.name}>{name}</p>
      <p className={styles.code}>{code}</p>
      <p className={styles.price}>${price}</p>
      <button onClick={handleAdd} className={styles.add}>
        Add
      </button>
    </li>
  );
}

export default SearchResult;

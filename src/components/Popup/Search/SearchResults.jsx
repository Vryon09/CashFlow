import { useItems } from "../../../contexts/ItemsContext";
import Modal from "../Modal/Modal";
import SearchResult from "./SearchResult";
import styles from "./SearchResults.module.css";

function SearchResults({ list }) {
  const { initialQuantity, dispatch } = useItems();

  function handleDec() {
    if (initialQuantity === 1) return;
    dispatch({ type: "changeInitialQuantity", payload: -1 });
  }

  return (
    <Modal closing="closeSearchModal" style={styles.searchResults}>
      <div className={styles.header}>
        <h2>Search Results:</h2>

        <div className={styles.quantity}>
          <button className={styles.btn} onClick={handleDec}>
            -
          </button>
          <p>{initialQuantity}</p>
          <button
            className={styles.btn}
            onClick={() =>
              dispatch({ type: "changeInitialQuantity", payload: 1 })
            }
          >
            +
          </button>
        </div>
      </div>

      {list.length === 0 ? (
        <p className={styles.noItems}>No items found.</p>
      ) : (
        <ul className={styles.results}>
          {list.map((item, i) => (
            <SearchResult
              name={item.productName}
              code={item.code}
              price={item.price}
              key={i}
            />
          ))}
        </ul>
      )}
    </Modal>
  );
}

export default SearchResults;

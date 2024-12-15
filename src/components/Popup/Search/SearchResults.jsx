import { useItems } from "../../../contexts/ItemsContext";
import Modal from "../Modal/Modal";
import SearchResult from "./SearchResult";
import styles from "./SearchResults.module.css";

const style = {
  padding: "1em",
  width: "70%",
  height: "90dvh",
};

function SearchResults({ list }) {
  const { initialQuantity, dispatch } = useItems();

  function handleDec() {
    if (initialQuantity === 1) return;
    dispatch({ type: "changeInitialQuantity", payload: -1 });
  }

  return (
    <Modal styleObject={style}>
      <div className={styles.container}>
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

        <div className={styles.searchResults}>
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
        </div>
      </div>
    </Modal>
  );
}

export default SearchResults;

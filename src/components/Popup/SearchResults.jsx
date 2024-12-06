import Modal from "./Modal";
import SearchResult from "./SearchResult";
import styles from "./SearchResults.module.css";

function SearchResults({ list }) {
  return (
    <Modal closing="closeSearchModal" style={styles.searchResults}>
      <div className={styles.header}>
        <h2>Search Results:</h2>

        <div className={styles.quantity}>
          <label>Quantity: </label>
          <input type="number" className={styles.quantityInput} />
        </div>
      </div>

      {list.length === 0 ? (
        <p>No items found.</p>
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

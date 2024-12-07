import Modal from "./Modal";
import SearchResult from "./SearchResult";
import styles from "./SearchResults.module.css";

function SearchResults({ list }) {
  return (
    <Modal closing="closeSearchModal" style={styles.searchResults}>
      <div className={styles.header}>
        <h2>Search Results:</h2>

        <div className={styles.quantity}>
          <button className={styles.btn}>-</button>
          <p>1</p>
          <button className={styles.btn}>+</button>
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

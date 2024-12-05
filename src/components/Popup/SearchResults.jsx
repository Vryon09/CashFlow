import { useItems } from "../../contexts/ItemsContext";
import Modal from "./Modal";
import SearchResult from "./SearchResult";
import styles from "./SearchResults.module.css";

function SearchResults() {
  const { searchResults } = useItems();

  return (
    <Modal closing="closeSearchModal" style={styles.searchResults}>
      <h2>Search Results:</h2>

      {searchResults.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul className={styles.results}>
          {searchResults.map((item, i) => (
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

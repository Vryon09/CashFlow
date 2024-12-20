import { useItems } from "../../../contexts/ItemsContext";
import Modal from "../Modal/Modal";
import SearchResult from "./SearchResult";
import styles from "./SearchResults.module.css";

const style = {
  padding: "1em",
  width: "70%",
  height: "90dvh",
};

const productCategories = [
  "All",
  "Fruits",
  "Dairy",
  "Bakery",
  "Grains",
  "Baking Supplies",
  "Beverages",
  "Spreads",
  "Snacks",
  "Pantry",
  "Meat",
  "Frozen Foods",
  "Condiments",
  "Personal Care",
  "Household",
  "Canned Goods",
  "Ready Meals",
];

function SearchResults({ list }) {
  const { initialQuantity, dispatch, selectedCategory } = useItems();

  function handleDec() {
    if (initialQuantity === 1) return;
    dispatch({ type: "changeInitialQuantity", payload: -1 });
  }

  function handleCategory(e) {
    dispatch({ type: "setSelectedCategory", payload: e.target.value });
  }

  return (
    <Modal styleObject={style}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Search Results:</h2>

          <div className={styles.right}>
            <div className={styles.filter}>
              <select value={selectedCategory} onChange={handleCategory}>
                {productCategories.map((cat, i) => (
                  <option value={cat} key={i}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

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
        <div className={styles.proceedContainer}>
          <button
            className={styles.proceed}
            onClick={() => dispatch({ type: "closeModal" })}
          >
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default SearchResults;

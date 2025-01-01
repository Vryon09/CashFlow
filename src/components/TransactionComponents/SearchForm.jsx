import styles from "./SearchForm.module.css";
import { useItems } from "../../contexts/ItemsContext";
import { useEffect } from "react";

function SearchForm() {
  const { dispatch, itemInput, selectedCategory } = useItems();

  function handleInput(e) {
    dispatch({ type: "setItemInput", payload: e.target.value });
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      dispatch({ type: "productSearch" });
      dispatch({ type: "openModal", payload: "searchModal" });
    }
  }

  useEffect(() => {
    dispatch({ type: "productSearch" });
  }, [selectedCategory, dispatch]);

  return (
    <div className={styles.searchForm} onKeyDown={handleEnter}>
      <input
        type="text"
        className={styles.itemSearchInput}
        value={itemInput}
        onChange={handleInput}
        placeholder="Search item"
      />
      <button
        className={styles.btn}
        onClick={() => {
          dispatch({ type: "productSearch" });
          dispatch({ type: "openModal", payload: "searchModal" });
        }}
      >
        Products
      </button>
    </div>
  );
}

export default SearchForm;

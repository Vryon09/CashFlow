import styles from "./SearchForm.module.css";
import { useItems } from "../../contexts/ItemsContext";

function SearchForm() {
  const { dispatch, itemInput, products } = useItems();

  function handleInput(e) {
    dispatch({ type: "setItemInput", payload: e.target.value });
  }

  function handleEnter(e) {
    const isValid = products.some(
      (item) =>
        item.productName.toLowerCase() === itemInput.toLowerCase() ||
        item.code === itemInput
    );

    if (e.key === "Enter") {
      if (itemInput === "") {
        dispatch({ type: "openModal", payload: "productsModal" });
        return;
      }

      if (!isValid) {
        dispatch({ type: "productSearch" });

        return;
      }

      dispatch({ type: "addItem" });
    }
  }

  return (
    <div className={styles.searchForm} onKeyDown={handleEnter}>
      <input
        type="text"
        className={styles.itemSearchInput}
        value={itemInput}
        onChange={handleInput}
      />
      <button
        className={styles.btn}
        onClick={() =>
          dispatch({ type: "openModal", payload: "productsModal" })
        }
      >
        Products
      </button>
    </div>
  );
}

export default SearchForm;

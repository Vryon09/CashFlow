import styles from "./SearchForm.module.css";
import { useItems } from "../../contexts/ItemsContext";

function SearchForm() {
  const { dispatch, itemInput, products } = useItems();

  function handleSubmit(e) {
    e.preventDefault();
  }

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
      if (!isValid) {
        dispatch({ type: "productSearch" });

        return;
      }
      dispatch({ type: "addItem" });
    }
  }

  return (
    <form
      className={styles.searchForm}
      onSubmit={handleSubmit}
      onKeyDown={handleEnter}
    >
      <input
        type="text"
        className={styles.itemSearchInput}
        value={itemInput}
        onChange={handleInput}
      />
    </form>
  );
}

export default SearchForm;

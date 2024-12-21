import { useEffect, useState } from "react";
import { useItems } from "../../contexts/ItemsContext";
import styles from "./InventoryContainer.module.css";
import InventoryItems from "./InventoryItems";

function InventoryContainer() {
  const { products, dispatch, inventoryInput } = useItems();
  const [inventorySearch, setInventorySearch] = useState(products);

  function handleSearch(e) {
    dispatch({ type: "setInventoryInput", payload: e.target.value });
  }

  function handleInventoryInput(inventoryInput, products) {
    const result = products.filter((item) =>
      item.productName.toLowerCase().includes(inventoryInput.toLowerCase())
    );

    return result;
  }

  useEffect(() => {
    if (inventoryInput === "") setInventorySearch(products);

    setInventorySearch(handleInventoryInput(inventoryInput, products));
  }, [inventoryInput, products]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Search Product"
          className={styles.search}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.labels}>
        <p className={styles.name}>Name</p>
        <p className={styles.price}>Price</p>
        <p className={styles.stock}>Stock</p>
      </div>
      <ul className={styles.products}>
        {inventorySearch.map((item, i) => (
          <InventoryItems item={item} key={i} />
        ))}
      </ul>
    </div>
  );
}

export default InventoryContainer;

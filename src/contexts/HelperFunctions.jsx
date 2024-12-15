import { products } from "../InitialData/products";

function addItem(state, action) {
  const selectedSearchedItem = products.find(
    (product) => product.code === action.payload
  );

  function isDuplicate(code) {
    return state.scannedItems.some((item) => item.code === code);
  }

  function updatedItem(code) {
    return state.scannedItems.map((item) =>
      item.code === code
        ? { ...item, quantity: item.quantity + state.initialQuantity }
        : item
    );
  }

  return {
    ...state,
    scannedItems: isDuplicate(action.payload)
      ? updatedItem(action.payload)
      : [
          ...state.scannedItems,
          { ...selectedSearchedItem, quantity: state.initialQuantity },
        ],
    itemInput: "",
    searchResults: [],
    openedModal: null,
    selectedItem: selectedSearchedItem.code,
    change: 0,
    selectedDiscount: null,
    appliedDiscount: null,
    initialQuantity: 1,
  };
}

function removeItem(state) {
  const filteredItems = state.scannedItems.filter(
    (item) => item.code !== state.selectedItem
  );

  function newLastItem() {
    if (
      state.selectedItem ===
      state.scannedItems[state.scannedItems.length - 1].code
    ) {
      return state.scannedItems[state.scannedItems.length - 2];
    }

    return state.scannedItems[state.scannedItems.length - 1];
  }
  return {
    ...state,
    scannedItems: filteredItems,
    selectedItem: state.scannedItems.length === 1 ? null : newLastItem().code,
    openedModal: null,
    appliedDiscount: null,
    selectedDiscount: null,
  };
}

function changeQuantity(state) {
  const updatedItems = state.scannedItems.map((item) =>
    state.selectedItem === item.code
      ? { ...item, quantity: +state.quantityInput }
      : item
  );
  return {
    ...state,
    scannedItems: updatedItems,
  };
}

function productCategorized(category) {
  if (category === "All") return products;
  const categorized = products.filter(
    (product) => category === product.category
  );
  return categorized;
}

function productSearch(state, category) {
  const result = productCategorized(category).filter((item) =>
    item.productName.toLowerCase().includes(state.itemInput.toLowerCase())
  );
  return { ...state, searchResults: result };
}

export { addItem, removeItem, changeQuantity, productSearch };

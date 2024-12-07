import { useContext, createContext, useReducer } from "react";
import { products } from "../InitialData/products";
import { initialDiscounts } from "../InitialData/initialDiscounts";

const ItemsContext = createContext();

const initialState = {
  scannedItems: [],
  itemInput: "",
  quantityInput: "",
  paymentInput: "",
  selectedItem: null,
  searchResults: [],
  paymentList: [],
  change: 0,
  selectedDiscount: null,
  appliedDiscount: null,
  discounts: initialDiscounts,
  suspendedTransaction: {},
  initialQuantity: 1,
};

function reducer(state, action) {
  const {
    scannedItems,
    itemInput,
    selectedItem,
    quantityInput,
    paymentList,
    selectedDiscount,
    appliedDiscount,
    suspendedTransaction,
    initialQuantity,
  } = state;

  const newScannedItem = products.find(
    (product) =>
      product.productName.toLowerCase() === itemInput.toLowerCase() ||
      product.code === itemInput
  );

  function addItem() {
    const selectedSearchedItem = products.find(
      (product) => product.code === action.payload
    );

    function isDuplicate(code) {
      return scannedItems.some((item) => item.code === code);
    }

    function updatedItem(code) {
      return scannedItems.map((item) =>
        item.code === code
          ? { ...item, quantity: item.quantity + initialQuantity }
          : item
      );
    }

    return {
      ...state,
      scannedItems: isDuplicate(action.payload)
        ? updatedItem(action.payload)
        : [
            ...scannedItems,
            { ...selectedSearchedItem, quantity: initialQuantity },
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

  function removeItem() {
    const filteredItems = scannedItems.filter(
      (item) => item.code !== selectedItem
    );

    function newLastItem() {
      if (selectedItem === scannedItems[scannedItems.length - 1].code) {
        return scannedItems[scannedItems.length - 2];
      }

      return scannedItems[scannedItems.length - 1];
    }
    return {
      ...state,
      scannedItems: filteredItems,
      selectedItem: scannedItems.length === 1 ? null : newLastItem().code,
      openedModal: null,
      appliedDiscount: null,
      selectedDiscount: null,
    };
  }

  function changeQuantity() {
    const updatedItems = scannedItems.map((item) =>
      selectedItem === item.code ? { ...item, quantity: +quantityInput } : item
    );
    return {
      ...state,
      scannedItems: updatedItems,
    };
  }

  function productSearch() {
    const result = products.filter((item) =>
      item.productName.toLowerCase().includes(itemInput.toLowerCase())
    );
    return { ...state, searchResults: result, openedModal: "searchModal" };
  }

  function applyDiscount(discount) {
    return { ...state, appliedDiscount: discount };
  }

  //The discount should be in the context not in the ui logic, it can't be use in other components if it is not a state

  switch (action.type) {
    case "addItem":
      return addItem();
    case "setItemInput":
      return { ...state, itemInput: action.payload };
    case "selectItem":
      return { ...state, selectedItem: action.payload };
    case "changeQuantity":
      return changeQuantity();
    case "setQuantityInput":
      return { ...state, quantityInput: action.payload };
    case "removeItem":
      return removeItem();
    case "productSearch":
      return productSearch();
    case "openModal":
      return { ...state, openedModal: action.payload }; // "quantityModal" "removeConfirmation" "paymentModal"
    case "closeModal":
      return {
        ...state,
        openedModal: null,
        quantityInput: "",
        searchResults: [],
        initialQuantity: 1,
      };
    case "setPaymentInput":
      return { ...state, paymentInput: action.payload };
    case "addPayment":
      return {
        ...state,
        paymentInput: "",
        paymentList: [
          ...paymentList,
          { method: action.payload.method, amount: action.payload.amount },
        ],
      };
    case "proceedPayment":
      return {
        ...state,
        scannedItems: [],
        change: action.payload,
        paymentList: [],
        selectedItem: null,
      };
    case "deletePayment":
      return {
        ...state,
        paymentList: paymentList.filter((_, i) => i !== action.payload),
      };
    case "selectDiscount":
      return {
        ...state,
        selectedDiscount:
          action.payload === selectedDiscount ? null : action.payload,
        appliedDiscount:
          action.payload === selectedDiscount ? null : appliedDiscount,
      };
    case "applyDiscount":
      return applyDiscount(action.payload);
    case "suspendTransaction":
      return {
        ...state,
        suspendedTransaction: { scannedItems, appliedDiscount },
        scannedItems: [],
        appliedDiscount: null,
      };
    case "resumeTransaction":
      return {
        ...state,
        suspendedTransaction: {},
        scannedItems: suspendedTransaction.scannedItems,
        appliedDiscount: suspendedTransaction.appliedDiscount,
        change: 0,
      };
    case "changeInitialQuantity":
      return {
        ...state,
        initialQuantity: initialQuantity + action.payload,
      };
    default:
      throw new Error("Unknown type");
  }
}

function ItemsProvider({ children }) {
  const [
    {
      scannedItems,
      itemInput,
      selectedItem,
      quantityInput,
      searchResults,
      openedModal,
      paymentInput,
      paymentList,
      change,
      discounts,
      selectedDiscount,
      appliedDiscount,
      suspendedTransaction,
      initialQuantity,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const selected = scannedItems.find((item) => selectedItem === item.code);

  const currentDiscount = discounts.find(
    (discount) => discount.code === selectedDiscount
  );

  const rawTotal = scannedItems.reduce((acc, curr) => {
    acc += curr.price * curr.quantity;
    return acc;
  }, 0);

  const discount =
    currentDiscount?.type === "selected"
      ? selected?.price *
        selected?.quantity *
        +`0.${appliedDiscount?.percentage}`
      : rawTotal * +`0.${appliedDiscount?.percentage}`;

  const saleTotal = discount ? rawTotal - discount : rawTotal;

  return (
    <ItemsContext.Provider
      value={{
        products,
        scannedItems,
        dispatch,
        itemInput,
        selectedItem,
        quantityInput,
        searchResults,
        openedModal,
        paymentInput,
        paymentList,
        change,
        discounts,
        selectedDiscount,
        appliedDiscount,
        saleTotal,
        discount,
        currentDiscount,
        rawTotal,
        suspendedTransaction,
        initialQuantity,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

function useItems() {
  const context = useContext(ItemsContext);
  if (context === undefined)
    throw new Error("ItemsContext is used outside the ItemsProvider.");
  return context;
}

export { ItemsProvider, useItems };

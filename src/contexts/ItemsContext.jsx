import { useContext, createContext, useReducer } from "react";
import { initialState } from "../InitialData/InitialState";
import {
  addItem,
  removeItem,
  changeQuantity,
  productSearch,
  handleStocks,
} from "./HelperFunctions";

const ItemsContext = createContext();

function reducer(state, action) {
  const {
    scannedItems,
    paymentList,
    selectedDiscount,
    appliedDiscount,
    suspendedTransaction,
    initialQuantity,
    previousTransactions,
    selectedItem,
    selectedCategory,
  } = state;

  //The discount should be in the context not in the ui logic, it can't be use in other components if it is not a state

  switch (action.type) {
    //ITEM
    case "addItem":
      return addItem(state, action);
    case "removeItem":
      return removeItem(state);
    case "setItemInput":
      return { ...state, itemInput: action.payload };
    case "selectItem":
      return { ...state, selectedItem: action.payload };
    case "changeQuantity":
      return changeQuantity(state, action);
    case "changeInitialQuantity":
      return {
        ...state,
        initialQuantity: initialQuantity + action.payload,
      };
    case "setQuantityInput":
      return { ...state, quantityInput: action.payload };
    case "productSearch":
      return productSearch(state, selectedCategory);
    //PAYMENT
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
        // scannedItems: [],
        change: action.payload,
        paymentList: [],
        // selectedItem: null,
        previousTransactions: [
          ...previousTransactions,
          { scannedItems, appliedDiscount, selectedItem },
        ],
      };
    case "deletePayment":
      return {
        ...state,
        paymentList: paymentList.filter((_, i) => i !== action.payload),
      };
    //DISCOUNT
    case "selectDiscount":
      return {
        ...state,
        selectedDiscount:
          action.payload === selectedDiscount ? null : action.payload,
        appliedDiscount:
          action.payload === selectedDiscount ? null : appliedDiscount,
      };
    case "applyDiscount":
      return { ...state, appliedDiscount: action.payload };
    //TRANSACTION
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
    //UTILITY
    case "openModal":
      return { ...state, openedModal: action.payload }; // "quantityModal" "removeConfirmation" "paymentModal"
    case "closeModal":
      return {
        ...state,
        openedModal: null,
        quantityInput: "",
        searchResults: [],
        initialQuantity: 1,
        supervisorCodeInput: "",
        selectedCategory: "All",
        itemInput: "",
      };
    case "clear":
      return { ...state, selectedItem: null, scannedItems: [] };
    case "setSupervisorCode":
      return { ...state, supervisorCodeInput: action.payload };
    case "voidItems":
      return { ...state, scannedItems: [], appliedDiscount: null };
    case "setSelectedCategory":
      return { ...state, selectedCategory: action.payload };
    case "updateStocks":
      return handleStocks(state);
    default:
      throw new Error("Unknown type");
  }
}

function ItemsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selected = state.scannedItems.find(
    (item) => state.selectedItem === item.code
  );

  const currentDiscount = state.discounts.find(
    (discount) => discount.code === state.selectedDiscount
  );

  const rawTotal = state.scannedItems.reduce((acc, curr) => {
    acc += curr.price * curr.quantity;
    return acc;
  }, 0);

  const discount =
    currentDiscount?.type === "selected"
      ? selected?.price *
        selected?.quantity *
        +`0.${state.appliedDiscount?.percentage}`
      : rawTotal * +`0.${state.appliedDiscount?.percentage}`;

  const vatTotal = rawTotal * 0.12;

  const saleTotal = discount
    ? vatTotal + rawTotal - discount
    : vatTotal + rawTotal;

  return (
    <ItemsContext.Provider
      value={{
        ...state,
        saleTotal,
        currentDiscount,
        discount,
        rawTotal,
        vatTotal,
        dispatch,
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

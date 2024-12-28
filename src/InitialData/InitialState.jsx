import { initialDiscounts } from "./initialDiscounts";
import { products } from "./products";

export const initialState = {
  // Datas
  scannedItems: JSON.parse(localStorage.getItem("scannedItems")) || [], //local storage
  previousTransactions:
    JSON.parse(localStorage.getItem("previousTransactions")) || [], //local storage
  searchResults: [],
  paymentList: [],
  suspendedTransaction:
    JSON.parse(localStorage.getItem("suspendedTransaction")) || {}, //local storage
  change: 0,

  //Selected Data
  selectedItem: null,
  selectedDiscount: null,
  appliedDiscount: null,
  openedModal: null,
  selectedCategory: "All",

  // Inputs
  itemInput: "",
  quantityInput: "",
  paymentInput: "",
  inventoryInput: "",
  supervisorCodeInput: "",

  // Utility
  products: JSON.parse(localStorage.getItem("products")) || products, //local storage
  discounts: initialDiscounts,
  initialQuantity: 1,
  supervisorCode: "qwerty",
};

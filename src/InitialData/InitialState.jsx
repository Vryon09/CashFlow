import { initialDiscounts } from "./initialDiscounts";
import { products } from "./products";

export const initialState = {
  // Datas
  scannedItems: [],
  previousTransactions: [],
  searchResults: [],
  paymentList: [],
  suspendedTransaction: {},
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
  products,
  discounts: initialDiscounts,
  initialQuantity: 1,
  supervisorCode: "qwerty",
};

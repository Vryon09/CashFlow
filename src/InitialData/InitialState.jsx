import { initialDiscounts } from "./initialDiscounts";
import { products } from "./products";

export const initialState = {
  products,
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
  openedModal: null,
  supervisorCodeInput: "",
  supervisorCode: "qwerty",
  previousTransactions: [],
  selectedCategory: "All",
};

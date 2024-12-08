import { initialDiscounts } from "./initialDiscounts";

export const initialState = {
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
};

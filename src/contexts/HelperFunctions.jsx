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
    // searchResults: [],
    // openedModal: null,
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

function handleStocks(state) {
  const updatedProducts = state.products.map((product) => {
    const curr = state.scannedItems.find((item) => item.code === product.code);

    return curr
      ? { ...product, currentStock: product.currentStock - curr.quantity }
      : product;
  });

  return { ...state, products: updatedProducts };
}

const getCurrentDate = (date = new Date()) => {
  const now = date;
  const year = now.getFullYear().toString().slice(-2); // Last 2 digits of the year
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

function handlePaymentMethodTotal(transaction) {
  const paymentMethodTotal = transaction.reduce(
    (acc, curr) => {
      const current = curr.paymentList.reduce(
        (acc, curr) => {
          if (curr.method === "Cash") acc.cash += curr.amount;
          if (curr.method === "Card") acc.card += curr.amount;

          return acc;
        },
        { cash: 0, card: 0 }
      );

      acc.date = getCurrentDate();
      acc.cash += current.cash;
      acc.card += current.card;

      return acc;
    },
    { date: "", cash: 0, card: 0 }
  );

  return paymentMethodTotal;
}

function getPaymentList(paymentList) {
  const latestPayment = paymentList.reduce(
    (acc, curr) => {
      if (curr.method === "Cash") acc.cash += curr.amount;
      if (curr.method === "Card") acc.card += curr.amount;
      return acc;
    },
    {
      date: getCurrentDate(),
      cash: 0,
      card: 0,
    }
  );

  return latestPayment;
}

function distributeCategorySales(products) {
  products.reduce(
    (acc, curr) => {
      switch (curr.category) {
        case "Fruits":
          acc.fruits += curr.stock - curr.currentStock;
          break;
        case "Dairy":
          acc.dairy += curr.stock - curr.currentStock;
          break;
        case "Bakery":
          acc.bakery += curr.stock - curr.currentStock;
          break;
        case "Grains":
          acc.grains += curr.stock - curr.currentStock;
          break;
        case "Baking Supplies":
          acc.bakingSupplies += curr.stock - curr.currentStock;
          break;
        case "Beverages":
          acc.beverages += curr.stock - curr.currentStock;
          break;
        case "Spreads":
          acc.spreads += curr.stock - curr.currentStock;
          break;
        case "Snacks":
          acc.snacks += curr.stock - curr.currentStock;
          break;
        case "Pantry":
          acc.pantry += curr.stock - curr.currentStock;
          break;
        case "Meat":
          acc.meat += curr.stock - curr.currentStock;
          break;
        case "Frozen Foods":
          acc.frozenFoods += curr.stock - curr.currentStock;
          break;
        case "Condiments":
          acc.condiments += curr.stock - curr.currentStock;
          break;
        case "Personal Care":
          acc.personalCare += curr.stock - curr.currentStock;
          break;
        case "Household":
          acc.household += curr.stock - curr.currentStock;
          break;
        case "Canned Goods":
          acc.cannedGoods += curr.stock - curr.currentStock;
          break;
        case "Ready Meals":
          acc.readyMeals += curr.stock - curr.currentStock;
          break;
        default:
          break;
      }

      return acc;
    },
    {
      fruits: 0,
      dairy: 0,
      bakery: 0,
      grains: 0,
      bakingSupplies: 0,
      beverages: 0,
      spreads: 0,
      snacks: 0,
      pantry: 0,
      meat: 0,
      frozenFoods: 0,
      condiments: 0,
      personalCare: 0,
      household: 0,
      cannedGoods: 0,
      readyMeals: 0,
    }
  );
}

function getDayName(date) {
  return date.toLocaleString("en-US", { weekday: "long" });
}

export {
  addItem,
  removeItem,
  changeQuantity,
  productSearch,
  handleStocks,
  handlePaymentMethodTotal,
  getCurrentDate,
  getPaymentList,
  distributeCategorySales,
  getDayName,
};

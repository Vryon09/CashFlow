import { useItems } from "../../contexts/ItemsContext";
import ItemContainer from "../ItemComponents/ItemContainer";
import Discount from "../Popup/Discount/Discount";
import Payment from "../Popup/Payment/Payment";
import QuantityModal from "../Popup/Quantity/QuantityModal";
import Receipt from "../Popup/Receipt/Receipt";
import RemoveConfirmation from "../Popup/Remove/RemoveConfirmation";
import SearchResults from "../Popup/Search/SearchResults";
import Void from "../Popup/Void/Void";
import TransactionControl from "../TransactionComponents/TransactionControl";
import styles from "./Workspace.module.css";

function Workspace() {
  const { selectedItem, products, openedModal, searchResults } = useItems();

  const itemSelected = products.find((item) => selectedItem === item.code);

  return (
    <div className={styles.workSpace}>
      <ItemContainer />
      <TransactionControl />
      {openedModal === "quantityModal" && (
        <QuantityModal productName={itemSelected.productName} />
      )}
      {openedModal === "searchModal" && <SearchResults list={searchResults} />}
      {openedModal === "removeConfirmation" && <RemoveConfirmation />}
      {openedModal === "paymentModal" && <Payment />}
      {openedModal === "discountModal" && <Discount />}
      {openedModal === "voidModal" && <Void />}
      {openedModal === "receiptModal" && <Receipt />}
    </div>
  );
}

export default Workspace;

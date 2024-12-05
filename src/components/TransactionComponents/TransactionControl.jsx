import ActionButtons from "./ActionButtons";
import SearchForm from "./SearchForm";
import styles from "./TransactionControl.module.css";

function TransactionControl() {
  return (
    <div className={styles.transactionControl}>
      <SearchForm />
      <ActionButtons />
    </div>
  );
}

export default TransactionControl;

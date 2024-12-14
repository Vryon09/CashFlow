import { NavLink } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <NavLink className={styles.logo} to="/">
      <h1>CashFlow</h1>
    </NavLink>
  );
}

export default Logo;

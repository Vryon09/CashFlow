import Logo from "./Logo";
import UserProfile from "./UserProfile";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
function Header({ activeUser }) {
  return (
    <div className={styles.header}>
      <Logo />
      <ul className={styles.menus}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/Dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/Inventory">Inventory</NavLink>
        </li>
        <li>
          <NavLink to="/Reports">Reports</NavLink>
        </li>
      </ul>
      <UserProfile activeUser={activeUser} />
    </div>
  );
}

export default Header;

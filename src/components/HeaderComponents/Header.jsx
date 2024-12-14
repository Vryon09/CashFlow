import Logo from "./Logo";
import UserProfile from "./UserProfile";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <div>
        <ul className={styles.menus}>
          <li>
            <NavLink to="/Dashboard">Dashboard</NavLink>
          </li>
        </ul>
      </div>
      <UserProfile />
    </div>
  );
}

export default Header;

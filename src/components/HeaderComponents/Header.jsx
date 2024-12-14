import Logo from "./Logo";
import UserProfile from "./UserProfile";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <div>
        <ul>
          <NavLink to="/Dashboard">Dashboard</NavLink>
        </ul>
      </div>
      <UserProfile />
    </div>
  );
}

export default Header;

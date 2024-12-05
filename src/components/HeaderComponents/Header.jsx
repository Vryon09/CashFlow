import Logo from "./Logo";
import UserProfile from "./UserProfile";
import styles from "./Header.module.css";
function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <UserProfile />
    </div>
  );
}

export default Header;

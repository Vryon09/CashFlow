import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";

function UserProfile({ activeUser, setActiveUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    setActiveUser("");
  }

  return (
    <div className={styles.container}>
      <p>User: {activeUser}</p>
      <button className={styles.logout} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default UserProfile;

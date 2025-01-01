import styles from "./UserProfile.module.css";

function UserProfile({ activeUser }) {
  return (
    <div className={styles.container}>
      <p>User: {activeUser}</p>
    </div>
  );
}

export default UserProfile;

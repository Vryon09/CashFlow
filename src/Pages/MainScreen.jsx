import styles from "./MainScreen.module.css";
import Header from "../components/HeaderComponents/Header";
import Workspace from "../components/Workspace/Workspace";

function MainScreen({ activeUser }) {
  return (
    <div className={styles.container}>
      <Header activeUser={activeUser} />
      <Workspace />
    </div>
  );
}

export default MainScreen;

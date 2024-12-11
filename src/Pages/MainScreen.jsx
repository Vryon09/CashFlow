import styles from "./MainScreen.module.css";
import Header from "../components/HeaderComponents/Header";
import Workspace from "../components/Workspace/Workspace";

function MainScreen() {
  return (
    <div className={styles.container}>
      <Header />
      <Workspace />
    </div>
  );
}

export default MainScreen;

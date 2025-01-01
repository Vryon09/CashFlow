import { useEffect, useState } from "react";
import styles from "./AuthPage.module.css";

function AuthPage({ setActiveUser }) {
  const [userInput, setUserInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [accounts, setAccounts] = useState(function () {
    return (
      JSON.parse(localStorage.getItem("accounts")) || [
        { userName: "vryon", code: "eyey" },
        { userName: "eyey", code: "vryon" },
      ]
    );
  });
  const [activeAction, setActiveAction] = useState("login");

  function handleUserInput(e) {
    setUserInput(e.target.value);
  }

  function handleCodeInput(e) {
    setCodeInput(e.target.value);
  }

  function handleClear() {
    setUserInput("");
    setCodeInput("");
  }

  function handleSubmit() {
    if (activeAction === "login") {
      const loggingAccount = accounts.find(
        (acc) => acc.userName === userInput && acc.code === codeInput
      );

      if (loggingAccount) {
        setActiveUser(loggingAccount.userName);
        return;
      }

      setErrorMsg("No account found.");
      handleClear();
    }

    if (activeAction === "signup") {
      const isDuplicate = accounts.some((acc) => acc.userName === userInput);

      if (isDuplicate) {
        setErrorMsg("The username you entered has already been taken.");
        handleClear();
        return;
      }

      if (userInput.length < 3 || codeInput.length < 3) {
        setErrorMsg(
          "User name and code should have atleast 3 or more characters."
        );
        return;
      }

      setAccounts((accs) => [
        ...accs,
        { userName: userInput, code: codeInput },
      ]);
      handleClear();
    }
  }

  function handleToggleAction() {
    if (activeAction === "login") setActiveAction("signup");
    if (activeAction === "signup") setActiveAction("login");

    handleClear();
    setErrorMsg("");
  }

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  return (
    <div className={styles.container}>
      <div className={styles.authContainer}>
        <div className={styles.header}>
          <h1 className={styles.logo}>CashFlow</h1>
          <p className={styles.logop}>Point of Sale System</p>
        </div>
        <div className={styles.inputs}>
          <label>User</label>
          <input type="text" value={userInput} onChange={handleUserInput} />
          <label>Code</label>
          <input type="password" value={codeInput} onChange={handleCodeInput} />
          {errorMsg && <p>{errorMsg}</p>}
        </div>
        <div className={styles.buttons}>
          <button onClick={handleToggleAction}>
            {activeAction === "login" ? "Doesn't" : "Already"} have an account?
          </button>
          <button onClick={handleSubmit}>
            {activeAction === "login" ? "Log in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

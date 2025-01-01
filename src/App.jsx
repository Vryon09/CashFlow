import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ItemsProvider } from "./contexts/ItemsContext";
import MainScreen from "./Pages/MainScreen";
import Dashboard from "./Pages/Dashboard";
import Inventory from "./Pages/Inventory";
import Reports from "./Pages/Reports";
import { useEffect, useState } from "react";
import AuthPage from "./Pages/AuthPage";

function App() {
  const [salesByDay, setSalesByDay] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  const [activeUser, setActiveUser] = useState(function () {
    return JSON.parse(localStorage.getItem("posActiveUser")) || "";
  });

  useEffect(() => {
    localStorage.setItem("posActiveUser", JSON.stringify(activeUser));
  }, [activeUser]);

  return (
    <div>
      <ItemsProvider>
        <BrowserRouter basename="/CashFlow/">
          <Routes>
            <Route
              index={activeUser}
              element={
                <MainScreen
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                />
              }
            />
            <Route
              index={!activeUser}
              element={<AuthPage setActiveUser={setActiveUser} />}
            />
            <Route
              path="/Dashboard"
              element={
                <Dashboard
                  salesByDay={salesByDay}
                  setSalesByDay={setSalesByDay}
                  categoryDistribution={categoryDistribution}
                  setCategoryDistribution={setCategoryDistribution}
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                />
              }
            />
            <Route
              path="/Inventory"
              element={
                <Inventory
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                />
              }
            />
            <Route
              path="/Reports"
              element={
                <Reports
                  salesByDay={salesByDay}
                  setSalesByDay={setSalesByDay}
                  categoryDistribution={categoryDistribution}
                  setCategoryDistribution={setCategoryDistribution}
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </ItemsProvider>
    </div>
  );
}

export default App;

//uninstall eslint and the install again eslint and other necessary things.

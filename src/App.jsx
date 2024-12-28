import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ItemsProvider } from "./contexts/ItemsContext";
import MainScreen from "./Pages/MainScreen";
import Dashboard from "./Pages/Dashboard";
import Inventory from "./Pages/Inventory";
import Reports from "./Pages/Reports";
import { useState } from "react";

function App() {
  const [salesByDay, setSalesByDay] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState([]);

  return (
    <div>
      <ItemsProvider>
        <BrowserRouter basename="/CashFlow/">
          <Routes>
            <Route index element={<MainScreen />} />
            <Route
              path="/Dashboard"
              element={
                <Dashboard
                  salesByDay={salesByDay}
                  setSalesByDay={setSalesByDay}
                  categoryDistribution={categoryDistribution}
                  setCategoryDistribution={setCategoryDistribution}
                />
              }
            />
            <Route path="/Inventory" element={<Inventory />} />
            <Route
              path="/Reports"
              element={
                <Reports
                  salesByDay={salesByDay}
                  setSalesByDay={setSalesByDay}
                  categoryDistribution={categoryDistribution}
                  setCategoryDistribution={setCategoryDistribution}
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

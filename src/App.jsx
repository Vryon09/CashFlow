import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScreen from "./Pages/MainScreen";
import { ItemsProvider } from "./contexts/ItemsContext";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div>
      <ItemsProvider>
        <BrowserRouter basename="/CashFlow/">
          <Routes>
            <Route index element={<MainScreen />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ItemsProvider>
    </div>
  );
}

export default App;

//uninstall eslint and the install again eslint and other necessary things.

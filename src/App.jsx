import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScreen from "./Pages/MainScreen";
import { ItemsProvider } from "./contexts/ItemsContext";

function App() {
  return (
    <div>
      <ItemsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainScreen />} />
          </Routes>
        </BrowserRouter>
      </ItemsProvider>
    </div>
  );
}

export default App;

//uninstall eslint and the install again eslint and other necessary things.

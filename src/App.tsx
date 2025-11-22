import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import ImportFarmPage from "./pages/ImportFarmPage";

function App() {
  
  return (
    <BrowserRouter>
      <NavBar />

      <main style={{ paddingTop: "120px" }}>
        <Routes>
          <Route path="*" element={<div>Home Page</div>} />
          <Route path="/map" element={<div>Map Page</div>} />
          <Route path="/import-farm" element={<ImportFarmPage/> } />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

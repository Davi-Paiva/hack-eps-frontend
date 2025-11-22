import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import ImportFarmPage from "./pages/ImportFarmPage";
import ImportSlaughterHousePage from "./pages/ImportSlaughterHousePage";

function App() {
  
  return (
    <BrowserRouter>
      <NavBar />

      <main style={{ paddingTop: "120px" }}>
        <Routes>
          <Route path="*" element={<div>Home Page</div>} />
          <Route path="/map" element={<div>Map Page</div>} />
          <Route path="/import-farm" element={<ImportFarmPage/> } />
          <Route path="/import-slaughterhouse" element={<ImportSlaughterHousePage/> } />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

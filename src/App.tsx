import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import ImportFarmPage from "./pages/ImportFarmPage";
import ImportSlaughterHousePage from "./pages/ImportSlaughterHousePage";
import MapPage from './pages/MapPage/MapPage'

function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />

        <main style={{ paddingTop: "120px" }}>
          <Routes>
            <Route path="*" element={<div>Home Page</div>} />
            <Route path="/map" element={<MapPage/>} />
            <Route path="/import-farm" element={<ImportFarmPage/> } />
            <Route path="/import-slaughterhouse" element={<ImportSlaughterHousePage/> } />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

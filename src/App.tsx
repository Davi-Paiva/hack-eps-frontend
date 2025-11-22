import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import MapPage from './pages/MapPage/MapPage'
import SimulationPage from './pages/SimulationPage/SimulationPage'
import SimulationMapPage from './pages/SimulationMapPage/SimulationMapPage'

function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />

        <main className="main-content">
          <Routes>
            <Route path="*" element={<div>Home Page</div>} />
            <Route path="/map" element={<MapPage/>} />
            <Route path="/simulation" element={<SimulationPage/>} />
            <Route path="/simulation-map" element={<SimulationMapPage/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

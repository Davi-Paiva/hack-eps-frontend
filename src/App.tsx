import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import MapPage from './pages/MapPage/MapPage'
import FarmsPage from './pages/FarmsPage/FarmsPage'
import SlaughterhousesPage from './pages/SlaughterhousesPage/SlaughterhousesPage'
import SimulationPage from './pages/SimulationPage/SimulationPage'
import SimulationMapPage from './pages/SimulationMapPage/SimulationMapPage'
import StartSimulationPage from "./pages/StartSimulationPage/StartSimulationPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />

        <main className="main-content">
          <Routes>
            
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage/>} />
            <Route path="/farms" element={<FarmsPage/>} />
            <Route path="/slaughterhouses" element={<SlaughterhousesPage/>} />
            <Route path="/start-simulation" element={<StartSimulationPage/>} />
            <Route path="/simulation" element={<SimulationPage/>} />
            <Route path="/simulation-map" element={<SimulationMapPage/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

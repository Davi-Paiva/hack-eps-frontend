import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import MapPage from './pages/MapPage/MapPage'
import TablesPage from './pages/TablesPage/TablesPage'
import FarmsPage from './pages/FarmsPage/FarmsPage'
import SlaughterhousesPage from './pages/SlaughterhousesPage/SlaughterhousesPage'

function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />

        <main className="main-content">
          <Routes>
            <Route path="*" element={<div>Home Page</div>} />
            <Route path="/map" element={<MapPage/>} />
            <Route path="/tables" element={<TablesPage/>} />
            <Route path="/farms" element={<FarmsPage/>} />
            <Route path="/slaughterhouses" element={<SlaughterhousesPage/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import MapPage from './pages/MapPage/MapPage'

function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />

        <main className="main-content">
          <Routes>
            <Route path="*" element={<div>Home Page</div>} />
            <Route path="/map" element={<MapPage/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

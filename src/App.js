import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import FishLayout from "./components/fish-layout/FishLayout";
import Bugs from "./components/bugs/Bugs";
import Fossils from "./components/fossils/Fossils";
import Villagers from "./components/villagers/Villagers";
import Art from "./components/art/Art";
import Creatures from "./components/creatures/Creatures";
import Profile from "./components/Dashboard/Profile";
import Settings from "./components/Dashboard/Settings";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fish" element={<FishLayout />} />
        <Route path="/bugs" element={<Bugs />} />
        <Route path="/fossils" element={<Fossils />} />
        <Route path="/villagers" element={<Villagers />} />
        <Route path="/art" element={<Art />} />
        <Route path="/creatures" element={<Creatures />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>
    </div>
  );
}

export default App;

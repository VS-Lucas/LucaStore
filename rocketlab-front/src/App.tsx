import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { useContext } from "react";
import { BadgeContext } from "./context/BadgeContext";


function App() {
  const { badge } = useContext(BadgeContext);
  
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
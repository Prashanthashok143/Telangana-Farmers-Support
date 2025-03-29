import React from "react";
import NavScroll from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCrop from "./components/AddCrop"
import "./App.css";
import Schemes from "./components/Schemes"
import Crops from "./components/Crops";
import MarketPrices from "./components/MarketPrices";
import Signin from "./components/Signin";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <NavScroll />
        <div className="content"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schemes" element={<Schemes/>} />
            <Route path="/addCrop" element={<AddCrop />} />
            <Route path="/crops" element={<Crops/>} />
            <Route path="/marketPrices" element={<MarketPrices/>}/>
            <Route path="/signin" element={<Signin/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

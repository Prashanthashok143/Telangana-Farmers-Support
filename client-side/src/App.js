import React, { createContext, useState } from "react";
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
import SignUp from "./components/Register";


export const AuthProvider=createContext(null);
const App = () => {
  const token=localStorage.getItem("token") !==null;
  const[authenticate,setAuthenticate] =useState(token ?? false);
  const auth={authenticate,setAuthenticate};
  return (
    <AuthProvider.Provider value={auth}>
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
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
    </AuthProvider.Provider>

  );
};

export default App;

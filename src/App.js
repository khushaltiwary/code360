import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSc from "./components/LoginSc";
import HomeSc from "./components/HomeSc";
import SplashSc from "./components/SplashSc";

function App() {

 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashSc />} />
        <Route path="/login" element={<LoginSc />} />
        <Route path="/home" element={<HomeSc />} />
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSc from "./components/LoginSc";
import HomeSc from "./components/HomeSc";
import SplashSc from "./components/SplashSc";
import TestCaseSc from "./components/TestCaseSc";
import DocSc from "./components/DocSc";
import ReviewSc from "./components/ReviewSc";
import EnhanceSc from "./components/EnhanceSc";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashSc />} />
        <Route path="/login" element={<LoginSc />} />
        <Route path="/home" element={<HomeSc />} />
        <Route path="/testcase" element={<TestCaseSc />} />
        <Route path="/doc" element={<DocSc />} />
        <Route path="/review" element={<ReviewSc />} />
        <Route path="/enhance" element={<EnhanceSc />} />
      </Routes>
    </Router>
  );
}

export default App;

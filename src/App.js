import "./App.css";
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import LoginSc from "./components/LoginSc";
import HomeSc from "./components/HomeSc";
import SplashSc from "./components/SplashSc";

function App() {

  const [isSplash, setIsSplash] = useState(true);

  const handleSplashFinish = () => {
    setIsSplash(false); // After splash screen finishes, load the Login screen
  };

  return (
    <Router>
    <Routes>
      {/* Route for Splash Screen */}
      <Route path="/" element={isSplash ? <SplashSc onFinish={handleSplashFinish} /> : <LoginSc />} />
      {/* You can add more routes here as needed */}
      <Route path="/home" element={<HomeSc />} />
    </Routes>
  </Router>
  );
}

export default App;

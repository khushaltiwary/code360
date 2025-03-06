import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSc from "./components/LoginSc";
import HomeSc from "./components/HomeSc";
import SplashSc from "./components/SplashSc";
import DownloadSc from "./components/DownloadSc";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashSc />} />
        <Route path="/login" element={<LoginSc />} />
        <Route path="/home" element={<HomeSc />} />
        <Route path="/download" element={<DownloadSc />} />
      </Routes>
    </Router>
  );
}

export default App;

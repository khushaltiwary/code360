import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSc from "./components/LoginSc";
import HomeSc from "./components/HomeSc";
import SplashSc from "./components/SplashSc";
import DownloadSc from "./components/DownloadSc";
import UpcomingFeatures from "./components/UpcomingFeatures";
import WhiteboardSc from "./components/WhiteboardSc";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SplashSc />} /> {/* Initial splash screen */}
       <Route path="/home" element={
          <WhiteboardSc>
            <HomeSc />
          </WhiteboardSc>
        } />

       <Route path="/download" element={
          <WhiteboardSc>
            <DownloadSc />
          </WhiteboardSc>
        } />
        <Route path="/UpcomingFeatures" element={
          <WhiteboardSc>
            <UpcomingFeatures />
          </WhiteboardSc>
        } />
        
        <Route path="/login" element={<LoginSc /> } />
        <Route path="/upcomingFeatures" element={<UpcomingFeatures />} />
        
      </Routes>
    </Router>
  );
}

export default App;

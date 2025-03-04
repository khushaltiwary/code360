import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import LoginSc from "./components/LoginSc";
import HomeSc from "./components/HomeSc";

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<HomeSc />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

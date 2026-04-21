import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home      from "./pages/Home";
import Login     from "./pages/Login";
import Register  from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin     from "./pages/Admin";
import Donors    from "./pages/Donors";
import Requests  from "./pages/Requests"; 
import LoadingScreen from "./components/LoadingScreen";    

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"          element={<Home />}      />
        <Route path="/login"     element={<Login />}     />
        <Route path="/register"  element={<Register />}  />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin"     element={<Admin />}     />
        <Route path="/donors"    element={<Donors />}    />
        <Route path="/requests"  element={<Requests />}  />  {/* */}
      </Routes>
    </Router>
  );
}

export default App;
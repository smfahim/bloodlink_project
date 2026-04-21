import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home          from "./pages/Home";
import Login         from "./pages/Login";
import Register      from "./pages/Register";
import Dashboard     from "./pages/Dashboard";
import Admin         from "./pages/Admin";
import Donors        from "./pages/Donors";
import Requests      from "./pages/Requests";
import About         from "./pages/About";         
import Contact       from "./pages/Contact";       
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <LoadingScreen onFinish={() => setLoading(false)} />
      )}

      {!loading && (
        <Router>
          <Routes>
            <Route path="/"          element={<Home />}      />
            <Route path="/login"     element={<Login />}     />
            <Route path="/register"  element={<Register />}  />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin"     element={<Admin />}     />
            <Route path="/donors"    element={<Donors />}    />
            <Route path="/requests"  element={<Requests />}  />
            <Route path="/about"     element={<About />}     />  {}
            <Route path="/contact"   element={<Contact />}   />  {}
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
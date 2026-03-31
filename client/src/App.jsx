import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/dashboard";
import RedirectIfAuth from "./pages/RedirectIfAuth";
import RequireAuth from "./pages/RequireAuth";

function App() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Routes>
      <Route path="/register" element={<RedirectIfAuth><Register /></RedirectIfAuth>}/>
      <Route path="/login" element={<RedirectIfAuth><Login /></RedirectIfAuth>}/>
      <Route path="/" element={<RequireAuth><Main onLogout={logout} /></RequireAuth>}/>
    </Routes>
  );
}

export default App;
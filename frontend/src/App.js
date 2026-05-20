import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Abrigos from "./pages/Abrigos";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/abrigos" element={<PrivateRoute><Abrigos /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
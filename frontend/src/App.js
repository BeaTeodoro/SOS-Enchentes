import { BrowserRouter, Route, Routes } from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}

function Login() {
  return <h1>Login</h1>;
}

function Abrigos() {
  return <h1>Abrigos</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/abrigos" element={<Abrigos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
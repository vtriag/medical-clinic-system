import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Cta";
// import Login from "./components/Login";
import Triagem from "./components/triagem";
import LoginMedico from "./components/LoginMedico";
import CriarPaciente from './components/criarPaciente'


// Layout da Home (landing page) com todas as seções
function HomePage() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}

// Layout do Login (pode ter Header/Footer se quiser, ou não)
function LoginPage() {
  return (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial / landing page */}
        <Route path="/" element={<HomePage />} />
         
<Route path="/triagem" element={<Triagem />} />
 <Route path="/criar-paciente" element={<CriarPaciente />} /> {/* nova rota */}
        {/* Página de login */}
       <Route path="/login" element={<LoginMedico />} />

        {/* Redireciona qualquer URL desconhecida para a Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

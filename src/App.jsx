import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./pages/Home";
import LoginScreen from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import jwtDecode  from "jwt-decode";
import UserRouter from "./routers/UserRouter";
import AdminRouter from "./routers/AdminRouter";
import NotFound from "./pages/NotFound";
import RegisterScreen from "./pages/Register";
import LoginRegister from "./pages/LoginRegister";
import Footer from "./components/Footer";


// import NavBar from "./components/NavBar"

function App() {
  const [jwt, setJwt] = useState(localStorage.getItem("token") || "")
  const [isAdmin, setIsAdmin] = useState(false)

  const verifyEmployee = () => {
    try {
      const decodedToken = jwtDecode(jwt)
      setIsAdmin(decodedToken.esEmpleado)
      console.log("Se inicio sesion", decodedToken.username)
    } catch (error) {
      console.log("Error decoding JWT:", error)
    }
  }

  const changeJwt = (value) => {
    setJwt(value)
    localStorage.setItem("token", value)
  }

  useEffect(() => {
    verifyEmployee()
  }, [jwt])

  return (
    <>
      <BrowserRouter>
        <Header authenticated={!!jwt} isAdmin={isAdmin} changeJwt={changeJwt} />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/loginRegister" element={<LoginRegister  changeJwt={changeJwt}/>} />
          <Route path="/login" element={<LoginScreen changeJwt={changeJwt} />} />
          <Route path="/registro" element={<RegisterScreen />} />
          <Route path="/user/*" element={<UserRouter show={!!jwt} />} />
          <Route path="/admin/*" element={<AdminRouter show={!!jwt && isAdmin === true} jwt={jwt} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App

import "./App.css";
import Home from "./pages/Home";
import "./assets/home.css";
import Login from "./pages/Login";
import "./assets/login.css";
import Register from "./pages/Register";
import "./assets/register.css";
import Contact from "./pages/Contact";
import "./assets/contact.css";
import About from "./pages/About";
import "./assets/about.css";
import UserList from "./pages/UserList";
import Mails from "./pages/Mails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import NavigationBar from "./pages/NavigationBar";

function App() {

  const [userLoginData, setUserLoginData] = useState(null);

  useEffect(() => {
    const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
    if (loginData) {
      setUserLoginData(loginData);
    } else {
      setUserLoginData(null)
    }
    return () => { setUserLoginData(null) }
  }, [])

  return (
    <BrowserRouter>
      <NavigationBar userLoginData={userLoginData} setUserLoginData={setUserLoginData} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login setUserLoginData={setUserLoginData} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/about" element={<About />} />
        <Route path="/mail" element={<Mails userLoginData={userLoginData} />} />   {/*props.userLoginData*/}
      </Routes>
    </BrowserRouter>
  );
}


export default App;



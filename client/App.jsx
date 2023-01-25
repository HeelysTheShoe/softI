import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import { useSelector } from "react-redux";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx"
import "./styles.css";

function App() {
  //link to state global
  //access to is logged in

  //useSelector: mapsToProps equivalent - takes in a function argument that returns the part of the state you want
  //passes down state properties as props
  const loginStatus = useSelector((state) => state.question.isLoggedIn);

  return (
    <div id='main'>
      <Routes>
        {/* //default route is the login screen */}
        <Route path='/' element={<Login />} />
        {/* after authenticated, we can route to home */}
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element = {<Signup/>}/>
      </Routes>
      {/* <p>Login Status: {String(loginStatus)}</p> */}
      {/* {loginStatus ? <Home /> : <Login />} */}
    </div>
  );
}

export default App;

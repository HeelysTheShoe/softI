import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../redux/questionSlice";
import logo from "../img/logo.png";
import "../styles.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: ''
  }); 

  const userSetter = (event) => {
    const { value, name } = event.target; 
    setUser(Object.assign(user, {[name]: value}));
    console.log(user);
  };

  const verifyUser = (e) => {
    e.preventDefault(); 
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON', 
        },
        body: JSON.stringify(user)
      })
        .then((data)=>data.json())
        .then((data)=>{
            if (data.loggedIn === true){
              return navigate('/home');
            }else{
                alert("Wrong username or password. Please try again.")
            }
        })
      }

  return (
    <div className='login'>
      <div className='loginBox'>
        <h1>
          <img id='logo' src={logo}></img>
          Softi
        </h1>
        <form id='loginForm' method = 'post'>
          <input
            type='text'
            name = 'username'
            className='userInfo'
            placeholder='Username'
            onChange = {(event) => {userSetter(event)}}
            required></input>
          <input
            type='password'
            name = 'password'
            className='userInfo'
            placeholder='Password'
            onChange = {(event) => {userSetter(event)}}
            required></input>
            <button className='login-btn' onClick={(e) => {verifyUser(e)}}>
              Login
            </button>
        </form>
        <Link to='/signup'> <p style = {{color: 'white'}}>Don't have an account? Sign up here</p> </Link>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../img/logo.png";
import "../styles.css";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: ''
  }); 

  const userSetter = (event) => {
    const { value, name } = event.target; 
    setUser(Object.assign(user, {[name]: value}));
  };

  const createUser = (e) => {
    e.preventDefault(); 
    //http://localhost:3000/usersignup
    fetch('http://localhost:3000/usersignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify(user)
      })
        .then((data)=>data.json())
        .then((data)=>{
            if (data.userCreated === true){
              console.log('inside userCreated if');
              navigate('/');
            } else{
              alert("Error signing up. Please try again")
            }
        })
      }

  return (
    <div className='login'>
      <div className='loginBox'>
        <h1>
          <img id='logo' src={logo}></img>
          Signup with Softi
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
            <button className='login-btn' onClick={(e) => {
              createUser(e);
            }
              }>
             Signup
            </button>
        </form>
      </div>
    </div>
  );
}
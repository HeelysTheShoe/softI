import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../redux/questionSlice";

export default function UserPage(){
    const username = useSelector(state => state.user);
    console.log(username);
    <h1> {`Welcome ${username}`} </h1>
}

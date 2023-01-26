import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../redux/questionSlice";
import MySessions from './MySessions';

export default function UserPage(){
    const username = localStorage.getItem('username')
    return(
        <>
        <h1>Welcome {username}</h1>
        <MySessions/>
        </>
    )
}

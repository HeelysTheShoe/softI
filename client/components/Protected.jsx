import React from "react";
import {Routes, Route, Link, Navigate} from 'react-router-dom'
import { useSelector } from "react-redux";

export default function Protected({children}){
    const {isLoggedIn} = useSelector((state) => state.question); 
    if (!isLoggedIn){
        return <Navigate to= '/' replace/>
    }
    return children;
};
import React, { Component } from 'react';
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from './QuestionBox';
import { startSession } from '../redux/questionSlice';
import MySessions from './MySessions';
import '../styles.css';

export default function Home() {
  const dispatch = useDispatch();
  // const username = localStorage.getItem('username');
  const {username} = useSelector((state) => state.question.user);
  console.log(username)
  const sessionStatus = useSelector((state) => state.question.isSessionStarted);
  return (
    <div id="home">
      {sessionStatus ? <QuestionBox /> : <>
      <div>
        <h1> Welcome {username}</h1>
        <h1>Press "Start" to begin interview session.</h1>
        <button className="start-btn" onClick={() => dispatch(startSession())}>Start</button>
        <div>
        <MySessions />
        </div>
        </div>
      </>}


    </div>
  )
}


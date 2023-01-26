import { createSlice } from "@reduxjs/toolkit";

//reducers: functions that take the current state and an action as arguments, and return a new state

//Stretch feature: question bank from API
const initialState = {
  questions: [
    "Tell me about yourself?",
    "What made you decide to get into tech?",
    "Have you ever had a project that had to change drastically while it was in progress? Tell me about it?",
    "Tell me about a major setback you’ve had, and how you handled it?",
    "Talk about a time where you had to make an important decision quickly?",
    "Have you ever had a deadline you were not able to meet, and how did you handle it?",
    "Talk about a time when you had to adapt to significant changes at work?",
    "Have you ever had to convince your team to do a job they were reluctant to do?",
    "Dicuss any positive contributions you've made to your previous organization, be as specific as possible with real world examples.",
  ],
  questionSet: [],
  isLoggedIn: false,
  isSessionStarted: false,
  user: {},
  currentQuestion: 0
};
//createSlice is a function that accepts an initialState (currently the array of int questions), 
//an object of reducer functions (changes the state), and a 'slice name'
//automatically generates action creators and action types (new standard approach from the switch statements used in Redux unit)
export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user.username = action.payload; 
      state.isLoggedIn = true;
      console.log('inside redux', state.user.username)
    },
    startSession: (state) => {
      state.isSessionStarted = true;
      state.questionSet = pickQuestion(state.questions);
    },
    nextQuestion: (state) => {
      state.currentQuestion++;
    },
    endSession: (state) => {
      state.questionSet = [];
      state.currentQuestion = 0;
      state.isSessionStarted = false;
    }
  },
});


export function pickQuestion(allQuestions) {
  let set = [];
  if (allQuestions.length < 3) return "not enough questions stored";
  for (let i = 0; i <= 2; i++) {
    const random = Math.floor(Math.random() * allQuestions.length);
    set.push(allQuestions[random]);
    allQuestions.splice(random, 1);
  }
  return set;
}

export const { display, userLogin, startSession, nextQuestion, endSession } = questionSlice.actions;

export default questionSlice.reducer;

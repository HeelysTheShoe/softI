import reducer from "../client/redux/questionSlice";
import { display, userLogin, startSession, nextQuestion, endSession } from "../client/redux/questionSlice";
import { pickQuestion } from "../client/redux/questionSlice"

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
}

//tests start

describe('Testing redux reducers', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState)
  })

  test('should change isLoggedIn in state when a userLogin dispatch is triggered', () => {
    expect(reducer(initialState, userLogin(''))).toEqual({ ...initialState, isLoggedIn: true })
  })

  test('should start session & return a random question when startSession dispatch is triggered', () => {
    const result = reducer(initialState, startSession(''))
    expect(result.isSessionStarted).toEqual(true);
    expect(initialState.questions).toContain(...result.questionSet)
  })

  test('should increment the current question property in state by 1 when nextQuestion dispatch is triggered', () => {
    const result = reducer(initialState, nextQuestion(''))
    expect(result.currentQuestion).toEqual(1);
  })

  test('should reset questionSet to an empty array, should reset currentQuestion to 0, and should set isSessionStarted to false when endSession dispatch is triggered', () => {
    reducer(initialState, userLogin(''));
    reducer(initialState, startSession(''))

    const result = reducer(initialState, endSession(''));
    expect(result.questionSet).toEqual([]);
    expect(result.currentQuestion).toEqual(0);
    expect(result.isSessionStarted).toEqual(false);

  })
})

  describe('Testing reducer helper function', () => {
    test('should return "not enough question stored" if passed less than three questions', () => {
      const result = pickQuestion(['1', '2']);
      expect(result).toEqual("not enough questions stored")
    })
  })




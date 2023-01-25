import { combineReducers, configureStore } from '@reduxjs/toolkit'

import questionReducer from "../client/redux/questionSlice"

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    question: questionReducer
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import questionReducer from "../client/redux/questionSlice"
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import {setupStore, initialState} from './setupStore'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
  initialEntries = ['/']
) {
  function Wrapper({ children }) {
    return <Provider store={store}><MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter></Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}



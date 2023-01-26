import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Login from '../client/components/Login.jsx';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();



describe('Login', () => {
  let store;
  let initialState = {
    question: [],
    isLoggedIn: false,
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })
  it('should contain a button', () => {
    const result = render(<Provider store={store}><Login /></Provider>);
    const button = result.getByText('Login')
    expect(button).toBeInTheDocument();
  });
  it('should contain a h1 tab', () => {
    const result = render(<Provider store={store}><Login /></Provider>);
    const h1 = result.getByText('Please Log In');
    expect(h1).toBeInTheDocument();
  });
  // it('should send a dispatch on click and log us in', () => {
  //   const result = render(<Provider store={store}><Login /></Provider>);
  //   fireEvent(result.getByText('Login'),
  //     new MouseEvent('click')
  //   );
  //   expect(store.isLoggedIn).toEqual(true);
  // })
});
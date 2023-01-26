import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import App from '../client/App.jsx'
import { renderWithProviders, initalState } from '../testing-utils/renderWithProviders'
import { formatState } from '../testing-utils/formatState'


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

// then you should be able to:
// expect(mockedNavigate).toHaveBeenCalledWith('/home');


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


describe('Login functionality', () => {
  afterEach(() => { fetch.resetMocks() });


  test('Login button logs you in', () => {
    const logIn = { loggedIn: true };
    fetch.mockResponseOnce(JSON.stringify(logIn))
    const res = renderWithProviders(<App />);
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    mockedUsedNavigate.mockReturnValueOnce(renderWithProviders(<App />, { isLoggedIn: true }, ['/home']))
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(mockedUsedNavigate).toBeCalledWith(['/home']);
    expect(screen.getByText('Press "Start" to begin interview session.')).toBeInTheDocument();
  })
});
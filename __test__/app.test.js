import { findAllByText, findByText, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../client/App.jsx'
import { renderWithProviders } from '../testing-utils/renderWithProviders'
import userEvent from '@testing-library/user-event'
import { mockFetchVideo } from '../testing-utils/mockFetchVideo'



const mockedUsedNavigate = jest.fn();
const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useHistory: () => ({
    push: mockedHistoryPush,
  })
}));



describe('Login functionality', () => {

  beforeEach(async () => {
    const jsDomAlert = window.alert;
    window.alert = () => { };

    const logIn = { loggedIn: true };
    fetch.mockResponseOnce(JSON.stringify(logIn));

    let video = await mockFetchVideo();
    fetch.mockResponseOnce(JSON.stringify(video));
  });

  afterEach(() => {
    fetch.resetMocks()
  });


  test('Login button logs you in', async () => {
    const res = renderWithProviders(<App />, {},['/']);
    const user = userEvent.setup();
    
    await user.click(screen.getByText('Login'));
    expect(mockedUsedNavigate).toHaveBeenNthCalledWith(1, '/home');
    
  })

  test('Dont have an account takes you to signup', async () => {

    const res = renderWithProviders(<App />, {}, ['/']);
    const user = userEvent.setup();
    expect(screen.getByRole('link')).toBeInTheDocument();
    await user.click(screen.getByRole('link'));
    expect(screen.getByText('Signup with Softi')).toBeInTheDocument();
  })
});


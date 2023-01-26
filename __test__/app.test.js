import { findAllByText, findByText, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../client/App.jsx'
import { renderWithProviders } from '../testing-utils/renderWithProviders'
import userEvent from '@testing-library/user-event'
import { formatState } from '../testing-utils/formatState'
import { mockFetchVideo } from '../testing-utils/mockFetchVideo'


// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedNavigate
// }));

// then you should be able to:
// expect(mockedNavigate).toHaveBeenCalledWith('/home');


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));



describe('Login functionality', () => {
  afterEach(() => { fetch.resetMocks() });


  test('Login button logs you in', async () => {

    const jsDomAlert = window.alert;
    window.alert = () => { };

    const logIn = { loggedIn: true };
    fetch.mockResponseOnce(JSON.stringify(logIn));

    let video = await mockFetchVideo();
    fetch.mockResponseOnce(JSON.stringify(video));


    const res = renderWithProviders(<App />, {},['/']);
    const user = userEvent.setup();
    
    await user.click(screen.getByText('Login'));
    expect(mockedUsedNavigate).toBeCalledWith('/home');
    
  })
});


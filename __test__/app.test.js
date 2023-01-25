import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Login from '../client/components/Login.jsx';
import App from '../client/App.jsx'
import { renderWithProviders } from '../testing-utils/renderWithProviders'
import { server } from '../__mocks__/server'
import { startSession } from '../client/redux/questionSlice.js';
import reducer from '../client/redux/questionSlice'
import QuestionBox from '../client/components/QuestionBox.jsx';


describe('Landing page', () => {
    
    test('App loads', () => {

    renderWithProviders(<App/>)
    
    expect(screen.getByText('Login')).toBeInTheDocument();
   
    })   
});

describe('Login functionality', () => {
  // Establish API mocking before all tests. (msw not working currently, fetch error not found)
  // beforeAll(() => server.listen())
  beforeEach(()=>fetch.resetMocks())
  // afterEach(() => server.resetHandlers())
  // afterAll(() => server.close())
  

  test('Login button logs you in', () => {
    renderWithProviders(<App/>)
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Press "Start" to begin interview session.')).toBeInTheDocument();
  })

  test('Should display Home page if user is logged in', () => {
    renderWithProviders(<App/>, {isLoggedIn: true})
    expect(screen.getByRole('button', { name: 'Start'})).toBeInTheDocument();
  })

  test('Should initiate session when button is clicked', () => {
    
    const res = renderWithProviders(<App/>, {isLoggedIn: true})
    expect(res.store.getState().question.isSessionStarted).toEqual(false);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    expect(res.store.getState().question.isSessionStarted).toEqual(true);
  })

  test('Should display question when session starts, and change the question to the next one in the array when next is clicked.', () => {

    const res = renderWithProviders(<App/>);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    let currentQ = res.store.getState().question.questionSet[0];
    expect(res.getByText(currentQ)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: "Next Question" }))
    currentQ = res.store.getState().question.questionSet[1];
    expect(res.getByText(currentQ)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: "Next Question" }))
    currentQ = res.store.getState().question.questionSet[2];
    expect(res.getByText(currentQ)).toBeInTheDocument();
    expect(res.store.getState().question.currentQuestion).toEqual(2);
  })

  test('Should render buttons after next has been clicked three times', () => {

    const res = renderWithProviders(<App/>, {isLoggedIn: true, isSessionStarted: true, currentQuestion: 2})
    screen.debug();
    // const stopCaptureButton = res.getByRole('button', {name: 'Stop Capture'});
    // const uploadButton = res.getByRole('button', {name: 'Upload'});
    // const endSessionButton = res.getByRole('button', {name: 'End Session'});
    // expect(stopCaptureButton).toBeInTheDocument();
    // expect(uploadButton).toBeInTheDocument();
    // expect(endSessionButton).toBeInTheDocument();
    


  })

  

})

describe('Home page functionality', () => {
  
  test('Start button appears on page', () => {
    renderWithProviders(<App/>)

  })

})

 // it('should send a dispatch on click and log us in', () => {
  //   const result = render(<Provider store={store}><Login /></Provider>);
  //   fireEvent(result.getByText('Login'),
  //     new MouseEvent('click')
  //   );
  //   expect(store.isLoggedIn).toEqual(true);
  // })
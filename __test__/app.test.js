import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Login from '../client/components/Login.jsx';
import App from '../client/App.jsx'
import { renderWithProviders } from '../testing-utils/renderWithProviders'
import { server } from '../__mocks__/server'

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
    renderWithProviders(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Press "Start" to begin interview session.')).toBeInTheDocument();
  })

})

describe('Home page functionality', () => {
  
  test('Start button appears on page', () => {
    renderWithProviders(<Home/>)
  })

})

 // it('should send a dispatch on click and log us in', () => {
  //   const result = render(<Provider store={store}><Login /></Provider>);
  //   fireEvent(result.getByText('Login'),
  //     new MouseEvent('click')
  //   );
  //   expect(store.isLoggedIn).toEqual(true);
  // })
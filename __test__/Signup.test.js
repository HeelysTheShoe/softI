import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../testing-utils/renderWithProviders'
import Login from '../client/components/Login'

describe('Home page functionality', () => {
    
    test('Content is rendered', () => {
      const res = renderWithProviders(<Login/>)
      expect(res.getByText('Softi')).toBeInTheDocument();
      expect(res.getByText('Your Interviewing Pal')).toBeInTheDocument();
      expect(res.getByRole('button', {name: 'Login'})).toBeInTheDocument();
      expect(res.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(res.getByPlaceholderText('Password')).toBeInTheDocument();

    })

    test('Login Button takes you to home', () =>{
        
    })


  
  })
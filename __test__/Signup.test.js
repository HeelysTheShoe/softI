import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../testing-utils/renderWithProviders'
import Login from '../client/components/Login'
import {verifyUser} from 'blah blah'

describe('Home page functionality', () => {
    
    const fakeFunc = jest.fn();
    

    test('Start button appears on page', () => {
      const res = renderWithProviders(<Login/>)
      expect(res.getByRole('heading', {name:'Softi'})).toBeInTheDocument();
      expect(res.getByRole('button', {name: 'Lgoin'}))
    })
  
  })
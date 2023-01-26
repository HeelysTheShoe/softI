import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../testing-utils/renderWithProviders'
import Home from '../client/components/Home'


describe('Home page renders', () => {
    
    jest.mock('./QuestionBox', () => ({
      __esModule: true,
      QuestionBox: () => {
        return <mock-questionBox data-testid="questionBox"/>;
      },
    }));

    jest.mock('./MySessions', () => ({
      __esModule: true,
      QuestionBox: () => {
        return <mock-questionBox data-testid="questionBox"/>;
      },
    }));


    test('Content is rendered', () => {
      const res = renderWithProviders(<Home/>)
      

    })

    test('Login Button takes you to home', () =>{
        
    })


  
  })

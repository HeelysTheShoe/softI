import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../testing-utils/renderWithProviders'
import Home from '../client/components/Home'

jest.mock('../client/components/QuestionBox', () => () => {
  const FakeQuestionBox = "default-awesome-component-mock";
  return <FakeQuestionBox />;
});

jest.mock('../client/components/MySessions', () => () => {
  const FakeMySessions = "default-awesome-component-mock";
  return <FakeMySessions />;
});

describe('Home page renders', () => {

    test('Content is rendered', () => {
      
      const res = renderWithProviders(<Home/>)
      expect(res.getByText('Press "Start" to begin interview session.')).toBeInTheDocument();
      expect(res.getByRole('button', {name: 'Start'})).toBeInTheDocument();
    })

  })

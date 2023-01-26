import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../testing-utils/renderWithProviders'
import { formatState } from '../testing-utils/formatState'
import Question from '../client/components/Question'

describe('Login Page Renders', () => {

    test('Content is rendered', () => {
      
      const res = renderWithProviders(<Question/>, {
        preloadedState : formatState({questionSet: ['foo', 'bar', 'foobar'], isLoggedIn: true, isSessionStarted: true, user : {username: 'hello'}})
      }, ['/home'])
      expect(res.getByText('foo')).toBeInTheDocument();

    })

  })
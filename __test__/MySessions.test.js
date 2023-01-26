import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../testing-utils/renderWithProviders'
import { formatState } from '../testing-utils/formatState'
import MySessions from '../client/components/MySessions'

describe('MySessions renders correctly', () => {

    test('Content is rendered', async () => {
      let video = ['a', 'b', 'c']
      video = JSON.stringify(video);
      fetch.mockResponseOnce(video)
      const res = renderWithProviders(<MySessions/>, {
        preloadedState : formatState({ isLoggedIn: true, isSessionStarted: true, user : {username: 'hello'}})
      }, ['/home'])
      await waitFor(()=> expect(screen.getAllByRole('option', {name: 'Session 1'})[0]).toBeInTheDocument());
    })

    test('Console logs an error if Use Effect receives an improper response', async () => {
        jest.spyOn(console, 'log')
        let video = ['a']
        fetch.mockResponseOnce(video)
        const res = renderWithProviders(<MySessions/>, {
            preloadedState : formatState({ isLoggedIn: true, isSessionStarted: true, user : {username: 'hello'}})
          }, ['/home'])
          await waitFor(()=> expect(console.log).toHaveBeenCalledWith("[FetchError: invalid json response body at  reason: Unexpected token a in JSON at position]"));
        })

  })
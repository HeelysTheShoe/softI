import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../testing-utils/renderWithProviders'
import { formatState } from '../testing-utils/formatState'
import MySessions from '../client/components/MySessions'
import { mockFetchVideo } from '../testing-utils/mockFetchVideo'

describe('MySessions renders correctly', () => {

    test('Content is rendered', async () => {
      let video = ['a', 'b', 'c']
      video = JSON.stringify(video);
      fetch.mockResponseOnce(video)
      const res = renderWithProviders(<MySessions/>, {
        preloadedState : formatState({ isLoggedIn: true, isSessionStarted: true, user : {username: 'hello'}})
      }, ['/home'])
      screen.debug();
    })

  })
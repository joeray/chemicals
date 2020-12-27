import { render } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { GlobalContext } from '../context';
import Login from './Login';

const loginUrl =
  'http://github.com/login/oauth/authorize?client_id=c179a92372af346617e1&redirect_uri=http://localhost:3080/oauth/redirect';

const userUrl = '//api.github.com/user';

const mockConsumer = {};

describe('Login page', () => {
  beforeEach(async () => {
    act(() => {
      jest.spyOn(axios, 'get').mockImplementationOnce(url => {
        switch (url) {
          case loginUrl:
            return Promise.resolve({
              data: { user: 'fake user', avatar_url: 'fake_url' },
            });
          case userUrl:
            return Promise.reject({});
          default:
            return false;
        }
      });

      render(
        <GlobalContext.Provider value={mockConsumer}>
          <Login />
        </GlobalContext.Provider>
      );
    });
  });

  it('calls service to retrieve user at the beginning', () => {
    expect(axios.get).toBeCalledWith(`${userUrl}`, {
      headers: { Authorization: 'token null' },
    });
  });

  it('has a link to call github api', async () => {
    const githubLink = document.querySelector('#githubLog');
    const link = githubLink.getAttribute('href');
    expect(githubLink).toBeTruthy();
    expect(link).toBe(loginUrl);
    expect(githubLink.textContent).toBe('Login with github');
  });
});

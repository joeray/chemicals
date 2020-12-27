import styled from 'styled-components';
import React, { useCallback, useEffect } from 'react';
import getCookie from '../utils/GetCookie';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = classStyle => {
  const history = useHistory();

  const loadUser = useCallback(async () => {
    try {
      await axios
        .get('//api.github.com/user', {
          headers: {
            // Include the token in the Authorization header
            Authorization: 'token ' + getCookie('access-token-github'),
          },
        })
        .then(res => {
          const { data: user } = res;
          document.cookie = `username=${user.login}`;
          document.cookie = `avatar=${user.avatar_url}`;
          history.push(`/home`);
        });
    } catch (error) {
      console.log(`Error when retrieve user data , ${error}`);
    }
  }, [history]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <LogoWrapper className={classStyle.classStyle}>
      <p>Welcome to our tool box</p>
      <div>
        <a
          id="githubLog"
          href="http://github.com/login/oauth/authorize?client_id=c179a92372af346617e1&redirect_uri=http://localhost:3080/oauth/redirect"
        >
          Login with github
        </a>
      </div>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  height: 77px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Login;

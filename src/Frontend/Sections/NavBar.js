import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Magnif } from '../Assets/magnifyingglass.svg';
// eslint-disable-next-line no-unused-vars
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import theme from '../Styles/theme';
import getCookie from '../utils/GetCookie';

const NavBar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({ name: getCookie('username'), avatar: getCookie('avatar') });
  }, []);

  const history = useHistory();

  const logout = async () => {
    document.cookie =
      'access-token-github=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'avatar=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setUser({});
    history.push(`/`);
  };

  return (
    <StyledList>
      <li>
        <Magnif fill="#FFF" height="12" width="12" />
        <Link to="/">&nbsp;Home</Link>
      </li>
      <li>
        <UserInfo>
          <div className="name">
            <div>user name: </div>
            <div> {user.name}</div>
          </div>
          <img height="40" width="40" src={user.avatar} alt="user avatar" />
        </UserInfo>
      </li>
      <li>
        <button onClick={logout}>Logout</button>
      </li>
    </StyledList>
  );
};
const StyledList = styled.ul`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  background-color: ${theme.colours.appBlack};
  padding: 10px;
  margin: 0px;
  color: ${theme.colours.appWhite};
  li {
    display: inline;
    a {
      text-decoration: none;
      color: ${theme.colours.appWhite};
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  font-size: ${theme.fontSizes.userInfo};
  .name {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 12px;
    justify-content: center;
  }
`;
export default NavBar;

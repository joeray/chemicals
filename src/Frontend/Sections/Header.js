import styled from 'styled-components';
import React from 'react';
import logo from '../Assets/flask.svg';
import theme from '../Styles/theme';

const Header = classStyle => (
  <StyledWrapper>
    <LogoWrapper className={classStyle.classStyle}>
      <img src={logo} alt="Logo" width="60" height="56" />
      <p className="title">Welcome to our tool box</p>
      <OverLayBackground />
    </LogoWrapper>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  position: relative;
`;

const OverLayBackground = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  background-color: ${theme.colours.headerOverlayBackground};
  height: 100%;
  opacity: 0.3;
`;

const LogoWrapper = styled.div`
  height: 77px;
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    font-weight: bold;
  }
`;

export default Header;

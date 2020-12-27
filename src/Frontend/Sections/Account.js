import styled from 'styled-components';
import documents from '../Assets/documents.svg';
import React from 'react';
import { GlobalContext } from '../context';
import theme from '../Styles/theme';

const Account = () => {
  return (
    <GlobalContext.Consumer>
      {context => (
        <AccountWrapper>
          <img src={documents} alt="documents" width="60" height="56" />
          <div className="register">
            <div className="title">Total documents </div>
            <div className="digit">{context.amount}</div>
          </div>
        </AccountWrapper>
      )}
    </GlobalContext.Consumer>
  );
};

const AccountWrapper = styled.div`
  height: 77px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 35px;

  .register {
    margin-left: 15px;
    .title {
      font-size: 22px;
    }
    .digit {
      font-size: ${theme.fontSizes.docsAmount};
    }
  }
`;

export default Account;

import styled from 'styled-components';
import React from 'react';
import { SearchButton } from '../Components/StyledComponents';
import theme from '../Styles/theme';

const SearchBar = props => (
  <StyledBar>
    <CenteredWrapper>
      <span>Show &nbsp;</span>
      <select
        name="quantity"
        id="list-select"
        onChange={props.handleSelectChange}
      >
        <option value="all"> Choose an option </option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="all">All</option>
      </select>
      <span>&nbsp;entries</span>
    </CenteredWrapper>
    <CenteredWrapper>
      <span>Search:&nbsp;</span>
      <input
        id="searchBarInput"
        type="search"
        size="20"
        onChange={props.onChangeHandler}
        onKeyDown={evt => {
          evt.key === 'Enter' && props.onSearchHandler(evt);
        }}
      ></input>
      <SearchButton
        onClick={evt => props.onSearchHandler(evt)}
        alt="search"
        height="17"
        width="17"
      />
    </CenteredWrapper>
  </StyledBar>
);

const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  background-color: ${theme.colours.skyBlue};
`;

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SearchBar;

import styled from 'styled-components';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context';
import theme from '../Styles/theme';

const Search = () => {
  const [chemicalsList, setChemicalsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  let {
    setAppContext,
    lists = [],
    groups = [],
    amount = 0,
    noResults = [],
  } = useContext(GlobalContext);

  const groupsAmount = data => {
    const result = {};
    data.forEach(item => {
      result[item.group] = (result[item.group] || 0) + 1;
    });
    const groupsArray = Object.keys(result);
    const newGroups = groups.filter(group => groupsArray.indexOf(group) === -1);
    if (newGroups.length) groupsArray.push(newGroups[0]);
    return [result, groupsArray];
  };

  const updateLists = (lists, value, data) => {
    const found = lists.filter(({ name }) => value === name);
    const groups = groupsAmount(data);
    setAppContext({ amount: amount + data.length });
    if (found.length === 0) {
      return [
        ...lists,
        {
          name: value,
          amount: data.length,
          documents: data,
          groups: groups[0],
        },
      ];
    } else {
      return lists;
    }
  };

  const onSearchHandler = async () => {
    setErrorMessage(null);

    const value = document.querySelector('#mainSearch').value.toUpperCase();
    if (!value) {
      setErrorMessage('Enter a value before search');
      return false;
    }
    const alreadySearched =
      lists.find(list => list.name === value) ||
      noResults.find(subject => subject === value);
    if (alreadySearched) {
      setErrorMessage('Value already searched');
      return false;
    }
    try {
      const { data } = await axios.get(`http://localhost:3080/api/chemicals`, {
        params: { value },
      });

      if (data.length === 0) {
        setChemicalsList(false);
        setAppContext({ noResults: [...noResults, value] });
      } else {
        await setChemicalsList(data);
        await setAppContext({
          lists: updateLists(lists, value, data),
          groups: groupsAmount(data)[1],
        });
      }
    } catch (error) {
      setChemicalsList(false);
    }
  };

  const onChangeHandler = ({ target: { value } }) => {
    if (value.length === 0) {
      setChemicalsList([]);
      setErrorMessage(null);
      setAppContext({ account: 0 });
    }
  };

  return (
    <GlobalContext.Consumer>
      {context => (
        <SearchWrapper>
          <StyledSearch>
            <label>Type your search here:</label>
            <span style={{ width: '700px' }}>
              <InputStyled
                type="search"
                id="mainSearch"
                name="name"
                size="10"
                autoComplete="off"
                onChange={onChangeHandler}
                onKeyDown={evt => {
                  evt.key === 'Enter' && onSearchHandler();
                }}
              ></InputStyled>
              <button onClick={onSearchHandler}>Search</button>
            </span>
          </StyledSearch>
          <FoundResults>
            {!chemicalsList && !errorMessage && (
              <ErrorMessage>No results found</ErrorMessage>
            )}
            {chemicalsList && chemicalsList.length > 0 && !errorMessage && (
              <span>{chemicalsList.length} results found</span>
            )}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </FoundResults>
        </SearchWrapper>
      )}
    </GlobalContext.Consumer>
  );
};

const SearchWrapper = styled.div`
  height: 120px;
  margin-top: 20px;
`;

const InputStyled = styled.input`
  width: 20%;
  margin: 15px 10px 0;
`;

const StyledSearch = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  label: {
    display: block;
    margin-bottom: 15px;
  }
`;

const FoundResults = styled.div`
  margin-top: 15px;
`;

const ErrorMessage = styled.span`
  color: ${theme.colours.appRed};
`;

export default Search;

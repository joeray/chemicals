import styled from 'styled-components';
import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../context';
import { useParams } from 'react-router-dom';
import SearchBar from '../Sections/SearchBar';
import { ReactComponent as ExternalLink } from '../Assets/external-link.svg';
import theme from '../Styles/theme';
import NavBar from '../Sections/NavBar';
import getCookie from '../utils/GetCookie';
import { useHistory } from 'react-router-dom';

const SearchRowList = () => {
  const history = useHistory();

  let { lists = [] } = useContext(GlobalContext);
  const [originalDocuments, setOriginalDocuments] = useState(lists);
  const [documents, setDocuments] = useState(lists);
  let { list, group } = useParams();

  useEffect(() => {
    const accessCookie = getCookie('access-token-github');
    if (!accessCookie) {
      history.push(`/`);
    }

    let filtered = lists.filter(({ name }) => list === name.toLowerCase());

    filtered =
      filtered[0] &&
      filtered[0].documents.filter(
        item => parseInt(item.group, 10) === parseInt(group, 10)
      );
    setOriginalDocuments(filtered);
    setDocuments(filtered);
  }, [group, list, lists, history]);

  const handleSelectChange = ({ target: { value } }) => {
    if (value === 'all') {
      setDocuments(originalDocuments);
    } else {
      setDocuments(originalDocuments.slice(0, value));
    }
  };

  const onSearchHandler = ({ value }) => {
    const inputElement = document.querySelector('#searchBarInput');
    value =
      value ||
      (inputElement &&
        inputElement.value &&
        inputElement.value.toUpperCase()) ||
      '';

    const filtered = originalDocuments.filter(
      doc =>
        doc['patent no'].toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        doc['patent title'].toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        doc.type.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setDocuments(filtered);
  };

  const onChangeHandler = ({ target: { value } }) => {
    if (!value) setDocuments(originalDocuments);
  };

  return (
    <>
      <NavBar />
      <SearchBar
        handleSelectChange={handleSelectChange}
        onSearchHandler={onSearchHandler}
        onChangeHandler={onChangeHandler}
      />
      <GlobalContext.Consumer>
        {context => (
          <CenteredWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th></th>
                  <th>docid</th>
                  <th>title</th>
                  <th>chemical type</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {documents &&
                  documents.map((item, index) => {
                    if (parseInt(item.group, 10) === parseInt(group, 10))
                      return (
                        <tr key={index}>
                          <td className="centered">{index + 1}</td>
                          <td>{item['patent no']}</td>
                          <td className="title">{item['patent title']}</td>
                          <td className="title">{item.type}</td>
                          <td className="centered">
                            <a
                              rel="noreferrer"
                              href={`https://patents.google.com/patent/${item['patent no']}`}
                              target="_Blank"
                            >
                              <StyledLink />
                            </a>
                          </td>
                        </tr>
                      );
                    return false;
                  })}
              </tbody>
            </StyledTable>
          </CenteredWrapper>
        )}
      </GlobalContext.Consumer>
    </>
  );
};

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTable = styled.table`
  width: 100%;

  tr {
    height: 60px;
    &:nth-child(odd) {
      background-color: ${theme.colours.docsOddRow};
    }
    &:nth-child(even) {
      background-color: ${theme.colours.docsEvenRow};
    }
    td {
      padding: 0 5px 0 10px;
      &.title {
        text-transform: lowercase;
      }
      &:first-line {
        text-transform: capitalize;
      }
      &.centered {
        text-align: center;
      }
    }
  }
  thead {
    tr:nth-child(odd) {
      background-color: ${theme.colours.docsHeader};
    }
  }
`;

const StyledLink = styled(ExternalLink)`
  &:hover {
    fill: ${theme.colours.docsExternalLink};
  }
`;

export default SearchRowList;

import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import sort from '../Assets/arrowdown.svg';
import { SearchButton } from '../Components/StyledComponents';
import theme from '../Styles/theme';

const Square = props => {
  const [listArray, setListArray] = useState(props.list);
  const [sortRule, setSortRule] = useState('descendent');
  const { group: name, list } = props;

  const history = useHistory();

  useEffect(() => {
    setListArray(list);
  }, [list]);

  const onSearchHandler = () => {
    const value = document.querySelector(`#group${name}`).value.toUpperCase();

    const filteredArray = listArray.filter(
      item => item.name.toUpperCase().indexOf(value) !== -1
    );
    setListArray(filteredArray);
  };

  const onChangeHandler = ({ target: { value } }) => {
    if (!value) {
      setListArray(list);
    }
  };

  const rowNavigationHandler = list => {
    history.push(`/rowlist/${list.toLowerCase()}/${name}`);
  };

  const sortList = ({ target }, property) => {
    target.classList.toggle('rotated');
    listArray.sort(function (a, b) {
      let propertyA = a[property];
      let propertyB = b[property];
      if (property !== 'amount') {
        propertyA = a[property].toUpperCase(); // ignore upper and lowercase
        propertyB = b[property].toUpperCase(); // ignore upper and lowercase
      }
      if (sortRule === 'descendent') {
        setSortRule('ascendent');
        return propertyA < propertyB ? -1 : 1;
      }

      if (sortRule === 'ascendent') {
        setSortRule('descendent');
        return propertyA < propertyB ? 1 : -1;
      }

      // names must be equal
      return 0;
    });
    setListArray(listArray);
  };

  return (
    <MainWrapper>
      <Title>Chemical Type {name}</Title>
      <SearchWrapper>
        <label>Search:&nbsp;</label>
        <input
          type="search"
          id={`group${name}`}
          name="name"
          size="20"
          onChange={onChangeHandler}
          autoComplete="off"
          onKeyDown={evt => {
            evt.key === 'Enter' && onSearchHandler();
          }}
        ></input>
        <SearchButton
          onClick={onSearchHandler}
          alt="search"
          height="17"
          width="17"
        />
      </SearchWrapper>
      <div>
        <MainTable>
          <thead>
            <tr>
              <th>
                <span>Name &nbsp;</span>
                <StyledImg
                  onClick={evt => sortList(evt, 'name')}
                  src={sort}
                  alt="sort"
                  width="13"
                  height="13"
                />
              </th>
              <th>
                <span>Documents &nbsp;</span>
                <StyledImg
                  onClick={evt => sortList(evt, 'amount')}
                  src={sort}
                  alt="sort"
                  width="13"
                  height="13"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {listArray &&
              listArray.map(item => (
                <tr
                  key={item.name.slice(10) + item.amount}
                  style={{ cursor: 'pointer' }}
                  onClick={() => rowNavigationHandler(item.name)}
                >
                  <td className="name">{item.name}</td>
                  <td className="amount">{item.amount}</td>
                </tr>
              ))}
          </tbody>
        </MainTable>
      </div>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 30%;
  background-color: #fff;
  padding: 15px;
  border-radius: 12px;
`;

const Title = styled.div`
  font-weight: bold;
  text-align: left;
  font-size: 25px;
`;

const StyledImg = styled.div`
  display: inline-block;
  height: 10px;
  width: 14px;
  cursor: pointer;
  background-image: url(${sort});
  background-size: cover;
  background-position-x: center;

  &.rotated {
    transform: rotate(180deg);
  }
`;

const MainTable = styled.table`
  width: 100%;
  th {
    vertical-align: center;
  }
  tr {
    td {
      text-transform: lowercase;
      &:first-line {
        text-transform: capitalize;
      }
      &.name {
        text-align: left;
        padding-left: 15px;
      }
      &.amount {
        text-align: right;
        padding-right: 15px;
      }
    }
    :nth-child(odd) {
      background-color: ${theme.colours.backgroundGray};
    }
  }
  thead {
    tr {
      :nth-child(odd) {
        background-color: ${theme.colours.appWhite};
      }
    }
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  border-top: 1px solid ${theme.colours.backgroundGray};
  border-bottom: 1px solid ${theme.colours.backgroundGray};
  margin: 10px 0;
  label: {
    display: block;
    margin-bottom: 15px;
  }
`;

export default Square;

import React, { useEffect } from 'react';
import { GlobalContext } from '../context';
import Header from '../Sections/Header';
import Search from '../Sections/Search';
import Account from '../Sections/Account';
import Square from '../Sections/Square';
import NavBar from '../Sections/NavBar';
import getCookie from '../utils/GetCookie';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const accessCookie = getCookie('access-token-github');
    if (!accessCookie) {
      history.push(`/`);
    }
  }, [history]);

  const filterListByGroup = (lists, group) => {
    let squareList = [];
    lists.forEach(list => {
      squareList.push({
        name: list.name,
        amount: list.documents.filter(
          doc => parseInt(doc.group, 10) === parseInt(group, 10)
        ).length,
      });
    });
    return squareList;
  };

  return (
    <div className="App">
      <NavBar />
      <Header classStyle="App-header" />
      <Search />
      <GlobalContext.Consumer>
        {context => (
          <>
            {context.amount && <Account />}
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {context.groups &&
                context.groups.map(group => {
                  return (
                    <Square
                      key={group}
                      group={group}
                      list={filterListByGroup(context.lists, group)}
                    />
                  );
                })}
            </div>
          </>
        )}
      </GlobalContext.Consumer>
    </div>
  );
};

export default Home;

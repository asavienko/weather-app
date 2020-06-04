import React from 'react';
import { Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { StyledLayout, StyledContent } from './App.styles';
import CitiesGrid from './components/CitiesGrid';
import DetailedPage from './components/DetailedPage';

const history = createBrowserHistory();

function App() {
  return (
    <StyledLayout>
      <StyledContent>
        <Router history={history}>
          <Route path="/" component={CitiesGrid} exact />
          <Route path="/:cityName" component={DetailedPage} />
        </Router>
      </StyledContent>
    </StyledLayout>
  );
}

export default App;

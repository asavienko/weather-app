import React from 'react';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { StyledContent, StyledLayout } from './App.styles';
import CitiesGrid from './components/CitiesGrid';
import DetailedPage from './components/DetailedPage';
import NotFoundPage from './components/NotFoundPage';

const history = createBrowserHistory();

function App() {
  return (
    <StyledLayout>
      <StyledContent>
        <Router history={history}>
          <Switch>
            <Route path="/" component={CitiesGrid} exact />
            <Route path="/city/:cityName" component={DetailedPage} />
            <Route path="*" component={NotFoundPage} exact />
          </Switch>
        </Router>
      </StyledContent>
    </StyledLayout>
  );
}

export default App;

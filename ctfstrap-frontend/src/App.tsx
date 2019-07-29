import * as React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/base/Header';
import MainPage from './pages/MainPage';
import ChallListPage from './pages/ChallListPage';
import ScoreboardPage from './pages/ScoreboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC<{}> = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/challenges" component={ChallListPage} />
        <Route path="/scoreboard" component={ScoreboardPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </Router>
  );
};

export default App;
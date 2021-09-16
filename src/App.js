
import { Switch, Route, Redirect } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import MainPage from './components/MainPage/MainPage';
import Autorization from './components/Autorization/Autorization';
import './App.scss';

function App() {
  return (
    <Switch>
      <Route path='/mainPage'>
        <MainPage />
      </Route>
      <Route path='/autorization'>
        <Autorization />
      </Route>
      <Route path='/registration'>
        <Registration />
      </Route>
      <Redirect from='/' to='/registration' />
    </Switch>
  );
}

export default App;

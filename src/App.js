
import { Switch, Route, Redirect } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import MainPage from './components/MainPage/MainPage';
import Autorization from './components/Autorization/Autorization';
import './App.scss';

function App() {
  return (
    <Switch>
       <Route path='/autorization'>
        <Autorization />
      </Route>
      <Route path='/registration'>
        <Registration />
      </Route>
      <Route path='/mainPage' 
        render={() => localStorage.getItem('token') 
        ? <MainPage /> 
        : <Redirect to="/autorization" />} 
      />
      <Redirect from='/' to='/autorization'/>
    </Switch>
  );
}

export default App;

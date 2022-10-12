import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import InputPassword from '../InputsButtons/InputPassword';
import InputLogin from '../InputsButtons/InputLogin';
import logo1 from '../../img/logo1.png';
import build from '../../img/build.png';
import '../Registration/Registration.scss';

const Autorization = () => {
  const [loginInput, setLoginInput] = useState('')  
  const [passwordInput, setPasswordInput] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const [state, setState] = useState({
    open: false,
    message: ''
  });

  const history = useHistory();

  const userLogin = () => {
    if (!loginInput || !passwordInput.password) {
      setState({...state, open: true, message: 'Необходимо ввести имя пользователя и пароль'});
    } else {
      axios.post('http://localhost:8000/login', {
      login: loginInput, 
      password: passwordInput.password
      }).then(res => {
        localStorage.setItem('token', res.data.token);
        history.push('/mainPage');
      }).catch(err => {
        setState({...state, open: true, message: 'Ошибка авторизации! Проверьте вводимые данные.'});
      });
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };


  const loginChange = (e) => {
    setLoginInput(e.target.value);
  }

  const { open, message } = state;

  return (
    <div className="registration">
      <div className='all-blocks'>
        <div className='header'>
          <img src={logo1} alt=""></img>
          <h1>Авторизоваться в системе</h1>
        </div>
        <div className='main'>
          <div className='main-build'>
            <img src={build} alt=""></img>
          </div>

          <div className='form'>
            <div>
              <h1>Авторизация</h1>
              <p>Login:</p>
              <InputLogin 
                loginChange={loginChange}
                loginInput={loginInput}
              />
              <p>Password:</p>
              <InputPassword 
                setPasswordInput={setPasswordInput}
                passwordInput={passwordInput}
              />            
              <div className='forms-buttons'>
              <Button 
                className='regButton' 
                variant="outlined"
                onClick={() => userLogin()}
              >
                Авторизоваться
              </Button>
              <Button 
                className='regButton' 
                variant="outlined"
                onClick={() => history.push('/registration')}
                >
                Регистрация
              </Button>
              </div>              
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={open}
                onClose={handleClose}
                message={message}
              />
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Autorization;
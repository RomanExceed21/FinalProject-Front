import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import InputLogin from '../InputsButtons/InputLogin';
import { Button, Snackbar} from '@material-ui/core';
import InputPassword from '../InputsButtons/InputPassword';
import InputPassRepeat from '../InputsButtons/InputPassRepeat';
import logo1 from '../../img/logo1.png';
import build from '../../img/build.png';
import './Registration.scss';

const Registration = () => {
  const [loginInput, setLoginInput] = useState('');  

  const [passwordInput, setPasswordInput] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const [passwordRepeatInput, setPasswordRepeatInput] = useState({
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

  
  const loginChange = (e) => {
    setLoginInput(e.target.value);
  }
  
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  
  const { open, message } = state;

  const handleSubmit = () => {
    const passwordField = passwordInput.password.split('')
    if (loginInput.length < 6 || passwordInput.password.length < 6) {
      return setState({ ...state, 
        open: true, 
        message: 'Логин и пароль должны быть не меньше 6 символов \nПароль должен содержать только латинские символы и минимум одну цифру'});      
    }

    passwordField.forEach ((element) => {
      if (!/[a-zA-Z]/.test(element) && !/[0-9]/.test(element)) {
        return setState({ ...state, 
          open: true, 
          message: 'Пароль должен содержать только латинские буквы и цифры'});
      }
    })

    if (!/[0-9]/.test(passwordField) || !/[a-zA-Z]/.test(passwordField)) {
      return setState({ ...state, 
        open: true, 
        message: 'Пароль должен содержать хотя бы одну цифру или букву'});
    }

    if(passwordRepeatInput.password !== passwordInput.password) {
      setState({ ...state, open: true, message: 'Поля Password и Repeat Password должны совпадать'});
      return
    }

    addUser(loginInput, passwordInput)
  } 

  const addUser = (loginInput, passwordInput) => {
    axios.post('http://localhost:8000/newUser', {
      login: loginInput, 
      password: passwordInput.password
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      history.push('/mainPage');
    }).catch(err => {
      setState({...state, open: true, message: 'Ошибка авторизации! Такой пользователь уже существует'});
    });
  }

  return (
    <div className="registration">
      <div className='all-blocks'>
        <div className='header'>
          <img src={logo1} alt=""></img>
          <h1>Зарегистрироваться в системе</h1>
        </div>

        <div className='main'>
          <div className='main-build'>
            <img src={build} alt=""></img>
          </div>

          <div className='form'>
            <div>
              <h1>Регистрация</h1>
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
              <p>Repeat Password:</p>
              <InputPassRepeat 
                passwordRepeatInput={passwordRepeatInput}
                setPasswordRepeatInput={setPasswordRepeatInput}
              />
              <div className='forms-buttons'>
                <Button 
                  className='regButton' 
                  variant="outlined"
                  onClick={() => handleSubmit()}
                >
                  Зарегистрироваться
                </Button>
                <Button 
                  className='regButton' 
                  variant="outlined"
                  onClick={()=> history.push('/autorization')}
                >
                  Авторизация
                </Button>
            </div>
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
  );
}

export default Registration;
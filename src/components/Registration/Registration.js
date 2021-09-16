import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Registration.scss'
import logo1 from '../../img/logo1.png';
import build from '../../img/build.png'
import InputPassword from '../InputsButtons/InputPassword';
import InputPassRepeat from '../InputsButtons/InputPassRepeat';
import InputLogin from '../InputsButtons/InputLogin';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function Registration() {
  const [users, setUsers] = useState([])
  const [loginInput, setLoginInput] = useState('')  

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

  let history = useHistory();

  const loginChange = (e) => {
    setLoginInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordField = passwordInput.password.split('')
    if (loginInput.length < 6 || passwordInput.length < 6) {
      alert('Логин и пароль должны быть не меньше 6 символов \nПароль должен содержать только латинские символы и минимум одну цифру')
      return
    }

    passwordField.map ((element) => {
      if (!/[a-zA-Z]/.test(element) && !/[0-9]/.test(element)) {
        alert('Пароль должен состоять из латинских букв и цифр')
        return
      }
    })

    if (!/[0-9]/.test(passwordField) || !/[a-zA-Z]/.test(passwordField)) {
      alert('Пароль должен содержать хотя бы одну цифру или букву')
      return
    }

    if(passwordRepeatInput.password !== passwordInput.password) {
      alert('Поля Password и Repeat Password должны совпадать')
      return
    }

    addUser(loginInput, passwordInput)
  } 

  const addUser = (loginInput, passwordInput) => {
    axios.post('http://localhost:8000/newUser', {
      login: loginInput, 
      password: passwordInput.password
    }).then(res => {
      setUsers(res.data.data);
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
            <form onSubmit={handleSubmit}>
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
                  onClick={()=> history.push('/mainPage')}
                >
                  Зарегистрироваться
                </Button>
                <Button 
                  className='regButton' 
                  variant="outlined"
                  onClick={()=> history.push('/autorization')}
                >
                  Авторизоваться
                </Button>
              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
  );
}

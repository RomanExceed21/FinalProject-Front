import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo1 from '../../img/logo1.png';
import build from '../../img/build.png'
import '../Registration/Registration.scss'
import InputPassword from '../InputsButtons/InputPassword';
import InputLogin from '../InputsButtons/InputLogin';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function Autorization() {
  const [loginInput, setLoginInput] = useState('')  

  const [passwordInput, setPasswordInput] = useState({
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

  const handleSubmit = () => {
    console.log('Autorization')
  }
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
            <form onSubmit={handleSubmit}>
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
                onClick={() => history.push('/registration')}
              >
                Авторизоваться
              </Button>
              <Button 
                className='regButton' 
                variant="outlined"
                >
                Зарегистрироваться
              </Button>
              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
  )
}

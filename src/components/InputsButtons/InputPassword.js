import React from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './LoginPassword.scss';

const InputPassword = ({passwordInput, setPasswordInput}) => {

  const passwordChange = (prop) => (event) => {
    setPasswordInput({ ...passwordInput, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPasswordInput({ ...passwordInput, showPassword: !passwordInput.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          className='input-password-form'
          type={passwordInput.showPassword ? 'text' : 'password'}
          value={passwordInput.password}
          onChange={passwordChange('password')}
          label="password"
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {passwordInput.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
    </div>
  )
}

export default InputPassword;

import { InputAdornment, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './InputLogin.scss'

const InputLogin = ({loginChange}) => {
  return (
    <TextField
      className ="input-login"
      id="input-with-icon-textfield"
      onChange={loginChange}
      required={true}
      autoComplete='off'
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
    />
  )
}
export default InputLogin;
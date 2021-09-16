import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


export default function InputPassRepeat({passwordRepeatInput, setPasswordRepeatInput}) {


  const passwordRepeatChange = (prop) => (event) => {
    setPasswordRepeatInput({ ...passwordRepeatInput, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPasswordRepeatInput({ ...passwordRepeatInput, showPassword: !passwordRepeatInput.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '100%',
    },
  }));
  const classes = useStyles();
  
  return (
    <div>
      <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-passwordRepeat">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-passwordRepeat"
          type={passwordRepeatInput.showPassword ? 'text' : 'password'}
          value={passwordRepeatInput.password}
          onChange={passwordRepeatChange('password')}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {passwordRepeatInput.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
    </div>
  )
}

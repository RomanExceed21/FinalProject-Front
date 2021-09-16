import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '100%',
  },
}));

export default function InputLogin({loginChange}) {

  const classes = useStyles();
  return (
    <TextField
      className={classes.margin, classes.textField}
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

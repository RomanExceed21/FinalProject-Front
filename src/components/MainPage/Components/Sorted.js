import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function Sorted() {
  const currencies = [
    {value: ''},
    {value: 'Имя пациента'},    
    {value: 'Имя врача'},
    {value: 'Дата'},
    {value: 'Жалоба'},
  ];
  return (
    <div>
      <TextField
        id="outlined-select-currency-native"
        select
        label=""
        className='input-sort'
        value='' 
        // onChange={(e) => setDoctorNameEdit(e.target.value)}
        SelectProps={{
          native: true,
        }}
        variant="outlined"
      >
      {currencies.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
      </TextField>
    </div>
  )
}

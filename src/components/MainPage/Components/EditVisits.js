import React, {useState} from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import './EditVisits.scss';

const EditVisits = ({ setModalActivEdit, index, setAllData, allData, value}) => {
  const [nameEdit, setNameEdit] = useState(value.pacientName);
  const [doctorNameEdit, setDoctorNameEdit] = useState(value.doctorName);
  const [dateEdit, setDateEdit] = useState(value.dateOfVisit);
  const [complaintEdit, setComplaintEdit] = useState(value.complaintText);

  const saveCorrections = () => {
    const token = localStorage.getItem('token');
    axios.patch('http://localhost:8000/updateVisit', {
      _id: allData[index]._id, 
      pacientName: nameEdit, 
      doctorName: doctorNameEdit,
      dateOfVisit: dateEdit,
      complaintText: complaintEdit
    }, { headers: {
      Authorization: `${token}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=utf-8' 
    }}).then(res => {
      setAllData(res.data.data);
    });
    setModalActivEdit(false);
  }

  const currencies = [
    {value: ''},
    {value: 'Иванов Иван Иванович'},    
    {value: 'Николаев Семен Петрович'},
    {value: 'Петров Иван Владимирович'},
    {value: 'Сидоров Иван Александрович'},
  ];
  
  return (
    <div className={index >= 0 ? 'modalEdit activeEdit' : 'modalEdit'}>
      <div className='modalEdit-content'>
        <div className='edit-header'>
          <h1>Изменить прием</h1>
        </div>
        <div className='edit-middle'>          
          <div>
            <p>Имя:</p>
            <TextField 
              onChange={(e) => setNameEdit(e.target.value)}
              className='input-edit'
              label="Имя пациента" 
              variant="outlined" 
              autoComplete='off'
              value={nameEdit}
            />
          </div>

          <div>
            <p>Врач:</p>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Имя доктора"
              className='input-edit'
              value={doctorNameEdit} 
              onChange={(e) => setDoctorNameEdit(e.target.value)}
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

          <div>
            <p>Дата:</p>
            <TextField
              onChange={(e) => setDateEdit(e.target.value)}
              label="Дата приема"
              type="date"      
              variant="outlined"
              className='input-edit'
              InputLabelProps={{
                shrink: true,
              }}
              value={dateEdit}
              autoComplete='off'
            />
          </div>

          <div>
          <p>Жалобы:</p>
            <TextField 
              onChange={(e) => setComplaintEdit(e.target.value)}
              className="input-edit"
              InputLabelProps={{
                shrink: true,
              }}
              label="Жалобы пациента" 
              variant="outlined" 
              value={complaintEdit}
              autoComplete='off'
            />
          </div>
        </div>
        <div className='edit-footer'>
          <Button 
            className='edit-footer-button' 
            variant="outlined"
            onClick={() => saveCorrections(index)}
          >
            Save
          </Button>
          <Button 
            className='edit-footer-button' 
            variant="outlined"
            onClick={() => setModalActivEdit(false)}
          >
            Cancel
          </Button>
        </div>
      </div>      
    </div>
  )
}

export default EditVisits;
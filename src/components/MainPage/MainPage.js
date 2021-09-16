import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logo1 from '../../img/logo1.png'
import PacientName from './Components/PacientName';
import './MainPage.scss'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function MainPage() {


  let history = useHistory();
  const [pacientName, setPacientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [dataVisit, setDataVisit] = useState('');
  const [pacientComplaint, setPacientComplaint] = useState('');
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/allVisits').then(res => {
      setAllData(res.data.data);
    });
  }, [setAllData])

  const handleSubmit = () => {
    axios.post('http://localhost:8000/newVisit', {
      pacientName: pacientName, 
      doctorName: doctorName,
      dateOfVisit: dataVisit,
      complaintText: pacientComplaint
    }).then(res => {
      setAllData(res.data.data);
    });
    setPacientName('')
    setDoctorName('')
    setDataVisit('')
    setPacientComplaint('')
  }

  const doctorsList = [
    'Иванов Иван Иванович',
    'Николаев Семен Петрович',
    'Петров Иван Владимирович'  
  ]

  return (
    <div className='mainPage'>
        <div className='header-main'>
          <div className='header-logo'>
            <img src={logo1} alt=""></img>
            <h1>Приемы</h1>
          </div>

          <div className='header-button-block'>
            <Button 
              className='header-button' 
              variant="outlined"
              onClick={()=> history.push('/registration')}
            >
              Выход
            </Button>
          </div>
        </div>
        <div className='middle-header'>
          <div className='data-block'>
            <p>Имя:</p>
            <TextField 
              onChange={(e) => setPacientName(e.target.value)}
              id="outlined-basic1" 
              label="Имя пациента" 
              variant="outlined" 
              value={pacientName}
              autoComplete='off'
            />
          </div>

          <div className='data-block'>
            <p>Врач:</p>
            <FormControl variant="outlined" >
              <InputLabel id="demo-simple-select-outlined-label">Имя врача</InputLabel>
              <Select
                value={doctorName}                
                onChange={(e) => setDoctorName(e.target.value)}
                label="Имя врача"
              >
                {
                  doctorsList.map (element => {
                    return (
                      <MenuItem value={element}>
                        <em>{element}</em>
                      </MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </div>

          <div className='data-block'>
            <p>Дата:</p>
              <TextField
                onChange={(e) => setDataVisit(e.target.value)}
                id="date"
                label="Дата приема"
                type="date"      
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={dataVisit}
                autoComplete='off'
              />
          </div>

          <div className='data-block'>
            <p>Жалобы:</p>
            <TextField 
              onChange={(e) => setPacientComplaint(e.target.value)}
              id="outlined-basic4" 
              label="Жалобы пациента" 
              variant="outlined" 
              value={pacientComplaint}
              autoComplete='off'
            />
          </div>

          <div className='middle-header-button'>
            <Button 
              className='middle-header-button' 
              variant="outlined"
              onClick={() => handleSubmit()}
            >
              Добавить
            </Button>
          </div>
        </div>

        <div className='list-main'>
          <div className='list-header'>
            <div className='list-header-name'>
              <p>Имя</p>
            </div>
            <div className='list-header-name'>
              <p>Врач</p>
            </div>
            <div className='list-header-name'>
              <p>Дата</p>
            </div>
            <div className='list-header-name'>
              <p>Жалоба</p>
            </div>
            <div></div>
          </div>
        </div>
          <PacientName 
            allData={allData}
          />
    </div>
  )
}

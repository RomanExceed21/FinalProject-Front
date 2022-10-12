import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, IconButton, Fab, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import logo1 from '../../img/logo1.png';
import PacientName from './Components/PacientName';
import './MainPage.scss';

const MainPage = () => {
  const history = useHistory();
  let temp = null;
  
  const [pacientName, setPacientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [dataVisit, setDataVisit] = useState('');
  const [pacientComplaint, setPacientComplaint] = useState('');
  const [allData, setAllData] = useState([]);
  const [sortValue, setSortValue] = useState('_id');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  const [showSortDirect, setShowSortDirect] = useState('asc');
  const [showFilter, setShowFilter] = useState(false);

  const doctorsList = [
    'Иванов Иван Иванович',
    'Николаев Семен Петрович',
    'Петров Иван Владимирович',
    'Сидоров Иван Александрович'  
  ];

  const currencies = [
    {
      value: '_id',
      label: '',
    },
    {
      label: 'Имя пациента',
      value: 'pacientName',
    },
    {
      label: 'Имя врача',
      value: 'doctorName',
    },
    {
      label: 'Дата',
      value: 'dateOfVisit',
    },
    {
      label: 'Жалоба',
      value: 'complaintText',
    }
  ];

  const currenciesDirect = [
    {
      label: 'По возрастанию',
      value: 'asc',
    },
    {
      label: 'По убыванию',
      value: 'desc',
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/allVisits', {
      headers: {
        'Authorization': `${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8'
    },
    }).then(res => {
      setAllData(res.data.data);
    });
  }, [setAllData])


  const exitFunc = () => {
    history.push('/autorization');
    localStorage.clear();
  }

  const handleSubmit = () => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:8000/newVisit', {
      pacientName, 
      doctorName,
      dateOfVisit: dataVisit,
      complaintText: pacientComplaint
    }, {headers: {
      Authorization: `${token}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=utf-8'
  }}).then(res => {
      setPacientName('');
      setDoctorName('');
      setDataVisit('');
      setPacientComplaint('');
      setAllData(res.data.data);
    });
  }

  const handleSort = (e) => {
    setSortValue(e.target.value);   
    allData.sort((a, b) => a[e.target.value] > b[e.target.value] ? 1 : a[e.target.value] < b[e.target.value] ? -1 : 0);
    setAllData([...allData]); 
  }

  const changeSortDirect = (e) => {
    setShowSortDirect(e.target.value);
    allData.reverse();
    setAllData([...allData]); 
  }

  const filterDate = (filterDateFrom, filterDateTo) => {
    if (!filterDateTo) {
      temp = allData.filter(allData => allData.dateOfVisit >= filterDateFrom)
    } 
    if (!filterDateFrom) {
      temp = allData.filter(allData => allData.dateOfVisit <= filterDateTo)
    }
    if (filterDateFrom && filterDateTo) {
      temp = allData.filter(allData => allData.dateOfVisit >= filterDateFrom && allData.dateOfVisit <= filterDateTo)
    }
    setAllData([...temp]); 
  }

  const filterClear = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/allVisits', {
      headers: {
        'Authorization': `${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8'
      },
    }).then(res => {
      setAllData(res.data.data);
      setShowFilter(false);
      setFilterDateFrom('');
      setFilterDateTo('');
    });
  }
  
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
              onClick={() => exitFunc()}
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
              className='data-block-input'
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
                className='data-block-input'
                value={doctorName}                
                onChange={(e) => setDoctorName(e.target.value)}
                label="Имя врача"
              >
                {
                  doctorsList.map ((element, index) => {
                    return (
                      <MenuItem key={index} value={element}>
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
                className='data-block-input'
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
              className='data-block-input'
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
              disabled={(!pacientName || !doctorName || !dataVisit ||!pacientComplaint)}
            >
              Добавить
            </Button>
          </div>
        </div>
        <div className='sorted-block'>
          <div className='sorted-block-method'>
            <p>Сортировать по:</p>
            <TextField
              id="outlined-select-currency-native"
              select
              className='input-sort'
              onChange={(e) => handleSort(e)}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
            >
            { currencies.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )) }
            </TextField>
          </div>
          {(sortValue !== '_id') 
            ? <div className='sorted-block-direction'>
              <p>Направление:</p>
              <TextField
                id="outlined-select-currency-native"
                select
                className='input-sort'
                onChange={(e) => changeSortDirect(e)}
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
              >
              {currenciesDirect.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              </TextField>
              </div>
            : <></>
          }
          <div className='add-filter-block'>
            <p>Добавить фильтр по дате:</p>
            <Fab 
              onClick={() => setShowFilter(true)}
              className='add-filter-button' 
              color="primary" 
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
        
        {
          (showFilter)
          ? <div className='filter-block'>
              <div className='filter-components'>
                <div className='filter-components-block'>
                  <p>c:</p>
                  <TextField  
                    onChange={(e) => setFilterDateFrom(e.target.value)}
                    id="date"
                    label="Дата приема"
                    type="date"      
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={filterDateFrom}
                    autoComplete='off'
                  />
                </div>
                <div className='filter-components-block'>
                  <p>по:</p>
                  <TextField
                    onChange={(e) => setFilterDateTo(e.target.value)}
                    id="date"
                    label="Дата приема"
                    type="date"      
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={filterDateTo}
                    autoComplete='off'
                  />
                </div>
                <div className='filter-buttons-block'>
                  <Button 
                    variant="outlined"
                    onClick={() => filterDate(filterDateFrom, filterDateTo)}
                  >
                    Фильтровать
                  </Button>
                  <IconButton 
                    aria-label="delete" 
                    className=''
                    onClick={() => filterClear()}
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </div>
              </div>
            </div>
          : <></>
        }
        <div className='footer'>
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
            </div>
          </div>
          <div className='block-for-components'>
            <PacientName 
              allData={allData}
              setAllData={setAllData}
              pacientName={pacientName}
              doctorName={doctorName}
              dataVisit={dataVisit}
              pacientComplaint={pacientComplaint}
            />
          </div>
        </div>
    </div>
  )
}

export default MainPage;
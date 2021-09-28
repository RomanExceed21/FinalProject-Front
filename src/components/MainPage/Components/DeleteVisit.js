import axios from 'axios';
import Button from '@material-ui/core/Button';
import './DeleteVisit.scss';

const DeleteVisit = ({modalActiveDel, setModalActiveDel, index, setAllData, allData, inputDelMessage}) => {  
  const { _id } = allData[index];

  const removeVisit = () => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:8000/deleteVisit?_id=${_id}`, {
      headers: {
        Authorization: `${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8' 
    }}).then(res => {
      setAllData(res.data.data);   
      setModalActiveDel(false);   
    });
  }
  
  return (
    <div className={modalActiveDel >= 0 ? 'modal active' : 'modal'}>
      <div className='modal-content'>
        <div className='delete-header'>
          <h1>Удалить прием</h1>
        </div>
        <div className='delete-middle'>
          <p>Вы действительно хотите удалить прием?</p>
        </div>
        <div className='delete-footer'>
          <Button 
            className='delete-footer-button' 
            variant="outlined"
            onClick={() => removeVisit()}
          >
            Delete
          </Button>
          <Button 
            className='delete-footer-button' 
            variant="outlined"
            onClick={() => setModalActiveDel(false)}
          >
            Cancel
          </Button>
        </div>
      </div>      
    </div>
  )
}

export default DeleteVisit;
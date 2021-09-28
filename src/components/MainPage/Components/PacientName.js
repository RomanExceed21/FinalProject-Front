import React, { useState } from 'react';
import DeleteVisit from './DeleteVisit';
import EditVisits from './EditVisits';
import trash from '../../img/trash.svg';
import pencil from '../../img/pencil.svg';
import './PacientName.scss';

const PacientName = ({allData, setAllData}) => {
  const [modalActiveDel, setModalActiveDel] = useState(false);
  const [modalActiveEdit, setModalActivEdit] = useState('');

  return (
    allData.map((value, index) => {
      const { pacientName, doctorName, dateOfVisit, complaintText } = value;
      return (
        <div key = {`data-${index}`} className='total-list'>

          <div className='total-list-block'>
            <p>{pacientName}</p>
          </div>
          <div className='total-list-block'>
            <p>{doctorName}</p>
          </div>
          <div className='total-list-block'>
            <p>{dateOfVisit}</p>
          </div>
          <div className='total-list-block'>
            <p>{complaintText}</p>
          </div>
          <div className='total-list-buttons'>
            <img  
              src={trash} 
              alt=''
              onClick={() => setModalActiveDel(index)} 
            />
            <img  
              src={pencil} 
              alt=''
              onClick={() => setModalActivEdit(index)} 
            />
          </div>  
          {modalActiveDel && <DeleteVisit 
            modalActiveDel={modalActiveDel}
            setModalActiveDel={setModalActiveDel}
            setAllData={setAllData}
            allData={allData}
            index={index}
          />}
          {modalActiveEdit && <EditVisits 
            modalActiveEdit={modalActiveEdit}
            setModalActivEdit={setModalActivEdit}
            setAllData={setAllData}
            allData={allData}
            value={value}
            index={index}
          />}
        </div>
      )
    })    
  )
}

export default PacientName;
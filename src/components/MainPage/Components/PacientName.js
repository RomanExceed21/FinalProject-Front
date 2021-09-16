import React from 'react'
import './PacientName.scss'
import trash from '../../img/trash.svg'
import pencil from '../../img/pencil.svg'

export default function PacientName({allData}) {

  const delData = () => {
    console.log('DELETE')
  }
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
              onClick={() => delData()} 
            />
            <img  
              src={pencil} 
              alt=''
              onClick={() => console.log('pencil')} 
            />
          </div>  

        </div>
      )
    })
  )
}

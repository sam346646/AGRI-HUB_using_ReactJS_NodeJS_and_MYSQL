import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import CustomModal from '../components/CustomModal';

function ViewAdminOrders() {

  const [user, setUser] = useState('farmer')
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [order, setOrder] = useState()

  const [errName, setErrName] = useState()
  const [errEmail, setErrEmail] = useState()

  const searchHandle = () => {
    Axios.post('http://localhost:8000/admin/getorder', { user, email, name }).then((response) => {
      setOrder(response.data)
    })
    console.log(order)
  }


  return (
    <div className='content_area'>
      <Breadcrumbs breadcrumbs_title='Orders' breadcrumbs_icon='cubes' />

      <div className='mx-auto w-50'>
        <div className="input-group">
          <input type="text" className="form-control" value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() =>
              /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email) ? setErrEmail('') : setErrEmail(`Please provide a valid ${user} email.`)
            }
            maxLength='20' autoComplete="off" placeholder={`Search by ${user} email`} required />
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Search by user</button>
          <ul className="dropdown-menu">
            <li><button className="dropdown-item" onClick={() => setUser('farmer')}>Search by farmer</button></li>
            <li><button className="dropdown-item" onClick={() => setUser('retailer')}>Search by retailer</button></li>
          </ul>
        </div>
        <span className='text-danger'>{errEmail}</span>

        <div class="input-group mt-3">
          <input type="text" class="form-control" value={name}
            onChange={(e) => {
              if (/^[A-Za-z ]*$/.test(e.target.value)) {
                setName(e.target.value)
                setErrName('')
              }
              else {
                setErrName(`Please provide valid [roduct] name.`)
              }
            }
            }
            onBlur={() => (name === '') ? setErrName(`Please provide product name.`) : setErrName('')}
            className="form-control" maxLength='30' autoComplete="off" placeholder='Search by product name' required />
          <span class="input-group-text"><i className='fa fa-search'></i></span>
        </div>
        <span className='text-danger'>{errName}</span>

        <div className="form-group my-4">
          <button className="form-control btn btn-success" onClick={() => searchHandle()}>Search</button>
        </div>
      </div>
    </div>
  )
}

export default ViewAdminOrders
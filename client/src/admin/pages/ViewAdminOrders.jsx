import React, { useEffect, useState } from 'react'
import Axios from 'axios';

import Breadcrumbs from '../components/Breadcrumbs';
import CustomModal from '../components/CustomModal';
import PinnedQuery from '../components/PinnedQuery';

function ViewAdminOrders() {

  const [user, setUser] = useState('farmer')
  const [isId, setIsId] = useState(true)
  const [searchData, setSearchData] = useState()
  const [orderList, setOrderList] = useState()
  const [isOrderEnabled, setIsOrderEnabled] = useState(false)
  const [isManageOrderEnabled, setIsManageOrderEnabled] = useState(false)
  const [isEditEnabled, setIsEditEnabled] = useState(false)
  const [selectedOption, setSelectedOption] = useState()
  const [orders, setOrders] = useState()

  const [qty, setQty] = useState()
  const [price, setPrice] = useState()
  const [profit, setProfit] = useState()
  const [shippingCharge, setShippingCharge] = useState()
  const [status, setStatus] = useState()

  const statusList = ['Retailer placed order.', `Waiting for retailer's confirmation.`, 'Farmer confirmed order.', 'Retailer confirmed order.', 'Farmer cancelled the order.', 'Retailer cancelled the order.', 'Order delivered successfully.']

  const searchHandle = () => {
    Axios.post('http://localhost:8000/admin/getorder', { user, isId, searchData }).then((response) => {
      setOrderList(response.data)
      setIsOrderEnabled(true)
    })
  }

  const getOrder = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setOrders(orderList.filter(order => order.Order_id == selectedValue))
    setIsManageOrderEnabled(true)
  }

  const editBtn = () => {
    setIsEditEnabled(true)
    setQty(orders[0].Quantity)
    setPrice(orders[0].Price)
    setProfit(orders[0].Profit)
    setShippingCharge(orders[0].Extra_charge)
    setStatus(orders[0].Order_status)
  }

  const updateBtn = () => {
    Axios.put('http://localhost:8000/admin/updateorder', { id: orders[0].Order_id, qty, price, profit, shippingCharge, status }).then((response) => {
      setIsOrderEnabled(false)
      setIsManageOrderEnabled(false)
      setIsEditEnabled(false)
    })
  }


  return (
    <div className='content_area pb-5'>
      <Breadcrumbs breadcrumbs_title='Orders' breadcrumbs_icon='cubes' />
      <div className="row">
        <div className="col-10">
          <div className='mx-auto w-50'>
            <div className="input-group">
              <input type="text" className="form-control" value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
                maxLength='20' autoComplete="off" placeholder={`Search by ${user} ${(isId) ? 'id' : 'email'}`} required />
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Search options</button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => { setUser('farmer'); setIsId(true) }}>Search by farmer id</button></li>
                <li><button className="dropdown-item" onClick={() => { setUser('farmer'); setIsId(false) }}>Search by farmer email</button></li>
                <li><button className="dropdown-item" onClick={() => { setUser('retailer'); setIsId(true) }}>Search by retailer id</button></li>
                <li><button className="dropdown-item" onClick={() => { setUser('retailer'); setIsId(false) }}>Search by retailer email</button></li>
              </ul>
            </div>

            <div className="form-group my-3">
              <button className="form-control btn btn-success" onClick={() => searchHandle()}>Search</button>
            </div>

            {
              (isOrderEnabled) &&
              <div className="form-group mb-3">
                <select value={selectedOption} onChange={getOrder} className="form-select" required>
                  {
                    orderList.map((order, index) => (
                      <option key={index} value={order.Order_id}>
                        {order.Order_id} -&gt; {order.Prod_name} -&gt; {order.Retailer_name} -&gt; QTY:{order.Quantity}
                      </option>
                    ))
                  }
                </select>
              </div>
            }

            {
              (isManageOrderEnabled) &&
              <div className='bg-white p-4 rounded shadow-sm text-secondary'>
                <div className='text-dark text-center fw-bold fs-4'>Order Details</div>
                <div>Product name: {orders[0].Prod_name}</div>
                <div>Order id: {orders[0].Order_id}</div>
                <div>Order date: {new Date(orders[0].Order_date).toISOString().split('T')[0]}</div>
                <div>Order quantity: {orders[0].Quantity}</div>
                <div>Order Price: {orders[0].Price}</div>
                <div>Status: {orders[0].Order_status}</div>
                <button onClick={editBtn} className="btn btn-secondary me-3 mt-3">Edit</button>
              </div>
            }

            {
              (isEditEnabled) &&
              <>
                <div className='text-dark text-center fw-bold fs-4 mt-4'>Edit Details</div>
                <div className="form-group mb-3">
                  <label className="form-label">Quantity</label>
                  <input type="text" value={qty}
                    onChange={(e) => {
                      if (/^[0-9]*$/.test(e.target.value)) {
                        setQty(e.target.value)
                      }
                    }
                    }
                    className="form-control" maxLength='30' autoComplete="off" required />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Price</label>
                  <input type="text" value={price}
                    onChange={(e) => {
                      if (/^[0-9]*$/.test(e.target.value)) {
                        setPrice(e.target.value)
                      }
                    }
                    }
                    className="form-control" maxLength='30' autoComplete="off" required />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Profit</label>
                  <input type="text" value={profit}
                    onChange={(e) => {
                      if (/^[0-9]*$/.test(e.target.value)) {
                        setProfit(e.target.value)
                      }
                    }
                    }
                    className="form-control" maxLength='30' autoComplete="off" required />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Shipping Charge</label>
                  <input type="text" value={shippingCharge}
                    onChange={(e) => {
                      if (/^[0-9]*$/.test(e.target.value)) {
                        setShippingCharge(e.target.value)
                      }
                    }
                    }
                    className="form-control" maxLength='30' autoComplete="off" required />
                </div>

                <label className="form-label">Status</label>
                <select class="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {
                    statusList.map((s, index) => (
                      <option key={index} value={s}>{s}</option>
                    ))
                  }
                </select>

                <button className="btn btn-secondary me-3 mt-3 form-control" data-bs-toggle="modal" data-bs-target="#insertBtn">Update</button>
                <CustomModal message={`You are going to update the order`} action={updateBtn} modId='insertBtn' />
              </>
            }
          </div>
        </div>

        <div className="col-2">
          <PinnedQuery />
        </div>
      </div>
    </div>
  )
}

export default ViewAdminOrders
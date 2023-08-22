import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import CustomModal from '../components/CustomModal';
import PinnedQuery from '../components/PinnedQuery';

function ViewAdminProducts() {

    const [isId, setIsId] = useState(true)
    const [searchData, setSearchData] = useState()
    const [isProdEnabled, setIsProdEnabled] = useState(false)
    const [isManageProdEnabled, setIsManageProdEnabled] = useState(false)
    const [isEditEnabled, setIsEditEnabled] = useState(false)
    const [selectedOption, setSelectedOption] = useState()
    const [prods, setProds] = useState([])

    const [name, setName] = useState()
    const [qty, setQty] = useState()
    const [price, setPrice] = useState()
    const [status, setStatus] = useState()

    const searchHandle = () => {
        Axios.post('http://localhost:8000/admin/getproduct', { isId, searchData }).then((response) => {
            setProds(response.data)
            setIsManageProdEnabled(true)
        })
    }

    const editBtn = () => {
        setIsEditEnabled(true)
        setName(prods[0].Prod_name)
        setQty(prods[0].Prod_qty)
        setPrice(prods[0].Prod_price)
        setStatus(prods[0].Prod_status)
    }

    const updateBtn = () => {
        Axios.put('http://localhost:8000/admin/updateproduct', { id: prods[0].Prod_id, name, qty, price, status }).then((response) => {
            setIsManageProdEnabled(false)
            setIsEditEnabled(false)
        })
    }


    return (
        <div className='content_area pb-5'>
            <Breadcrumbs breadcrumbs_title='Products' breadcrumbs_icon='tag' />
            <div className="row">
                <div className="col-lg-10">
                    <div className='mx-auto w-50 w-md-100'>
                        <div className="input-group">
                            <input type="text" className="form-control" value={searchData}
                                onChange={(e) => setSearchData(e.target.value)}
                                maxLength='20' autoComplete="off" placeholder={`Search by product ${(isId) ? 'id' : 'name'}`} required />
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Search options</button>
                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item" onClick={() => setIsId(true)}>Search by product id</button></li>
                                <li><button className="dropdown-item" onClick={() => setIsId(false)}>Search by product name</button></li>
                            </ul>
                        </div>

                        <div className="form-group my-3">
                            <button className="form-control btn btn-success" onClick={() => searchHandle()}>Search</button>
                        </div>



                        {
                            (isManageProdEnabled) && prods ? (
                                prods.length === 0 ? (
                                    <span className="text-danger">*No products found</span>
                                ) : (
                                    <div className='bg-white p-4 rounded shadow-sm text-secondary'>
                                        <div className='text-dark text-center fw-bold fs-4'>Product Details</div>
                                        <div>Product name: {prods[0].Prod_name}</div>
                                        <div>Quantity: {prods[0].Prod_qty}</div>
                                        <div>Price: {prods[0].Prod_price}</div>
                                        <div>Status: {prods[0].Prod_status}</div>
                                        <button onClick={editBtn} className="btn btn-secondary me-3 mt-3">Edit</button>
                                    </div>
                                )
                            ) : null
                        }

                        {
                            (isEditEnabled) &&
                            <>
                                <div className='text-dark text-center fw-bold fs-4 mt-4'>Edit Details</div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" value={name}
                                        onChange={(e) => {
                                            if (/^[A-Za-z ]*$/.test(e.target.value)) {
                                                setName(e.target.value)
                                            }
                                        }
                                        }
                                        className="form-control" maxLength='30' autoComplete="off" required />
                                </div>

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
                                    <label className="form-label">Status</label>
                                    <input type="text" value={status}
                                        onChange={(e) => {
                                            if (/^[0-9]*$/.test(e.target.value)) {
                                                setStatus(e.target.value)
                                            }
                                        }
                                        }
                                        className="form-control" maxLength='30' autoComplete="off" required />
                                </div>

                                <button className="btn btn-secondary me-3 mt-3 form-control" data-bs-toggle="modal" data-bs-target="#insertBtn">Update</button>
                                <CustomModal message={`You are going to update the order`} action={updateBtn} modId='insertBtn' />
                            </>
                        }
                    </div>
                </div>

                <div className="col-lg-2">
                    <PinnedQuery />
                </div>
            </div>
        </div>
    )
}

export default ViewAdminProducts
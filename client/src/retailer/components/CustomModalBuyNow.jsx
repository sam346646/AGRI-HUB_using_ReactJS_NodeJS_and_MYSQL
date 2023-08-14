import Axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CustomModalBuyNow({ qty, price, prodId, prodName, modId }) {

    const navigate=useNavigate()

    const [verifyCode,setVerifyCode]=useState()

    const placeOrder = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('retailer_id', localStorage.getItem('usrId'))
        formdata.append('prod_id', prodId)
        formdata.append('qty', qty)
        formdata.append('price', price)
        Axios.post('http://localhost:8000/order/insert', formdata);
        Axios.delete(`http://localhost:8000/retailer/deletecartitem/${modId}`);
        navigate("../view_orders");
    }

    return (
        <div class="modal fade" id={modId}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdroporderModalLabelLabel">You are one step away from buying</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body mx-5">
                        <div className='float-end'>
                            {qty} * {price / qty} -&gt; <span className='fs-4 text-success'>Rs. {price}</span><br />
                        </div>
                        <div>
                            <div className='text-dark fs-4 fw-bold'>{prodName}</div>
                            Quantity: {qty}
                        </div>

                        <div className='text-center mt-5'>
                            <div>[{price}] <br /><span className='text-danger'>Enter number shown above ....</span></div>
                            <input type='number' value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} className='form-control form-control-sm w-25 mx-auto' />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={placeOrder} disabled={Number(verifyCode) !== Number(price)}>Buy now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomModalBuyNow

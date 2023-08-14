import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CustomModalVerifyRetailer({ modId, orderId }) {

    const formattedOtp = orderId.toString().padEnd(4, '0');

    const navigate = useNavigate()

    const [otp, setOtp] = useState()
    const [earn, setEarn] = useState()
    const [errOtp, setErrOtp] = useState()
    const [isvalid, setIsvalid] = useState(false)
    const [isDeliver, setIsDeliver] = useState(false)

    useEffect(()=>{
        if(errOtp || !earn || !otp){
            setIsDeliver(false)
        }
        else{
            setIsDeliver(true)
        }
    },[errOtp, earn, otp])

    const handleDelivery=()=>{
        const formdata = new FormData();
        formdata.append('orderId', orderId)
        formdata.append('earn', earn)
        Axios.put('http://localhost:8000/order/successUpdate', formdata).then((response) => {
        });
        navigate("/farmer");
    } 

    return (
        <div class="modal fade" id={modId} tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">You are one step away from delivering.</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div className="form-group mb-3">
                            <label className="form-label">Enter delivery code received by retailer after delivery.</label>
                            <div class="input-group input-group-sm mb-3 mx-auto w-50">
                                <input type="text" class="form-control"
                                    value={otp}
                                    onChange={(e) => {
                                        if (/^[0-9]*$/.test(e.target.value)) { setOtp(e.target.value) }
                                    }
                                    }
                                    placeholder="Enter Delivery code" disabled={isvalid} required />
                                <button class="btn btn-primary"
                                    onClick={() => {
                                        if (otp !== formattedOtp) {
                                            setIsvalid(false)
                                            setErrOtp('Delivery code didn\'t match.')
                                        }
                                        else {
                                            setIsvalid(true)
                                            setErrOtp('')
                                        }
                                    }
                                    } disabled={isvalid}>{(isvalid) ? <i className='fa fa-check-circle-o'></i> : 'Verify'}</button>

                            </div>
                            <span class="text-danger" aria-live="polite">{errOtp}</span>
                        </div>

                        <div className="form-group mb-3" hidden={!isvalid}>
                            <label className="form-label">Total profit earned by selling this product.</label>
                            <input type="text" class="form-control form-control-sm w-50 mx-auto"
                                value={earn}
                                onChange={(e) => (/^[0-9]*$/.test(e.target.value)) ? setEarn(e.target.value) :null}
                                placeholder="Rs.10000" required />
                        </div>


                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-success btn-sm" data-bs-dismiss="modal" onClick={handleDelivery} disabled={!isDeliver}>Deliver the product</button>
                        <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CustomModalVerifyRetailer
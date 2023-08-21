import Axios from 'axios'
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import OrderStatusContainer from './OrderStatusContainer';
import CustomModal from './CustomModal';
import CustomModalVerifyRetailer from './CustomModalVerifyRetailer';

function ViewOrder({ choice }) {

    const navigate = useNavigate()

    const [orderList, setOrderList] = useState([])

    const [charge, setCharge] = useState()
    const [actualCharge, setActualCharge] = useState()
    const [isDisabled, setIsDisabled] = useState(true)
    const [isContentAvailiable, setIsContentAvailiable] = useState(true)
    const [acceptButtonContent, setAcceptButtonContent] = useState('Accept')
    const [cancelButtonContent, setCancelButtonContent] = useState('Cancel')
    const [reload, setReload] = useState(false)

    useEffect(() => {
        Axios.get('http://localhost:8000/order/getallfarmer', { params: { choice: choice, temp: localStorage.getItem('usrId') } }).then((response) => {
            setOrderList(response.data)
            setReload(false)
        })
    }, [reload, choice])

    useEffect(() => {
        (orderList.length !== 0) ? setIsContentAvailiable(true) : setIsContentAvailiable(false);
    }, [orderList]);


    const mainAcceptHandle = () => {
        setIsDisabled(true);
        setAcceptButtonContent('Accept')
        setCancelButtonContent('Cancel')
    }

    const changeHandle = () => {
        setIsDisabled(false)
        setAcceptButtonContent('Update Shipping Charge')
        setCancelButtonContent('Reset')
    }

    const acceptHandle = (id) => {
        let status;
        if (errCharge === '') {
            if (acceptButtonContent === 'Update Shipping Charge' && charge !== actualCharge) {
                status = "Waiting for retailer's confirmation."
            }
            else {
                status = "Farmer confirmed order."
            }
            const formdata = new FormData();
            formdata.append('status', status)
            formdata.append('charge', charge)
            Axios.put(`http://localhost:8000/order/changestatus/${id}`, formdata).then(() => {
                navigate("/farmer");
                setReload(true);
            })
        }
    }


    const cancelHandle = () => {
        setIsDisabled(true);
        setCharge(actualCharge);
        setAcceptButtonContent('Accept')
        setCancelButtonContent('Cancel')
    }

    const cancelOrder = (id) => {
        let status = 'Farmer cancelled the order.'
        const formdata = new FormData();
        formdata.append('status', status)
        Axios.put(`http://localhost:8000/order/changestatus/${id}`, formdata).then(() => {
            navigate("/farmer");
            mainAcceptHandle()
            setReload(true);
        })
    }

    //Validation
    const [errCharge, setErrCharge] = useState()
    useEffect(() => {
        (charge < actualCharge) ? setErrCharge(`Charge should be greater than ${actualCharge - 1}`) : setErrCharge('');
    }, [charge])

    return (
        <>
            <div style={(isContentAvailiable === true) ? { display: 'none' } : null} className='text-danger fw-bold fs-5'>
                *Sorry, No orders availiable.<br /><br />
            </div>
            <div style={(isContentAvailiable === true) ? null : { display: 'none' }}>
                {
                    orderList.map((order, i) => {
                        return (
                            <div className="row">
                                <div className="col-8 mb-5">
                                    <div className="card shadow-sm">
                                        <div className='card-header text-secondary bg-white'>
                                            <div className='row px-2'>
                                                <div className="col-8">
                                                    <div className='fs-3 fw-bold fst-italic text-success mb-3'>{order.Prod_name}</div>

                                                    Price: <b className='fs-5'>Rs.{order.Price}</b> + {(order.Order_status === 'Retailer confirmed order.') ? order.Extra_charge : order.Shipping_charge} (Shipping Charge)

                                                    <div className='mb-3'>
                                                        <div>Quantity: {order.Quantity}</div>
                                                        <div className='text-success'><i className='fa fa-cube'></i> Quantity availiable: {order.Prod_qty}</div>
                                                    </div>

                                                    <div className='mt-3'>Retailer: {order.Retailer_name}, {order.Retailer_area}, {order.Retailer_village}, {order.Retailer_district}.</div>
                                                </div>
                                                <div className="col-4">
                                                    <img src={`http://localhost:8000/includes/images/${order.Prod_image1}`} alt="" width='190' height='190' className='rounded' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='card-footer'>
                                            <span className="float-end">
                                                {
                                                    (/^(Retailer|Farmer) cancelled the order\.$/.test(order.Order_status)) ?
                                                        <span className='text-danger fw-bold me-2'><i className='fa fa-bomb'></i> Order cancelled</span>
                                                        : null
                                                }

                                                {
                                                    (/^(Retailer|Farmer) confirmed order\.$/.test(order.Order_status)) ?
                                                        <>
                                                            <button className='btn btn-success btn-sm me-2' data-bs-toggle="modal" data-bs-target={`#${order.Order_id}d`}>
                                                                Verify Retailer
                                                            </button>
                                                            <CustomModalVerifyRetailer modId={`${order.Order_id}d`} orderId={`${order.Order_id}`} />
                                                        </>
                                                        : null
                                                }

                                                {
                                                    (order.Order_status === 'Retailer placed order.') ?
                                                        <>
                                                            <button className='btn btn-success btn-sm me-2' onClick={() => { setCharge(order.Shipping_charge); setActualCharge(order.Shipping_charge); mainAcceptHandle() }} data-bs-toggle="modal" data-bs-target={`#acceptModal${i}`}>
                                                                Accept
                                                            </button>
                                                        </>
                                                        : null
                                                }
                                                <div class="modal fade" id={`acceptModal${i}`} tabindex="-1" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header align-items-start">
                                                                <h5> <b>Are you sure?</b></h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                            </div>

                                                            <div class="modal-body mx-5">
                                                                <label class="form-label">Shipping Charge</label>
                                                                <div class="input-group">
                                                                    <input type="text" name="charge" value={charge} onChange={(e) => (/^[0-9]*$/.test(e.target.value)) ? setCharge(e.target.value) : null} className="form-control" required disabled={isDisabled} />
                                                                    <button className='btn btn-secondary' onClick={changeHandle}><i className='fa fa-pencil'></i> Change</button>
                                                                </div>
                                                                <div class="text-danger" aria-live="polite" id="errorContainer">{errCharge}</div>
                                                            </div>

                                                            <div class="modal-footer">
                                                                <button className='btn btn-success btn-sm me-1' data-bs-dismiss="modal" onClick={() => acceptHandle(order.Order_id)}>
                                                                    {acceptButtonContent}
                                                                </button>

                                                                <button className='btn btn-danger btn-sm' data-bs-dismiss={(cancelButtonContent === 'Reset') ? null : 'modal'} onClick={(cancelButtonContent === 'Reset') ? cancelHandle : null}>
                                                                    {cancelButtonContent}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {
                                                    (/^(Retailer|Farmer) cancelled the order\.$/.test(order.Order_status) || order.Order_status === 'Order delivered successfully.') ?
                                                        null
                                                        :
                                                        <>
                                                            <button className='btn btn-danger btn-sm me-2' data-bs-toggle="modal" data-bs-target={`#${order.Order_id}a`}>
                                                                Cancel
                                                            </button>
                                                        </>
                                                }
                                                <CustomModal message={`You are cancelling the order`} action={() => cancelOrder(order.Order_id)} modId={`${order.Order_id}a`} />

                                                {
                                                    (order.Order_status === 'Order delivered successfully.') ?
                                                        <span className='text-success'><i className='fa fa-magic'></i> Congratulations! Your order has been successfully completed!</span>
                                                        :
                                                        null
                                                }

                                            </span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 mt-4">
                                    <OrderStatusContainer status={order.Order_status} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ViewOrder

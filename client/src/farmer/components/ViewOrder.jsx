import Axios from 'axios'
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import OrderStatusContainer from './OrderStatusContainer';
import CustomModal from './CustomModal';

function ViewOrder({ choice }) {

    const navigate = useNavigate()

    const [orderList, setOrderList] = useState([])

    const [charge, setCharge] = useState()
    const [actualCharge, setActualCharge] = useState()
    const [extraCharge, setExtraCharge] = useState()
    const [isDisabled, setIsDisabled] = useState(true)
    const [isContentAvailiable, setIsContentAvailiable] = useState(true)
    const [acceptButtonContent, setAcceptButtonContent] = useState('Accept')
    const [cancelButtonContent, setCancelButtonContent] = useState('Cancel')
    const [acceptButtonMessage, setAcceptButtonMessage] = useState('confirming and accepting the order')
    const [cancelButtonMessage, setCancelButtonMessage] = useState('rejecting the order')
    const [reload, setReload] = useState(false)

    useEffect(() => {
        Axios.get('http://localhost:8000/order/getall', { params: { choice: choice } }).then((response) => {
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
        setAcceptButtonMessage('confirming the order')
        setCancelButtonMessage('cancelling the order')

        const elements = document.querySelectorAll('td.collapse');
        elements.forEach(element => {
            element.classList.remove('show');
        });
    }

    const changeHandle = () => {
        setIsDisabled(false)
        setAcceptButtonContent('Update Shipping Charge')
        setCancelButtonContent('Reset')
        setAcceptButtonMessage("Updating shipping charge. If retailer rejects, Order will be cancelled")
        setCancelButtonMessage("resetting shipping charge to default")
    }

    const acceptHandle = (id, ch) => {
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
                navigate("/");
                setReload(true);
            })
            closeHandle(ch)
        }
    }


    const cancelHandle = (id) => {
        if (cancelButtonContent === 'Reset') {
            setIsDisabled(true);
            setCharge(actualCharge);
            setAcceptButtonContent('Accept')
            setCancelButtonContent('Cancel')
            setAcceptButtonMessage('confirming the order')
            setCancelButtonMessage('cancelling the order')
        }
        else {
            let status = 'Farmer cancelled the order.'
            const formdata = new FormData();
            formdata.append('status', status)
            Axios.put(`http://localhost:8000/order/changestatus/${id}`, formdata).then(() => {
                navigate("/");
                mainAcceptHandle()
                setReload(true);
            })
        }
    }


    const closeHandle = (ch) => {
        const element = document.getElementById(ch);
        if (element) {
            element.classList.remove('show');
        }
    };


    //Validation
    const [errCharge, setErrCharge] = useState()
    useEffect(() => {
        (charge < actualCharge) ? setErrCharge(`Charge should be greater than ${actualCharge - 1}`) : setErrCharge('');
    }, [charge])

    return (
        <>
            <div style={(isContentAvailiable === true) ? { display: 'none' } : null} className='text-danger fw-bold fs-5 mb-4'>&emsp;*Sorry, No orders availiable.</div>
            <div className='mb-4' style={(isContentAvailiable === true) ? null : { display: 'none' }}>
                <table className="table table-striped table-bordered table-hover">
                    <tbody>
                        <tr>
                            <th>Retailer</th>
                            <th>Product</th>
                            <th>Distance</th>
                            <th>Total</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Manage</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {
                            orderList.map((order, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <tr>
                                            <td>{order.Retailer_name},<br />{order.Location}, {order.City}<br />{order.State} </td>
                                            <td className='text-center'>
                                                <span className='fw-bold text-secondary'>{order.Prod_name}</span><br />
                                                <img src={`http://localhost:8000/includes/images/${order.Prod_image1}`} alt="" width='80' height='80' className='mx-auto' /><br />

                                            </td>
                                            <td>17 k.m.</td>
                                            <td>
                                                Rs.{order.Price} + {(order.Order_status==='Retailer confirmed order.') ? order.Extra_charge : order.Shipping_charge} (shipping)
                                            </td>
                                            <td>
                                                Availiable: &nbsp;{order.Prod_qty}<br />
                                                Ordered: &ensp;&nbsp;{order.Quantity}<br />
                                                <div className='fw-bold mt-1'>Remains:&ensp;{order.Prod_qty - order.Quantity}</div>
                                            </td>
                                            <td>
                                                <OrderStatusContainer status={order.Order_status} />
                                            </td>

                                            <td>
                                                <span className='text-danger fw-bold' style={(order.Order_status === 'Retailer cancelled the order.' || order.Order_status === 'Farmer cancelled the order.') ? null : { display: 'none' }}>Cancelled</span>

                                                <button className='btn btn-success btn-sm mb-2' onClick={() => { setCharge(order.Shipping_charge); setActualCharge(order.Shipping_charge); mainAcceptHandle() }} hidden={(order.Order_status === 'Retailer placed order.') ? false : true} data-bs-toggle="collapse" href={`#acceptCollapse${i}`} role="button" aria-expanded="false" aria-controls="acceptCollapse">
                                                    <i className='fa fa-check'></i> Accept
                                                </button><br />

                                                <button className='btn btn-danger btn-sm mb-2' data-bs-toggle="modal" data-bs-target={`#${order.Order_id}a`} hidden={(order.Order_status === 'Retailer cancelled the order.' || order.Order_status === 'Farmer cancelled the order.') ? true : false}>
                                                    <i className='fa fa-close'></i> Cancel
                                                </button><br />
                                                <CustomModal message={`You are cancelling the order`} action={() => cancelHandle(order.Order_id)} modId={`${order.Order_id}a`} />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan='8' class="collapse py-4 text-center" id={`acceptCollapse${i}`}>

                                                <button className='btn btn-light float-end' onClick={() => closeHandle(`acceptCollapse${i}`)}>
                                                    <i className='fa fa-close'></i>
                                                </button>

                                                <div class="input-group mx-auto w-50">
                                                    <span class="input-group-text">Shipping Charge</span>
                                                    <input type="text" name="charge" value={charge} onChange={(e) => (/^[0-9]*$/.test(e.target.value)) ? setCharge(e.target.value) : null} className="form-control" required disabled={isDisabled} />
                                                    <button className='btn btn-secondary' onClick={changeHandle}><i className='fa fa-pencil'></i> Change</button>
                                                </div>
                                                <div class="text-danger" aria-live="polite" id="errorContainer">{errCharge}</div>


                                                <button className='btn btn-success me-1 mt-3' data-bs-toggle="modal" data-bs-target={`#${order.Order_id}b`}>
                                                    {acceptButtonContent}
                                                </button>
                                                <CustomModal message={`You are ${acceptButtonMessage}`} action={() => acceptHandle(order.Order_id, `acceptCollapse${i}`)} modId={`${order.Order_id}b`} />

                                                <button className='btn btn-danger mt-3' data-bs-toggle="modal" data-bs-target={`#${order.Order_id}c`}>
                                                    {cancelButtonContent}
                                                </button>
                                                <CustomModal message={`You are ${cancelButtonMessage}`} action={() => cancelHandle(order.Order_id)} modId={`${order.Order_id}c`} />

                                            </td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ViewOrder

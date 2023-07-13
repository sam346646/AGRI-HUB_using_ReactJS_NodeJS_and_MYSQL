import Axios from 'axios'
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import Breadcrumbs from './Breadcrumbs';
import FormatDate from './FormatDate';
import OrderStatusContainer from './OrderStatusContainer';

function ViewOrder() {

    const navigate = useNavigate()

    const [orderList, setOrderList] = useState([])

    const [charge, setCharge] = useState()
    const [actualCharge, setActualCharge] = useState()
    const [isDisabled, setIsDisabled] = useState(true)
    const [acceptButtonContent, setAcceptButtonContent] = useState('Accept')
    const [cancelButtonContent, setCancelButtonContent] = useState('Cancel')
    const [acceptButtonMessage, setAcceptButtonMessage] = useState('confirming and accepting the order')
    const [cancelButtonMessage, setCancelButtonMessage] = useState('rejecting the order')
    const [reload, setReload] = useState(false)

    useEffect(() => {
        Axios.get('http://localhost:8000/order/getall').then((response) => {
            setOrderList(response.data)
            setReload(false)
        })
    }, [reload])


    const mainAcceptHandle = () => {
        setIsDisabled(true);
        setAcceptButtonContent('Accept')
        setCancelButtonContent('Cancel')
        setAcceptButtonMessage('confirming and accepting the order')
        setCancelButtonMessage('rejecting the order')

        const elements = document.querySelectorAll('td.collapse');
        elements.forEach(element => {
            element.classList.remove('show');
        });
    }

    const changeHandle = () => {
        setIsDisabled(false)
        setAcceptButtonContent('Yes')
        setCancelButtonContent('No')
        setAcceptButtonMessage("sending request to retailer for a change of shipping charge. If retailer rejects, Order will be cancelled")
        setCancelButtonMessage("Resetting shipping charge to default")
    }

    const acceptHandle = (id, ch) => {
        let status;
        if (acceptButtonContent === 'Yes' && charge !== actualCharge) {
            status = "Waiting for retailer approval."
        }
        else {
            status = "Farmer approved order."
        }
        const formdata = new FormData();
        formdata.append('status', status)
        Axios.put(`http://localhost:8000/order/changestatus/${id}`, formdata).then(() => {
            navigate("/");
            setReload(true);
        })
        closeHandle(ch)
    }


    const cancelHandle = (id) => {
        if (cancelButtonContent === 'No') {
            setIsDisabled(true);
            setCharge(actualCharge);
            setAcceptButtonContent('Accept')
            setCancelButtonContent('Cancel')
            setAcceptButtonMessage('confirming and accepting the order')
            setCancelButtonMessage('rejecting the order')
        }
        else {
            let status='Farmer cancelled the order.'
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


    return (
        <div className='mb-4'>
            <Breadcrumbs breadcrumbs_title='Retailer Orders' breadcrumbs_icon='truck' />
            <table className="table table-striped table-bordered table-hover">
                <tbody>
                    <tr>
                        <th>Retailer</th>
                        <th>Product</th>
                        <th>Image</th>
                        <th>Qty Availiable</th>
                        <th>Qty Ordered</th>
                        <th>Price</th>
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
                                        <td>{order.Retailer_name},<br />{order.Location}, {order.City}<br />{order.State}<br />Ordered: <FormatDate dateString={order.Order_date} /> </td>
                                        <td>{order.Prod_name}</td>
                                        <td><img src={`http://localhost:8000/includes/images/${order.Prod_image1}`} alt="" width='60' height='60' /></td>
                                        <td>{order.Prod_qty}</td>
                                        <td>{order.Quantity}</td>
                                        <td>{order.Price}</td>
                                        <td>
                                            <OrderStatusContainer status={order.Order_status} />
                                        </td>

                                        <td>
                                            <button className='btn btn-success btn-sm mb-2' onClick={() => { setCharge(order.Shipping_charge); setActualCharge(order.Shipping_charge); mainAcceptHandle() }} hidden={(order.Order_status==='Retailer placed order.') ? false : true} data-bs-toggle="collapse" href={`#acceptCollapse${i}`} role="button" aria-expanded="false" aria-controls="acceptCollapse">
                                                <i className='fa fa-check'></i> Accept
                                            </button><br />

                                            <button className='btn btn-danger btn-sm mb-2' onClick={() => cancelHandle(order.Order_id)}>
                                                <i className='fa fa-close'></i> Cancel
                                            </button><br />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colspan='8' class="collapse py-4 text-center" id={`acceptCollapse${i}`}>

                                            <button className='btn btn-light float-end' onClick={() => closeHandle(`acceptCollapse${i}`)}>
                                                <i className='fa fa-close'></i>
                                            </button>

                                            <div class="input-group mb-3 mx-auto w-50">
                                                <span class="input-group-text">Shipping Charge</span>
                                                <input type="text" name="charge" value={charge} onChange={(e) => setCharge(e.target.value)} className="form-control" required disabled={isDisabled} />
                                                <button className='btn btn-secondary' onClick={changeHandle}><i className='fa fa-pencil'></i> Change</button>
                                            </div>

                                            <button className='btn btn-success me-1' onClick={() => acceptHandle(order.Order_id, `acceptCollapse${i}`)}>
                                                <i className='fa fa-check'></i> {acceptButtonContent}
                                            </button>

                                            <button className='btn btn-danger' onClick={() => cancelHandle(order.Order_id)}>
                                                <i className='fa fa-close'></i> {cancelButtonContent}
                                            </button>
                                            <div className='text-danger fw-bold mt-2'>
                                                *By clicking "{acceptButtonContent}", you are {acceptButtonMessage}?<br />
                                                *By clicking "{cancelButtonContent}", you are {cancelButtonMessage}?
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ViewOrder

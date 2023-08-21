import Axios from 'axios'
import React, { useState, useEffect } from "react"
import { useNavigate, NavLink } from "react-router-dom";

import OrderStatusContainer from '../components/OrderStatusContainer';
import CustomModal from '../components/CustomModal';
import Footer from './Footer';

function ViewOrder({ choice }) {

    const navigate = useNavigate()

    const [orderList, setOrderList] = useState([])
    const [isContentAvailiable, setIsContentAvailiable] = useState(true)
    const [reload, setReload] = useState(false)

    useEffect(() => {

        Axios.get('http://localhost:8000/order/getallretailer', { params: { choice: choice, temp: localStorage.getItem('usrId')}}).then((response) => {
            setOrderList(response.data)
            setReload(false)
        })
    }, [reload, choice])

    useEffect(() => {
        (orderList.length !== 0) ? setIsContentAvailiable(true) : setIsContentAvailiable(false);
    }, [orderList]);

    const acceptHandle = (id) => {
        let status = "Retailer confirmed order."
        const formdata = new FormData();
        formdata.append('status', status)
        Axios.put(`http://localhost:8000/order/changestatus/${id}`, formdata).then(() => {
            navigate("/retailer/view_orders");
            setReload(true);
        })
    }


    const cancelHandle = (id) => {
        let status = 'Retailer cancelled the order.'
        const formdata = new FormData();
        formdata.append('status', status)
        Axios.put(`http://localhost:8000/order/changestatus/${id}`, formdata).then(() => {
            navigate("/retailer/view_orders");
            setReload(true);
        })
    }

    return (
        <>
            <div className='retailer_content_area container-fluid pt-5 ps-5'>
                <div className="row">
                    <div className="col-3">
                        <div class="card mb-5">
                            <div class="card-header fw-bold fs-5">
                                My Orders
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item list-group-item-action">
                                    <NavLink className='nav-link text-success' to="../view_retailer_orders/1">
                                        <i className='fa fa-cubes'></i> All Orders
                                    </NavLink>
                                </li>
                                <li class="list-group-item list-group-item-action">
                                    <NavLink className='nav-link text-success' to="../view_retailer_orders/2">
                                        <i className='fa fa-bell'></i> Pending Orders
                                    </NavLink>
                                </li>
                                <li class="list-group-item list-group-item-action">
                                    <NavLink className='nav-link text-success' to="../view_retailer_orders/3">
                                        <i className='fa fa-truck'></i> Shipped Orders
                                    </NavLink>
                                </li>
                                <li class="list-group-item list-group-item-action">
                                    <NavLink className='nav-link text-success' to="../view_retailer_orders/5">
                                        <i className='fa fa-magic'></i> Completed Orders
                                    </NavLink>
                                </li>
                                <li class="list-group-item list-group-item-action">
                                    <NavLink className='nav-link text-success' to="../view_retailer_orders/4">
                                        <i className='fa fa-exclamation-triangle'></i> Cancelled Orders
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="col-8 ps-5">
                        <div style={(isContentAvailiable === true) ? { display: 'none' } : null} className='text-danger fw-bold fs-5'>
                            *Sorry, No orders availiable.<br /><br />
                            <NavLink to="../" className="btn btn-secondary">Shop now</NavLink>
                        </div>
                        <div style={(isContentAvailiable === true) ? null : { display: 'none' }}>
                            {
                                orderList.map((order, i) => {
                                    return (
                                        <div className="col-10 mb-5">
                                            <div className="card shadow-sm">
                                                <div className='card-header text-secondary bg-white'>
                                                    <div className='row px-2'>
                                                        <div className="col-8">
                                                            <div className='fs-3 fw-bold fst-italic text-success mb-3'>{order.Prod_name}</div>

                                                            <div>Quantity: {order.Quantity}</div>

                                                            <div className='mb-2'>MRP: <s>Rs.{Math.round((100 * order.Price) / (100 - ((order.Quantity >= 100) ? order.Prod_offer + 1 : order.Prod_offer)))}</s></div>

                                                            <div className='mb-3'>Price: <b className='fs-5'>
                                                                Rs.{(order.Price).toLocaleString()}</b> + {(order.Order_status === 'Retailer confirmed order.') ? order.Extra_charge : order.Shipping_charge}(Shipping Charge)
                                                                <div className='text-success'><i className='fa fa-gift'></i> Saved Rs.{Math.round((100 * order.Price) / (100 - ((order.Quantity >= 100) ? order.Prod_offer + 1 : order.Prod_offer)) - order.Price)} in this order.</div>
                                                            </div>

                                                            <div className='mt-3'>Farmer: {order.Farmer_name}, {order.Farmer_area}, {order.Farmer_village}, {order.Farmer_district}.</div>
                                                        </div>
                                                        <div className="col-4">
                                                            <img src={`http://localhost:8000/includes/images/${order.Prod_image1}`} alt="" width='200' height='200' className='rounded' />
                                                        </div>
                                                    </div>
                                                    {
                                                        (/^(Retailer|Farmer) confirmed order\.$/.test(order.Order_status)) ?
                                                            <div className='text-dark mt-3'><i className='fa fa-exclamation-triangle'></i> Please share this code with the farmer only after it has been delivered <b className='fs-5'>{(order.Order_id).toString().padEnd(4, '0')}</b></div>
                                                            : null
                                                    }

                                                </div>
                                                <div className="nav-link">
                                                    <div className={`card-footer`}>

                                                        <span className="float-end">
                                                            <span className='text-danger'>
                                                                <OrderStatusContainer status={order.Order_status} />
                                                            </span>

                                                            <span hidden={(order.Order_status === "Waiting for retailer's confirmation.") ? false : true}>
                                                                <span className='text-danger'>{order.Extra_charge}</span>
                                                                &ensp;<button className='btn btn-success btn-sm' onClick={() => acceptHandle(order.Order_id)}>
                                                                    <i className='fa fa-check'></i> Accept
                                                                </button>
                                                            </span>

                                                            <button className='btn btn-danger btn-sm ms-2' data-bs-toggle="modal" data-bs-target="#modId" hidden={(/^(Retailer|Farmer) cancelled the order\.$/.test(order.Order_status) || order.Order_status === 'Order delivered successfully.')  ? true : false}>
                                                                <i className='fa fa-close'></i> Cancel
                                                            </button>
                                                            <CustomModal message={`You are cancelling the order.`} action={() => cancelHandle(order.Order_id)} />
                                                        </span>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ViewOrder

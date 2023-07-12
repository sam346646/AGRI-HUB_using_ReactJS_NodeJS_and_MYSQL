import Axios from 'axios'
import { React, useState, useEffect } from "react"
import { NavLink } from "react-router-dom";

import Breadcrumbs from '../components/Breadcrumbs';

//To dd-mm-yyyy format
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    return `${formattedDay}-${formattedMonth}-${year}`;
}

function ViewProduct(props) {

    const [prodList, setProdList] = useState([])
    const [orderList, setOrderList] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:8000/product/getall').then((response) => {
            setProdList(response.data)
        })

        Axios.get('http://localhost:8000/order/getall').then((response) => {
            setOrderList(response.data)
        })
    }, [])


    if (props.view_action === "view_dashboard_orders") {
        return (
            <>
                <Breadcrumbs breadcrumbs_title='Retailer Orders' breadcrumbs_icon='first-order' />
                <table className="table table-striped table-bordered table-hover">
                    <tbody>
                        <tr>
                            <th>Retailer Name</th>
                            <th>Retailer Location</th>
                            <th>Order Date</th>
                            <th>Product</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Manage</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {
                            orderList.map((order) => {
                                return (
                                    <tr>
                                        <td>{order.Retailer_name}</td>
                                        <td>{order.Retailer_location}</td>
                                        <td>{formatDate(order.Order_date)}</td>
                                        <td>{order.Prod_name}</td>
                                        <td><img src={`http://localhost:8000/includes/images/${order.Prod_image1}`} alt="" width='60' height='60' /></td>
                                        <td>{order.Quantity}</td>
                                        <td>{order.Price}</td>
                                        <td><NavLink className='btn btn-success' to={`update_order/${order.Prod_id}`}>Accept</NavLink></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </>
        )
    }


    if (props.view_action === "view_dashboard_product") {
        return (
            <>
                <Breadcrumbs breadcrumbs_title='My Orders' breadcrumbs_icon='first-order' />
                <table className="table table-striped table-bordered table-hover">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Qty Remining</th>
                            <th>Expires On</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Manage</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {
                            prodList.map((prod) => {
                                return (
                                    <tr>
                                        <td>{prod.Prod_name}</td>
                                        <td>{prod.Prod_qty}</td>
                                        <td>{formatDate(prod.Prod_expiry)}</td>
                                        <td><img src={`http://localhost:8000/includes/images/${prod.Prod_image1}`} alt="" width='60' height='60' /></td>
                                        <td><NavLink className='nav-link text-primary' to={`update_product/${prod.Prod_id}`}><i className="fa fa-pencil"></i> Edit</NavLink></td>
                                        <td><NavLink className='nav-link text-primary' to={`delete_product/${prod.Prod_id}`}><i className="fa fa-trash-o"></i> Delete</NavLink></td>
                                        <td><NavLink className='btn btn-success' to={`update_order/${prod.Prod_id}`}>Sold</NavLink></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </>
        )
    }


    if (props.view_action === "view_full_product") {
        return (
            <>
                <Breadcrumbs breadcrumbs_title='Active Orders' breadcrumbs_icon='first-order' />
                <table className="table table-striped table-bordered table-hover">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Qty Remaining</th>
                            <th>Price</th>
                            <th>Expiry</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Manage</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {
                            prodList.map((prod) => {
                                return (
                                    <tr>
                                        <td>{prod.Prod_name}</td>
                                        <td>{prod.Prod_type}</td>
                                        <td>{prod.Prod_qty}</td>
                                        <td>{prod.Prod_price}</td>
                                        <td>{formatDate(prod.Prod_expiry)}</td>
                                        <td><img src={`http://localhost:8000/includes/images/${prod.Prod_image1}`} alt="" width='60' height='60' /></td>
                                        <td><NavLink className='nav-link text-primary' to={`/update_product/${prod.Prod_id}`}><i className="fa fa-pencil"></i> Edit</NavLink></td>
                                        <td><NavLink className='nav-link text-primary' to={`/delete_product/${prod.Prod_id}`}><i className="fa fa-trash-o"></i> Delete</NavLink></td>
                                        <td><NavLink className='btn btn-success' to={`../update_order/${prod.Prod_id}`}>Sold</NavLink></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </>
        )
    }

}

export default ViewProduct

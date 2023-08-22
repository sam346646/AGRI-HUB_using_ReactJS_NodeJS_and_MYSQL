import Axios from 'axios'
import { React, useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom";

import Breadcrumbs from '../components/Breadcrumbs';
import FormatDate from '../components/FormatDate';
import CustomModal from './CustomModal';

function ViewProducts() {
    const navigate = useNavigate()

    const [prodList, setProdList] = useState([])
    const [isContentAvailiable, setIsContentAvailiable] = useState(true)

    useEffect(() => {
        Axios.post('http://localhost:8000/product/getallfarmer',{id:localStorage.getItem('usrId')}).then((response) => {
            setProdList(response.data)
        })
    }, [])

    useEffect(() => {
        (prodList.length !== 0) ? setIsContentAvailiable(true) : setIsContentAvailiable(false);
    }, [prodList]);

    function deleteProduct(id){
        navigate(`/farmer/delete_product/${id}`);
    }


    return (
        <>
            <Breadcrumbs breadcrumbs_title='My Products' breadcrumbs_icon='first-order' />
            <span style={(isContentAvailiable === true) ? { display: 'none' } : null} className='text-danger fw-bold fs-5'>&emsp;*Not added any product</span>
            <table className="table table-striped table-bordered table-hover table-font-sm" style={(isContentAvailiable === true) ? null : { display: 'none' }}>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th className='hide-text-lg'>Type</th>
                        <th>Qty Remaining</th>
                        <th>Price</th>
                        <th>Expiry</th>
                        <th className='hide-text-lg'>Image</th>
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
                                    <td className='hide-text-lg'>{prod.Prod_type}</td>
                                    <td>{prod.Prod_qty}</td>
                                    <td>{prod.Prod_price}</td>
                                    <td><FormatDate dateString={prod.Prod_expiry} /></td>
                                    <td className='hide-text-lg'><img src={`http://localhost:8000/includes/images/${prod.Prod_image1}`} alt="" width='60' height='60'/></td>
                                    <td>
                                        <NavLink className='nav-link text-primary' to={`/farmer/update_product/${prod.Prod_id}`}><i className="fa fa-pencil"></i> Edit</NavLink>
                                    </td>
                                    <td>
                                        <button data-bs-toggle="modal" data-bs-target={`#deleteBtn${prod.Prod_id}`} className='nav-link text-primary'><i className="fa fa-trash-o"></i> Delete</button>
                                        <CustomModal message={`You are deleting ${prod.Prod_name}`} action={()=>deleteProduct(prod.Prod_id)} modId={`deleteBtn${prod.Prod_id}`} />
                                    </td>
                                    <td><NavLink className='btn btn-success btn-sm' to={`../update_order/${prod.Prod_id}`}>Sold</NavLink></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ViewProducts

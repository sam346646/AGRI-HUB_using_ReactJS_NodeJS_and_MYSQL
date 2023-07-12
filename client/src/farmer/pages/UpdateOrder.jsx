import Axios from 'axios'
import {React,useState,useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom"

import Breadcrumbs from '../components/Breadcrumbs';

function UpdateOrder() {

    const navigate = useNavigate()
    const { id } = useParams();

    const [qty,setQty]=useState();
    const [profit,setProfit]=useState();
    const [unit,setUnit]=useState(8);
    const [prodList,setProdList]=useState([])

    useEffect(() => {
        Axios.get(`http://localhost:8000/product/get/${id}`).then((response) => {
            setProdList(response.data)
            setQty(response.data[0].Prod_qty)
        })
    }, [])

    const updateOrder = (e) => {
    }

    return (
        <div className='content_area'>
                <Breadcrumbs breadcrumbs_title='Update Order' breadcrumbs_icon='gear' />

                <form className="form-vertical mb-4" encType="multipart/form-data">
                    <div className="form-group mb-3">
                        <label className="form-label">Quantity sold</label>
                        <input type="text" name="qty" value={qty} onChange={(e) => setQty(e.target.value)} className="form-control" required />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label d-flex"><span className='m-2'>Profit earned for </span><select name="unit" value={unit} onChange={(e) => setUnit(e.target.value)} className="form-select" style={{width:'130px'}} required>
                                                                            <option value={qty}>{qty} unit/qty</option>
                                                                            <option value='1'>1 unit/qty</option>
                                                                        </select>
                        </label>
                        <input type="text" name="profit" value={profit} onChange={(e) => setProfit(e.target.value)} className="form-control" required />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label"></label>
                        <input type="submit" onClick={updateOrder} name="submit" value="Update Order" className="form-control btn btn-success" />
                    </div>
                </form>

                <Breadcrumbs breadcrumbs_title='Product' breadcrumbs_icon='first-order' />
                <table className="table table-striped table-bordered table-hover">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Qty Remaining</th>
                            <th>Price</th>
                            <th>Image</th>
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
                                        <td><img src={`http://localhost:8000/includes/images/${prod.Prod_image1}`} alt="" width='60' height='60' /></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
        </div>
    )
}

export default UpdateOrder

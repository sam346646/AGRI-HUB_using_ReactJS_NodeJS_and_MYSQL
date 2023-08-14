import Axios from 'axios'
import { React, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"

import Breadcrumbs from '../components/Breadcrumbs';
import CustomModal from '../components/CustomModal';
import Footer from './Footer';

function UpdateOrder() {

    const navigate = useNavigate()
    const { id } = useParams();

    const [qty, setQty] = useState();
    const [price, setPrice] = useState();
    const [profit, setProfit] = useState();
    const [actualQty, setActualQty] = useState();
    const [prodList, setProdList] = useState([])

    const [errQty, setErrQty] = useState()
    const [isWarnQty, setIsWarnQty] = useState(false)
    const [errPrice, setErrPrice] = useState()
    const [errProfit, setErrProfit] = useState()
    const [isInvalid, setIsInvalid] = useState(true)

    useEffect(() => {
        Axios.get(`http://localhost:8000/product/get/${id}`).then((response) => {
            setProdList(response.data)
            setActualQty(response.data[0].Prod_qty)
        })
    }, [])

    const updateOrder = (e) => {
        const formdata = new FormData();
        formdata.append('id', id)
        formdata.append('qty', qty)
        formdata.append('profit', profit)
        formdata.append('price', price)
        Axios.post('http://localhost:8000/order/customInsert', formdata).then((response) => {
        });
        navigate("/farmer");
    }


    //Validation
    useEffect(() => {
        if (errQty || errProfit || errPrice || !qty || !profit || !price) {
            setIsInvalid(true)
        }
        else {
            setIsInvalid(false)
        }
        if (qty > (actualQty - 50) && qty < actualQty) {
            setIsWarnQty(true)
        }
        else {
            setIsWarnQty(false)
        }
    }, [errQty, errProfit, errPrice, qty, profit, price])



    return (
        <>
            <div className='farmer_content_area p-5'>
                <div className="row">
                    <div className="col-6 px-5">
                        <Breadcrumbs breadcrumbs_title='Update Order' breadcrumbs_icon='gear' />

                        <div className="form-vertical mb-4">
                            <div className="form-group mb-3">
                                <label className="form-label">Sold Quantity</label>
                                <input type="text" value={qty}
                                    onChange={(e) => {
                                        if (/^[0-9]*$/.test(e.target.value)) {
                                            setQty(e.target.value)
                                            setErrQty('')
                                        }
                                        else {
                                            setErrQty('Please enter numbers only.')
                                        }
                                    }
                                    }
                                    onBlur={() => {
                                        (qty > actualQty) ? setErrQty(`Only ${actualQty} quantity avaliable.`) : setErrQty('')
                                    }
                                    }
                                    className="form-control" placeholder={`${actualQty} Quantity`} required />
                                <span class="text-danger" aria-live="polite">{errQty}</span>
                                {(isWarnQty) ? <span class="text-warning" aria-live="polite"><i className='fa fa-exclamation-triangle'></i> Due to the limited stock of less than 50 units remaining, product will be discontinued.</span> : null}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Sold Price</label>
                                <input type="text" value={price}
                                    onChange={(e) => {
                                        if (/^[0-9]*$/.test(e.target.value)) {
                                            setPrice(e.target.value)
                                            setErrPrice('')
                                        }
                                        else {
                                            setErrPrice('Please enter numbers only.')
                                        }
                                    }
                                    }
                                    onBlur={() => {
                                        (price <= 0) ? setErrPrice(`Please enter valid price.`) : setErrPrice('')
                                    }
                                    }
                                    className="form-control" placeholder={`Rs.${actualQty * 100}`} required />
                                <span class="text-danger" aria-live="polite">{errPrice}</span>
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Profit earned by selling {(qty) ? `${qty} Quantity` : null}</label>
                                <input type="text" name="profit" value={profit}
                                    onChange={(e) => {
                                        if (/^[0-9]*$/.test(e.target.value)) {
                                            setProfit(e.target.value)
                                            setErrProfit('')
                                        }
                                        else {
                                            setErrProfit('Please enter numbers only.')
                                        }
                                    }
                                    }
                                    onBlur={() => {
                                        (profit <= 0 || !profit) ? setErrProfit('Please enter valid profit.') : setErrQty('')
                                    }
                                    }
                                    className="form-control" placeholder={`Rs.${actualQty * 100 * 0.25}`} required />
                                <span class="text-danger" aria-live="polite">{errProfit}</span>
                            </div>

                            <div className="form-group mb-3">
                                <button className="form-control btn btn-success" data-bs-toggle="modal" data-bs-target="#soldBtn" disabled={isInvalid}>Sold</button>
                                <CustomModal message={`You are updating the product by selling ${qty} quantity`} action={updateOrder} modId='soldBtn' />
                                {(isInvalid) ? <span class="text-danger" aria-live="polite">*Please fill mandatory fields to continue.</span> : null}
                            </div>
                        </div>
                    </div>


                    <div className="col-6">
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
                </div>
            </div>

            <Footer />
        </>
    )
}

export default UpdateOrder

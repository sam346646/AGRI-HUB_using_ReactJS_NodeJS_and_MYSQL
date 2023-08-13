import Axios from 'axios'
import { React, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Breadcrumbs from '../components/Breadcrumbs'
import CustomModal from '../components/CustomModal'

function UpdateOrder() {

    const navigate = useNavigate()
    const { id } = useParams();

    const [name, setName] = useState()
    const [ptype, setPtype] = useState('')
    const [qty, setQty] = useState()
    const [price, setPrice] = useState(null)
    const [shipping, setShipping] = useState()
    const [categoryId, setCategoryId] = useState(1)
    const [image, setImage] = useState()

    const [errName, setErrName] = useState()
    const [errQty, setErrQty] = useState()
    const [errPrice, setErrPrice] = useState()
    const [errShipping, setErrShipping] = useState()
    const [isInvalid, setIsInvalid] = useState(true)

    const [categoryList, setCategoryList] = useState([])
    const [selectedCategoryList, setSelectedCategoryList] = useState([])

    const updateProduct = (e) => {
        e.preventDefault();
        const formdata1 = new FormData();
        formdata1.append('id', id)
        formdata1.append('name', name)
        formdata1.append('ptype', ptype)
        formdata1.append('qty', qty)
        formdata1.append('price', price)
        formdata1.append('shipping', shipping)
        formdata1.append('categoryId', categoryId)
        Axios.put('http://localhost:8000/product/update', formdata1);
        navigate("/farmer");
    }

    useEffect(() => {
        Axios.get('http://localhost:8000/product/getallcategory').then((response) => {
            setCategoryList(response.data)
        })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:8000/product/getcategory/${categoryId}`).then((response) => {
            setSelectedCategoryList(response.data)
        })
    }, [categoryId]);   


    const getproduct = async () => {
        const res = await Axios.get(`http://localhost:8000/product/get/${id}`)
        setName(res.data[0].Prod_name)
        setPtype(res.data[0].Prod_type)
        setQty(res.data[0].Prod_qty)
        setPrice(res.data[0].Prod_price)
        setShipping(res.data[0].Shipping_charge)
        setCategoryId(res.data[0].Prod_cat_id)
        setImage(res.data[0].Prod_image1)
    }
    useEffect(() => {
        getproduct()
    }, [])


    //Validation
    useEffect(() => {
        if (errName || errQty || errPrice || errShipping || !name || !qty || !price || !shipping ) {
            setIsInvalid(true)
        }
        else {
            setIsInvalid(false)
        }
    }, [errName, errQty, errPrice, errShipping, name, qty, price, shipping])


    return (
        <div className="farmer_content_area container p-5">
            <Breadcrumbs breadcrumbs_title='Update Product' breadcrumbs_icon='gear' />

            <div className="row">
                <div className="form-vertical col-6" encType="multipart/form-data">
                    <div className="form-group mb-3">
                        <label className="form-label">Product Name</label>
                        <input type="text" name="name" value={name}
                            onChange={(e) => {
                                if (/^[A-Za-z ]*$/.test(e.target.value)) {
                                    setName(e.target.value)
                                    setErrName('')
                                }
                                else {
                                    setErrName('Please enter alphabets only.')
                                }
                            }
                            }
                            onBlur={() => (name === '') ? setErrName('Please provide product name.') : setErrName('')}
                            className="form-control" maxLength='30' autoComplete="off" required />
                        <span class="text-danger" aria-live="polite">{errName}</span>
                    </div>


                    <div className="form-group mb-3">
                        <label className="form-label">Product Type (If any specify)</label>
                        <input type="text" name="name" value={ptype}
                            onChange={(e) => {
                                if (/^[A-Za-z]*$/.test(e.target.value)) {
                                    setPtype(e.target.value)
                                }
                            }
                            }
                            className="form-control" autoComplete="off" maxLength='30' />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label">Product Category</label>

                        <select name="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="form-select" required>
                            {
                                categoryList.map((category) => {
                                    return (
                                        <option value={`${category.Category_id}`}> {category.Category_name} </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {
                        selectedCategoryList.map((category) => {
                            return (
                                <>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Product Quantity (in {category.Measure})</label>
                                        <input type="text" name="qty" value={qty}
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
                                                (qty < 50 || qty === '') ? setErrQty('Qunatity should be greater than 50.') : setErrQty('')
                                            }
                                            }
                                            className="form-control" autoComplete="off" maxLength='4' required />
                                        <span class="text-danger" aria-live="polite">{errQty}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label">Product Price (per {category.Measure})</label>
                                        <input type="text" name="price" value={price}
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
                                                (price < 1 || price === '') ? setErrPrice('Please enter valid price.') : setErrPrice('')
                                            }
                                            }

                                            className="form-control" autoComplete="off" maxLength='5' required />
                                        <span class="text-danger" aria-live="polite">{errPrice}</span>
                                    </div>
                                </>
                            )
                        })
                    }


                    <div className="form-group mb-3">
                        <label className="form-label">Shipping Charge (Within 20k.m.)</label>
                        <input type="text" name="shipping" value={shipping}
                            onChange={(e) => {
                                if (/^[0-9]*$/.test(e.target.value)) {
                                    setShipping(e.target.value)
                                    setErrShipping('')
                                }
                                else {
                                    setErrShipping('Please enter numbers only.')
                                }
                            }
                            }
                            onBlur={() => {
                                (shipping < 0 || shipping > 2000 || shipping === '') ? setErrShipping('Shipping charge should reside between 0 to 2000.') : setErrShipping('')
                            }
                            }
                            className="form-control" autoComplete="off" maxLength='4' placeholder='Rs.200' required />
                        <span class="text-danger" aria-live="polite">{errShipping}</span>
                    </div>

                    <div className="form-group mb-3">
                        <button className="form-control btn btn-success" data-bs-toggle="modal" data-bs-target="#updateBtn" disabled={isInvalid}>Update Product</button>
                        <CustomModal message={`You are updating the details of ${name}`} action={updateProduct} modId='updateBtn' />
                        {(isInvalid) ? <span class="text-danger" aria-live="polite">*Please fill mandatory fields to continue.</span> : null}
                    </div>
                </div>




                <div className="col-6 ps-5">
                    <div className='text-danger text-center my-4 fw-bold'>*This is a demo of how the retailer will view the product.</div>
                    <div className="card col-8 mx-auto pt-3">
                        <img className="mx-auto rounded" src={`http://localhost:8000/includes/images/${image}`} width="190" height="190" alt="not found" />
                        <div className="card-body text-secondary">
                            <div className="py-2 fs-4 fw-bold text-center text-success">
                                {name} {(!ptype) ? null : <>- {ptype}</>}
                            </div>
                            <div>MRP: &#8377;<s>{(price / 0.88).toFixed(2)}</s></div>

                            <h6 className="text-dark">Price: &#8377;{price} <span className="text-secondary">(You Save: &#8377;{((price / 0.88) - (price)).toFixed(2)})</span></h6>

                            <div className="text-success">Offer: <span className="bg-success text-success bg-opacity-25 p-1">12% OFF</span></div>

                            <div>(Shipping charge: &#8377;{shipping})</div><br />

                            <button className="btn text-success border border-success-subtle me-2">View details <i className="fa fa-arrow-circle-right"></i></button>
                            <button className="btn btn-success"><i className="fa fa-shopping-basket"></i> Add to cart</button><br /><br />

                            <div className="text-secondary"><i className='fa fa-truck'></i> Order now, Get it delivered Tomorrow</div>

                            <div className="text-danger">*{qty}qty in stock</div>

                        </div>
                    </div>
                </div>
            </div>
        </div >

        // <div className="row content_area">
        //     <div className="col-lg-12">
        //         <Breadcrumbs breadcrumbs_title='Update Product' breadcrumbs_icon='gear' />

        //         <form className="form-vertical" encType="multipart/form-data">
        //             <div className="form-group mb-3">
        //                 <label className="form-label">Product Name</label>
        //                 <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
        //             </div>

        //             <div className="form-group mb-3">
        //                 <label className="form-label">Product Type (If any specify)</label>
        //                 <input type="text" name="name" value={ptype} onChange={(e) => setPtype(e.target.value)} className="form-control" />
        //             </div>

        //             <div className="form-group mb-3">
        //                 <label className="form-label">Product Category</label>

        //                 <select name="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="form-select" required>
        //                     {
        //                         categoryList.map((category) => {
        //                             return (
        //                                 <option value={`${category.Category_id}`}> {category.Category_name} </option>
        //                             )
        //                         })
        //                     }
        //                 </select>
        //             </div>
        //             {
        //                 selectedCategoryList.map((category) => {
        //                     return (
        //                         <>
        //                             <div className="form-group mb-3">
        //                                 <label className="form-label">Product Quantity (in {category.Measure})</label>
        //                                 <input type="text" name="name" value={qty} onChange={(e) => setQty(e.target.value)} className="form-control" required />
        //                             </div>

        //                             <div className="form-group mb-3">
        //                                 <label className="form-label">Product Price (per {category.Measure})</label>
        //                                 <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" required />
        //                             </div>
        //                         </>
        //                     )
        //                 })
        //             }

        //             <div className="form-group mb-3">
        //                 <label className="form-label"></label>
        //                 <input type="submit" onClick={updateProduct} name="submit" value="Update Product" className="form-control btn btn-success" />
        //             </div>
        //         </form>
        //     </div >
        // </div>
    )
}

export default UpdateOrder;

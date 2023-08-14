import Axios from 'axios'
import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Breadcrumbs from '../components/Breadcrumbs'
import CustomModal from '../components/CustomModal'
import Footer from './Footer'

function Add_product() {

    const [name, setName] = useState()
    const [ptype, setPtype] = useState('')
    const [qty, setQty] = useState()
    const [price, setPrice] = useState(null)
    const [expiry, setExpiry] = useState()
    const [shipping, setShipping] = useState()
    const [categoryId, setCategoryId] = useState(1)
    const [file, setFile] = useState()

    const [errName, setErrName] = useState()
    const [errQty, setErrQty] = useState()
    const [errPrice, setErrPrice] = useState()
    const [errExpiry, setErrExpiry] = useState()
    const [errShipping, setErrShipping] = useState()
    const [errImage, setErrImage] = useState()
    const [isInvalid, setIsInvalid] = useState(true)

    const [categoryList, setCategoryList] = useState([])
    const [selectedCategoryList, setSelectedCategoryList] = useState([])


    useEffect(() => {
        Axios.get('http://localhost:8000/product/getallcategory').then((response) => {
            setCategoryList(response.data)
            setExpiry(20)
        })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:8000/product/getcategory/${categoryId}`).then((response) => {
            setSelectedCategoryList(response.data)
        })
    }, [categoryId]);

    useEffect(() => {
        setExpiry(selectedCategoryList[0] ? selectedCategoryList[0].Expiry : null)
    }, [selectedCategoryList])

    const navigate = useNavigate()
    const handleFile = (e) => {
        const tempFile = e.target.files[0]

        const imageRegex = /^image\/(jpeg|jpg|png|gif|webp)$/;
        if (imageRegex.test(tempFile.type)) {
            setFile(tempFile);
            setErrImage('');
        }
        else {
            setErrImage('Please select a valid image file (JPEG, PNG, GIF, JPG, WEBP).')
        }
    }

    const insertProduct = () => {
        const formdata = new FormData();
        formdata.append('id', localStorage.getItem('usrId'))
        formdata.append('name', name)
        formdata.append('ptype', ptype)
        formdata.append('qty', qty)
        formdata.append('price', price)
        formdata.append('expiry', expiry)
        formdata.append('categoryId', categoryId)
        formdata.append('shipping', shipping)
        formdata.append('image', file)
        Axios.post('http://localhost:8000/product/insert', formdata).then((response) => {
        });
        navigate("/farmer");
    }


    //Validation
    useEffect(() => {
        if (errName || errQty || errPrice || errExpiry || errShipping || errImage || !name || !qty || !price || !expiry || !shipping || !file) {
            setIsInvalid(true)
        }
        else {
            setIsInvalid(false)
        }
    }, [errName, errQty, errPrice, errExpiry, errShipping, name, qty, price, expiry, shipping, file])



    return (
        <>
            <div className="farmer_content_area container p-5">
                <Breadcrumbs breadcrumbs_title='Add Product' breadcrumbs_icon='tag' />

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
                                className="form-control" maxLength='30' autoComplete="off" placeholder='Apple' required />
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
                                className="form-control" autoComplete="off" maxLength='30' placeholder='Kashmiri' />
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
                                                className="form-control" autoComplete="off" maxLength='4' placeholder={`100${category.Measure}`} required />
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

                                                className="form-control" autoComplete="off" maxLength='5' placeholder='Rs.100' required />
                                            <span class="text-danger" aria-live="polite">{errPrice}</span>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label className="form-label">Product Expiry (in Days)</label>
                                            <input type="text" name="expiry" value={expiry}
                                                onChange={(e) => {
                                                    if (/^[0-9]*$/.test(e.target.value)) {
                                                        setExpiry(e.target.value)
                                                        setErrExpiry('')
                                                    }
                                                    else {
                                                        setErrExpiry('Please enter numbers only.')
                                                    }
                                                }
                                                }
                                                onBlur={() => {
                                                    (expiry < 1 || expiry > 365 || expiry === '') ? setErrExpiry('Expiry days should reside between 1 to 365.') : setErrExpiry('')
                                                }
                                                }
                                                className="form-control" autoComplete="off" maxLength='3' required />
                                            <span class="text-danger" aria-live="polite">{errExpiry}</span>
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
                            <label className="form-label">Product Image1</label>
                            <input type="file" onChange={handleFile} className="form-control" required />
                            <span class="text-danger" aria-live="polite">{errImage}</span>
                        </div>


                        <div className="form-group mb-3">
                            <button className="form-control btn btn-success" data-bs-toggle="modal" data-bs-target="#insertBtn" disabled={isInvalid}>Add Product</button>
                            <CustomModal message={`You are going to add ${qty} quantity of ${name}`} action={insertProduct} modId='insertBtn' />
                            {(isInvalid) ? <span class="text-danger" aria-live="polite">*Please fill mandatory fields to continue.</span> : null}
                        </div>
                    </div>




                    <div className="col-6 ps-5">
                        <div className='text-danger text-center my-4 fw-bold'>*This is a demo of how the retailer will view the product.</div>
                        <div className="card col-8 mx-auto pt-3">
                            <img className="mx-auto rounded" src={(file) ? URL.createObjectURL(file) : `http://localhost:8000/includes/images/apple.jpg`} width="190" height="190" alt="not found" />
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
            </div>

            <Footer />
        </>
    )
}

export default Add_product

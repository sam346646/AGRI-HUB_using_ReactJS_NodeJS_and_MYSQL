import Axios from 'axios'
import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Breadcrumbs from '../components/Breadcrumbs'

function Add_product() {

    const [name, setName] = useState("")
    const [ptype, setPtype] = useState("")
    const [qty, setQty] = useState()
    const [price, setPrice] = useState()
    const [expiry, setExpiry] = useState()
    const [categoryId, setCategoryId] = useState(1)

    const [file, setFile] = useState()

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
        setFile(e.target.files[0])
    }
    const insertProduct = (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('name', name)
        formdata.append('ptype', ptype)
        formdata.append('qty', qty)
        formdata.append('price', price)
        formdata.append('expiry', expiry)
        formdata.append('categoryId', categoryId)
        formdata.append('image', file)
        Axios.post('http://localhost:8000/product/insert', formdata).then((response) => {
        });
        navigate("/");
    }

    return (
        <div className="row content_area">
            <div className="col-lg-12">
                <Breadcrumbs breadcrumbs_title='Sell Product' breadcrumbs_icon='tag' />

                <form className="form-vertical" encType="multipart/form-data">
                    <div className="form-group mb-3">
                        <label className="form-label">Product Name</label>
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label">Product Type (If any specify)</label>
                        <input type="text" name="name" value={ptype} onChange={(e) => setPtype(e.target.value)} className="form-control" />
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
                                        <input type="text" name="qty" value={qty} onChange={(e) => setQty(e.target.value)} className="form-control" required />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label">Product Price (per {category.Measure})</label>
                                        <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" required />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label">Product Expiry (in Days)</label>
                                        <input type="text" name="expiry" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="form-control" required />
                                    </div>
                                </>
                            )
                        })
                    }
                    <div className="form-group mb-3">
                        <label className="form-label">Product Image1</label>
                        <input type="file" onChange={handleFile} className="form-control" required />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label"></label>
                        <input type="submit" onClick={insertProduct} name="submit" value="Insert Product" className="form-control btn btn-success" />
                    </div>
                </form>
            </div >

        </div >
    )
}

export default Add_product

import Axios from 'axios'
import { React, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Breadcrumbs from '../components/Breadcrumbs'

function UpdateOrder() {

    const navigate = useNavigate()
    const { id } = useParams();

    const [name, setName] = useState("")
    const [ptype, setPtype] = useState("")
    const [qty, setQty] = useState()
    const [price, setPrice] = useState()
    const [categoryId, setCategoryId] = useState(1)

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
        formdata1.append('categoryId', categoryId)
        Axios.put('http://localhost:8000/product/update', formdata1);
        navigate("/");
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
        setCategoryId(res.data[0].Prod_cat_id)
    }
    useEffect(() => {
        getproduct()
    }, [])

    return (
        <div className="row content_area">
            <div className="col-lg-12">
                <Breadcrumbs breadcrumbs_title='Update Product' breadcrumbs_icon='gear' />

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
                                        <input type="text" name="name" value={qty} onChange={(e) => setQty(e.target.value)} className="form-control" required />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label">Product Price (per {category.Measure})</label>
                                        <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" required />
                                    </div>
                                </>
                            )
                        })
                    }

                    <div className="form-group mb-3">
                        <label className="form-label"></label>
                        <input type="submit" onClick={updateProduct} name="submit" value="Update Product" className="form-control btn btn-success" />
                    </div>
                </form>
            </div >
        </div>
    )
}

export default UpdateOrder;

import Axios from 'axios';
import {React, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

function CategoryContainer() {

    const [categoryList,setCategoryList]=useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8000/product/getallcategory').then((response) => {
            setCategoryList(response.data)
        });

    }, [])

    return (
        <div class="card mb-5">
            <div class="card-header fw-bold fs-5">
                Categories
            </div>
            <ul class="list-group list-group-flush">
                {
                    categoryList.map((category) => {
                        return (
                            <li class="list-group-item list-group-item-action"><NavLink className='nav-link text-success' to={`../view_category_wise_product/${category.Category_id}`}>{category.Category_name}</NavLink></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CategoryContainer

import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <>
            <div className='container-fluid px-5 pt-4 pb-2 bg-secondary bg-opacity-25'>
                <div className='row'>
                    <div className='col-sm-6 col-md-4'>
                        <h4>Pages</h4>
                        <ul className='list-unstyled'>
                            <li><NavLink to={`/retailer/view_category_wise_product/*`} className='nav-link'>Shop</NavLink></li>
                            <li><NavLink to={`/retailer/view_cart`} className='nav-link'>Shopping Cart</NavLink></li>
                            <li><NavLink to={`/retailer/view_orders`} className='nav-link'>Orders</NavLink></li>
                        </ul>

                        <h4 className='mt-4'>User Section</h4>
                        <ul className='list-unstyled'>
                            <li><NavLink to={`/retailer/view_category_wise_product/*`} className='nav-link'>Login</NavLink></li>
                            <li><NavLink to={`/retailer/view_category_wise_product/*`} className='nav-link'>Register</NavLink></li>
                        </ul>
                    </div>

                    <div className='col-sm-6 col-md-4'>
                        <h4>Top Products Categories</h4>
                        <ul className='list-unstyled'>
                            <li><NavLink to={`/retailer/view_category_wise_product/1`} className='nav-link'>Fruit</NavLink></li>
                            <li><NavLink to={`/retailer/view_category_wise_product/2`} className='nav-link'>Vegetable</NavLink></li>
                            <li><NavLink to={`/retailer/view_category_wise_product/3`} className='nav-link'>Oil</NavLink></li>
                            <li><NavLink to={`/retailer/view_category_wise_product/4`} className='nav-link'>Egg</NavLink></li>
                            <li><NavLink to={`/retailer/view_category_wise_product/5`} className='nav-link'>Rice</NavLink></li>
                        </ul>
                    </div>

                    <div className='col-sm-6 col-md-4'>
                        <h4>Find Us</h4>
                        <p>
                            <strong>Agri-hub.</strong>
                            <br />+91 7760506993
                            <br />sammanasseh310@gmail.com
                        </p>

                        <h4 className='mt-4'>Keep In Touch</h4>
                        <p>
                            <a href="#" class="fa fa-facebook nav-link me-2"></a>
                            <a href="#" class="fa fa-twitter nav-link me-2"></a>
                            <a href="#" class="fa fa-instagram nav-link me-2"></a>
                            <a href="#" class="fa fa-envelope nav-link"></a>
                        </p>
                    </div>
                </div>
            </div>

            <div className='bg-dark bg-opacity-75 text-light text-center py-3'>
            Copyright@Agri-hub
            </div>
        </>
    )
}

export default Footer
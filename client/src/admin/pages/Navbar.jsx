import React from 'react'
import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark px-4 fixed-top">
                <button className="navbar-toggler " data-bs-toggle="collapse" data-bs-target="#navToggle">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink to="/" className="navbar-brand fs-4 fw-bold text-success">
                    <i className="fa fa-eercast"></i> AGRI-HUB
                </NavLink>
                <div className="collapse navbar-collapse" id="navToggle">
                    <ul className="navbar-nav ps-2 pt-3 flex-column bg-dark position-fixed start-0 bottom-0 side_nav">

                        <li className="nav-item">
                            <NavLink to="/admin" className="nav-link">
                                <i className="fa fa-dashboard"></i> &ensp;Dashboard
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/admin/add_category" className="nav-link">
                                <i className="fa fa-tag"></i> &ensp;Add Category
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/admin/view_query" className="nav-link">
                                <i className="fa fa-first-order"></i> &ensp;View Query
                            </NavLink>
                        </li>

                        <span style={{fontSize:'16px'}} className='text-light text-opacity-75 mx-2 mt-3 mb-1'>Search</span>

                        <li className="nav-item">
                            <NavLink to="/view_retailer_orders/2" className="nav-link">
                                <i className="fa fa-bell"></i> &ensp;Farmer
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/view_retailer_orders/3" className="nav-link">
                                <i className="fa fa-truck"></i> &ensp;Retailer
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="view_retailer_orders/4" className="nav-link">
                                <i className="fa fa-close"></i> &ensp;Product
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="view_retailer_orders/4" className="nav-link">
                                <i className="fa fa-close"></i> &ensp;Order
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/delete_product" className="nav-link">
                                <i className="fa fa-book"></i> &ensp;Report
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/aa" className="nav-link">
                                <i className="fa fa-power-off"></i> &ensp;Log out
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default Navbar;
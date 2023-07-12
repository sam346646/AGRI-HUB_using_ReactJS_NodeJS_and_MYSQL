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
                            <NavLink to="/" className="nav-link">
                                <i className="fa fa-dashboard"></i> Dashboard
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/sell_product" className="nav-link">
                                <i className="fa fa-tag"></i> Sell Product
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/view_product" className="nav-link">
                                <i className="fa fa-product-hunt"></i> Active Orders
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/update_product" className="nav-link">
                                <i className="fa fa-gear"></i> Retailer Orders
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/delete_product" className="nav-link">
                                <i className="fa fa-book"></i> Report
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/aa" className="nav-link">
                                <i className="fa fa-power-off"></i> Log out
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
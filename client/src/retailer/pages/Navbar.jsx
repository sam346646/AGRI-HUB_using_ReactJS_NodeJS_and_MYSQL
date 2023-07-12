import React from 'react'
import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark px-4 fixed-top">
                <button className="navbar-toggler " data-bs-toggle="collapse" data-bs-target="#navToggle">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink to="./" className="navbar-brand fs-4 fw-bold text-success">
                    <i className="fa fa-eercast"></i> AGRI-HUB
                </NavLink>
                <div className="collapse navbar-collapse flex-row-reverse" id="navToggle">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <NavLink to="./" className="nav-link">
                                <i className="fa fa-home"></i> Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={`./view_category_wise_product/*`}className="nav-link">
                                <i className="fa fa-shopping-bag"></i> Shop
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
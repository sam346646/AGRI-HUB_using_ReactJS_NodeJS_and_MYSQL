import React from 'react'
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate()

    const logoutHandle = () => {
        localStorage.removeItem('userType')
        navigate('/')
        window.location.reload();
    }

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
                            <NavLink to="./view_category_wise_product" className="nav-link">
                                <i className="fa fa-shopping-bag"></i> Shop
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="./view_cart" className="nav-link">
                                <i className="fa fa-shopping-basket"></i> My Cart
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="./view_orders" className="nav-link">
                                <i className="fa fa-cubes"></i> My Orders
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <button onClick={() => logoutHandle()} className="nav-link">
                                <i className="fa fa-power-off"></i> Log out
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default Navbar;
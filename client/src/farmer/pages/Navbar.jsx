import React from 'react'
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate=useNavigate()

    const logoutHandle=()=>{
        localStorage.removeItem('userType')
        navigate('/')
        window.location.reload();
    }

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3 fixed-top">
                <button className="navbar-toggler " data-bs-toggle="collapse" data-bs-target="#navToggle">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink to="./" className="navbar-brand fs-4 fw-bold text-success">
                    <i className="fa fa-eercast"></i> AGRI-HUB
                </NavLink>
                <div className="collapse navbar-collapse flex-row-reverse" id="navToggle">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <NavLink to="/farmer/" className="nav-link">
                                <i className="fa fa-home"></i> Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/farmer/view_product" className="nav-link">
                                <i className="fa fa-tasks"></i> Products
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/farmer/view_retailer_orders/1' className="nav-link">
                                <i className="fa fa-cubes"></i> Orders
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/farmer/report_issue/1' className="nav-link">
                                <i className="fa fa-book"></i> Issues
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <button onClick={()=>logoutHandle()} className="nav-link">
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
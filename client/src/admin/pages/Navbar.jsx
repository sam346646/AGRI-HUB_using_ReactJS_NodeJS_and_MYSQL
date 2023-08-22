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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top">
                <button className="navbar-toggler " data-bs-toggle="collapse" data-bs-target="#navToggle">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink to="/" className="navbar-brand fs-4 fw-bold text-success">
                    <i className="fa fa-eercast"></i> AGRI-HUB
                </NavLink>
                <div className="collapse navbar-collapse" id="navToggle">
                    <ul className="navbar-nav ps-2 pt-3 flex-column bg-dark position-fixed start-0 bottom-0 side_nav">

                        <li className="nav-item">
                            <NavLink to="/admin/" className="nav-link icon-center-lg">
                                <i className="fa fa-dashboard"></i><span className='hide-text-lg'>&ensp;Dashboard</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/admin/add_category" className="nav-link icon-center-lg">
                                <i className="fa fa-flask"></i><span className='hide-text-lg'>&ensp;Add Category</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/admin/view_queries" className="nav-link icon-center-lg">
                                <i className="fa fa-bell"></i><span className='hide-text-lg'>&ensp;View Query</span>
                            </NavLink>
                        </li>

                        <span style={{ fontSize: '16px' }} className='text-light text-opacity-75 mx-2 mt-3 mb-1 hide-text-lg'>Search</span>

                        <li className="nav-item">
                            <NavLink to="/admin/view_orders" className="nav-link icon-center-lg">
                                <i className="fa fa-truck"></i><span className='hide-text-lg'>&ensp;Orders</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/admin/view_products" className="nav-link icon-center-lg">
                                <i className="fa fa-tag"></i><span className='hide-text-lg'>&ensp;Products</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/admin/view_retailers" className="nav-link icon-center-lg">
                                <i className="fa fa-users"></i><span className='hide-text-lg'>&ensp;Retailers</span>
                            </NavLink>
                        </li>

                        <li className="nav-item mb-3">
                            <NavLink to="/admin/view_farmers" className="nav-link icon-center-lg">
                                <i className="fa fa-user"></i><span className='hide-text-lg'>&ensp;Farmers</span>
                            </NavLink>
                        </li>

                        <li className="nav-item logout-center-lg">
                            <button onClick={() => logoutHandle()} className="nav-link">
                                <i className="fa fa-power-off "></i><span className='hide-text-lg'>&ensp;Log out</span>
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
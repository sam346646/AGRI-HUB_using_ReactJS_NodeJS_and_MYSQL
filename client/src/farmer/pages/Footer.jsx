import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Footer() {

    const navigate = useNavigate()

    const logoutHandle = () => {
        localStorage.removeItem('userType')
        navigate('/')
        window.location.reload();
    }

    return (
        <>
            <div className='container-fluid px-5 pt-4 pb-2 bg-secondary bg-opacity-25'>
                <div className='row'>
                    <div className='col-sm-6 col-md-3'>
                        <h4>Pages</h4>
                        <ul className='list-unstyled'>
                            <li><NavLink to={`/farmer/manage_profile/1`} className='nav-link'>My profile</NavLink></li>
                            <li><NavLink to={`/farmer/view_product`} className='nav-link'>Products</NavLink></li>
                            <li><NavLink to={`/farmer/view_retailer_orders/1`} className='nav-link'>Orders</NavLink></li>
                        </ul>
                    </div>

                    <div className='col-sm-6 col-md-3'>
                        <h4>User Section</h4>
                        <ul className='list-unstyled'>
                            <li><button onClick={() => logoutHandle()} className='nav-link'>Login</button></li>
                            <li><button onClick={() => logoutHandle()} className='nav-link'>Register</button></li>
                        </ul>
                    </div>

                    <div className='col-sm-6 col-md-3'>
                        <h4>Keep In Touch</h4>
                        <p>
                            <NavLink to="https://www.facebook.com/" target="_blank" className="fa fa-facebook nav-link me-2"></NavLink>
                            <NavLink to="https://twitter.com/?lang=en-in" target="_blank" className="fa fa-twitter nav-link me-2"></NavLink>
                            <NavLink to="https://www.instagram.com/?hl=en" target="_blank" className="fa fa-instagram nav-link me-2"></NavLink>
                            <NavLink to="mailto:sammanasseh310@gmail.com?subject=Regarding Query&body=Please write to us" target="_blank" className="fa fa-envelope nav-link me-2"></NavLink>
                        </p>
                        <NavLink to={`/farmer/report_issue/1`} className='nav-link text-danger'>Report Issue</NavLink>
                    </div>

                    <div className='col-sm-6 col-md-3'>
                        <h4>Find Us</h4>
                        <p>
                            <strong>Agri-hub.</strong>
                            <br />+91 7760506993
                            <br />sammanasseh310@gmail.com
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
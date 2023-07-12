import React from 'react'
import { NavLink } from "react-router-dom";

function Panels(props) {
    return (
        <div className="col-xl-3 col-6 mb-3">
            <div className="card">
                <div className={`card-header card_${props.panel_color}`}>
                    <div>
                        <div className="col-xs-9"><b className='float-end'>{props.panel_title}</b></div>
                        <div className="col-xs-3"><i className={`fa fa-${props.panel_icon} fa-5x`}></i></div>
                    </div>
                </div>
                <NavLink to={`/${props.panel_action}`} className="nav-link">
                    <div className={`card-footer card_footer_${props.panel_color}`}>
                        <span>View details</span>
                        <span className="float-end"><i className="fa fa-arrow-circle-right"></i></span>
                        <div className="clearfix"></div>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Panels

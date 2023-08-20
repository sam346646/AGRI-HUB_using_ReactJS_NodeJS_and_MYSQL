import React from 'react'
import { NavLink } from 'react-router-dom';

function OrderOptionContainer({ title, options }) {
    return (
        <div class="card mb-5">
            <div class="card-header fw-bold fs-5">
                {title}
            </div>
            <ul class="list-group list-group-flush">
                {
                    options.map((option) => {
                        return (
                            <li class="list-group-item list-group-item-action">
                                <NavLink className='nav-link text-success' to={option.ch}>
                                    <i className={`fa fa-${option.icon}`}></i>&ensp;{option.title}
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default OrderOptionContainer

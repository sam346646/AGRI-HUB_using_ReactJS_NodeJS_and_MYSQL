import React from 'react'

function Breadcrumbs(props) {
    return (
        <div className="d-block bg_breadcrumbs pt-3 p-2 mb-3 rounded">
            <h5><b><i className={`fa fa-fw fa-${props.breadcrumbs_icon}`}></i> {props.breadcrumbs_title}</b></h5>
        </div>
    )
}

export default Breadcrumbs
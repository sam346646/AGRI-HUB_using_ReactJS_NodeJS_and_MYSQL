import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

import Breadcrumbs from '../components/Breadcrumbs';
import CustomModalRejectQuery from '../components/CustomModalRejectQuery'


function ViewQueries({fromNavbar}) {

    const navigate = useNavigate()

    const [queryList, setQueryList] = useState([])
    const [isContentAvailiable, setIsContentAvailiable] = useState(true)
    const [reload, setReload] = useState(true)

    useEffect(() => {
        Axios.get('http://localhost:8000/query/getpending').then((response) => {
            setQueryList(response.data)
        })
    }, [reload])

    useEffect(() => {
        (queryList.length !== 0) ? setIsContentAvailiable(true) : setIsContentAvailiable(false);
    }, [queryList]);

    const rejectQuery=(modId,reason)=>{
        const formdata = new FormData();
        formdata.append('reason', reason)
        Axios.put(`http://localhost:8000/query/changestatus/${modId}`,formdata)
        navigate('/admin')
        setReload(!reload)
    }

    return (
        <div className={(fromNavbar) ? 'content_area' : null}>
            <Breadcrumbs breadcrumbs_title='Report Issued' breadcrumbs_icon='bell' />
            <span style={(isContentAvailiable === true) ? { display: 'none' } : null} className='text-danger fw-bold fs-5'>&emsp;*No Queries availiable.</span>
            <table className="table table-striped table-bordered table-hover" style={(isContentAvailiable === true) ? null : { display: 'none' }}>
                <tbody>
                    <tr>
                        <th>User</th>
                        <th>Product/Order</th>
                        <th>Issue</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Manage</th>
                    </tr>
                </tbody>
                <tbody>
                    {
                        queryList.map((query) => {
                            return (
                                <tr>
                                    <td>{query.Farmer_id}</td>
                                    <td>{query.Product_id}</td>
                                    <td>{query.Query_name}</td>
                                    <td>{query.Query_description}</td>
                                    <td className='text-danger'><i className='fa fa-spinner'></i> {query.Query_status}</td>
                                    <td>
                                        <NavLink to={`solve_query/${query.Query_id}`} className='btn btn-success btn-sm me-2'>Solve</NavLink>
                                        <button className='btn btn-danger btn-sm' data-bs-toggle="modal" data-bs-target={`#${query.Query_id}`}>Reject</button>
                                        <CustomModalRejectQuery message={`You are going reject the query`} action={rejectQuery} modId={`${query.Query_id}`} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ViewQueries

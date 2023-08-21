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

    const solvedQuery=(modId,reason)=>{
        Axios.put(`http://localhost:8000/query/changestatus/${modId}`,{reason: reason})
        navigate('/admin')
        setReload(!reload)
    }

    return (
        <div className={(fromNavbar) ? 'content_area' : null}>
            <Breadcrumbs breadcrumbs_title='Issues' breadcrumbs_icon='bell' />
            <span style={(isContentAvailiable === true) ? { display: 'none' } : null} className='text-danger fw-bold fs-5'>&emsp;*No Queries availiable.</span>
            <table className="table table-striped table-bordered table-hover" style={(isContentAvailiable === true) ? null : { display: 'none' }}>
                <tbody>
                    <tr>
                        <th>Query By</th>
                        <th>Issue On</th>
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
                                    <td>{query.Query_user_id}. {query.Query_user}</td>
                                    <td>{query.Issue_id}. {query.Issue_on}</td>
                                    <td>{query.Query_name}</td>
                                    <td>{query.Query_description}</td>
                                    <td className='text-danger'><i className='fa fa-spinner'></i> {query.Query_status}</td>
                                    <td>
                                        <button className='btn btn-success btn-sm me-3' data-bs-toggle="modal" data-bs-target={`#${query.Query_id}`}>Solved</button>
                                        <CustomModalRejectQuery message={`Query is solved`} action={solvedQuery} modId={`${query.Query_id}`} />
                                        <button onClick={()=>localStorage.setItem('pinnedQuery',JSON.stringify(query))} className='btn btn-secondary btn-sm'><i className='fa fa-thumb-tack'></i> Pin</button>
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

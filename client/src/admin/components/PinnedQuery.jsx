import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

import CustomModalRejectQuery from './CustomModalRejectQuery'

function PinnedQuery() {

    const navigate = useNavigate()

    const [pinnedQueryList, setPinnedQueryList] = useState([])

    useEffect(() => {
        setPinnedQueryList(JSON.parse(localStorage.getItem('pinnedQuery')))
    }, [])

    const solvedQuery = (modId, reason) => {
        Axios.put(`http://localhost:8000/query/changestatus/${pinnedQueryList.Query_id}`, { reason: reason })
        navigate('/admin')
    }

    return (
        <div className="bg-white rounded shadow-sm py-4 px-2 text-secondary">
            <div className='fw-bold fs-5 mb-3 text-center text-dark'><i className='fa fa-thumb-tack'></i> Pinned</div>
            <div className='mb-2'>Query By: {pinnedQueryList.Query_user_id}. {pinnedQueryList.Query_user}</div>
            <div className='mb-4'>Issue On: {pinnedQueryList.Issue_id}. {pinnedQueryList.Issue_on}</div>
            <div className='mb-2 fw-bold text-center text-dark'>{pinnedQueryList.Query_name}</div>
            <div>{pinnedQueryList.Query_description}</div><br />
            <div className='text-center'>
                <button className='btn btn-success btn-sm me-3' data-bs-toggle="modal" data-bs-target={`#solvedbtn`}>Solved</button>
            </div>
            <CustomModalRejectQuery message={`Query is solved`} action={solvedQuery} modId={`solvedbtn`} />
        </div>
    )
}

export default PinnedQuery

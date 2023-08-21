import React, { useEffect, useState } from 'react'

function PinnedQuery() {

    const [pinnedQueryList, setPinnedQueryList] = useState([])

    useEffect(() => {
        setPinnedQueryList(JSON.parse(localStorage.getItem('pinnedQuery')))
    }, [])
    console.log(pinnedQueryList)

    return (
        <div className="bg-white rounded shadow-sm py-4 px-2 text-secondary">
            <div className='fw-bold fs-5 mb-3 text-center text-dark'><i className='fa fa-thumb-tack'></i> Pinned</div>
            <div className='mb-2'>Query By: {pinnedQueryList.Query_user_id}. {pinnedQueryList.Query_user}</div>
            <div className='mb-4'>Issue On: {pinnedQueryList.Issue_id}. {pinnedQueryList.Issue_on}</div>
            <div className='mb-2 fw-bold text-center text-dark'>{pinnedQueryList.Query_name}</div>
            <div>{pinnedQueryList.Query_description}</div>
        </div>
    )
}

export default PinnedQuery

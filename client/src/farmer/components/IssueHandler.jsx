import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

import CustomModal from './CustomModal'

function IssueHandler({ choice }) {

    const navigate = useNavigate()

    const [issueOn, setIssueOn] = useState()
    const [issueId, setIssueId] = useState()
    const [issue, setIssue] = useState()
    const [description, setDescription] = useState()
    const [isContentAvailiable, setIsContentAvailiable] = useState(true)
    const [queryList, setQueryList] = useState([])

    const category = ['Issue on Profile','Issue on Order', 'Issue on Product','Add Category', 'Other']

    useEffect(() => {
        Axios.post('http://localhost:8000/query/getall', { id: localStorage.getItem('usrId'), usr: localStorage.getItem('userType') }).then((response) => {
            setQueryList(response.data)
        })
    }, [])

    useEffect(() => {
        (queryList.length !== 0) ? setIsContentAvailiable(true) : setIsContentAvailiable(false);
    }, [queryList]);

    const insertIssue = () => {
        console.log(issue)
        const formdata = new FormData();
        formdata.append('user', localStorage.getItem('userType'))
        formdata.append('id', localStorage.getItem('usrId'))
        formdata.append('issueOn', issueOn)
        formdata.append('issueId', issueId)
        formdata.append('issue', issue)
        formdata.append('description', description)
        Axios.post('http://localhost:8000/query/insert', formdata).then((response) => {
        });
        navigate("/farmer");
    }

    return (
        (choice == 1) ?
            <div className='w-50'>
                <div className="form-group mb-3">
                    <label className="form-label">Issue</label>
                    <select name="issue" value={issue} onChange={(e) => setIssue(e.target.value)} className="form-select" required>
                        {category.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="form-group mb-3">
                    <button className="form-control btn btn-success" data-bs-toggle="modal" data-bs-target="#insertIssue">Report Issue</button>
                    <CustomModal message={`You are reporting an issue`} action={insertIssue} modId='insertIssue' />
                </div>
            </div>
            :
            <div>
                <span style={(isContentAvailiable === true) ? { display: 'none' } : null} className='text-danger fw-bold fs-5'>&emsp;*Queries not availiable.</span>
                <table className="table table-striped table-bordered table-hover" style={(isContentAvailiable === true) ? null : { display: 'none' }}>
                    <tbody>
                        <tr>
                            <th>Issue on</th>
                            <th>Issue id</th>
                            <th>Issue</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {
                            queryList.map((query) => {
                                return (
                                    <tr>
                                        <td>{query.Issue_on}</td>
                                        <td>{query.Issue_id}</td>
                                        <td>{query.Query_name}</td>
                                        <td>{query.Query_description}</td>
                                        <td className='text-danger'>
                                            {(query.Query_status === 'In process') ? <><i className='fa fa-spinner'></i> {query.Query_status}</> : null}
                                            {(query.Query_status === 'Rejected') ? <><i className='fa fa-remove'></i> {query.Query_status}</> : null}
                                            {(query.Query_status === 'Solved') ? <span className='text-success'><i className='fa fa-check'></i> {query.Query_status}</span> : null}
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

export default IssueHandler

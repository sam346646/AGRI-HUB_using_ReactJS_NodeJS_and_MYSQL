import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

import CustomModal from './CustomModal'

function IssueHandler({ choice }) {

    const navigate = useNavigate()

    const [issue, setIssue] = useState('Add Category')
    const [farmerId, setFarmerId] = useState(1)
    const [productId, setProductId] = useState(0)
    const [orderId, setOrderId] = useState(0)
    const [description, setDescription] = useState()
    const [isContentAvailiable, setIsContentAvailiable] = useState(true)
    const [queryList, setQueryList] = useState([])

    const category = ['Add Category', 'Issue on Order', 'Issue on Product', 'Issue on Profile', 'Other']

    useEffect(() => {
        Axios.get('http://localhost:8000/query/getall').then((response) => {
            setQueryList(response.data)
        })
    }, [])

    useEffect(() => {
        (queryList.length !== 0) ? setIsContentAvailiable(true) : setIsContentAvailiable(false);
    }, [queryList]);

    const insertIssue = () => {
        console.log(issue)
        const formdata = new FormData();
        formdata.append('farmerId', farmerId)
        formdata.append('retailerId', 0)
        formdata.append('productId', productId)
        formdata.append('orderId', orderId)
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
                            <th>Product/Order</th>
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
                                        <td>{(query.Product_id == 0) ? 'Add Category': <>{query.Product_id}</> }</td>
                                        <td>{query.Query_name}</td>
                                        <td>{query.Query_description}</td>
                                        <td className='text-danger'>
                                            { (query.Query_status==='In process') ? <><i className='fa fa-spinner'></i> {query.Query_status}</> : null }
                                            { (query.Query_status==='Rejected') ? <><i className='fa fa-remove'></i> {query.Query_status}</> : null }
                                            { (query.Query_status==='Solved') ? <span className='text-success'><i className='fa fa-check'></i> {query.Query_status}</span> : null }     
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

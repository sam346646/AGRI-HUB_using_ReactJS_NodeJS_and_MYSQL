import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

import CustomModal from './CustomModal'

function IssueHandler({ choice }) {

    const navigate = useNavigate()

    const [issueOn, setIssueOn] = useState(localStorage.getItem('userType'))
    const [issueId, setIssueId] = useState(localStorage.getItem('usrId'))
    const [issue, setIssue] = useState('Issue on Profile')
    const [description, setDescription] = useState()
    const [isContentAvailiable, setIsContentAvailiable] = useState(true)
    const [queryList, setQueryList] = useState([])
    const [orderList, setOrderList] = useState([])
    const [prodList, setProdList] = useState([])

    const [errDescription, setErrDescription] = useState()
    const [isOrder, setIsOrder] = useState(false)
    const [isProduct, setIsProduct] = useState(false)

    const category = ['Issue on Profile', 'Issue on Order', 'Issue on Product', 'Add Category', 'Issue on Approve Product', 'Other']

    useEffect(() => {
        Axios.post('http://localhost:8000/query/getall', { id: localStorage.getItem('usrId'), usr: localStorage.getItem('userType') }).then((response) => {
            setQueryList(response.data)
        })
    }, [])

    useEffect(() => {
        (queryList.length !== 0) ? setIsContentAvailiable(true) : setIsContentAvailiable(false);
    }, [queryList]);

    useEffect(() => {
        if (issue == category[0]) {
            setIsOrder(false)
            setIsProduct(false)
            setIssueOn(localStorage.getItem('userType'))
            setIssueId(localStorage.getItem('usrId'))
        }
        else if (issue == category[1]) {
            setIssueOn('order')
            setIsProduct(false)
            setIsOrder(true)
            Axios.post('http://localhost:8000/query/getfarmerorder', { usrId: localStorage.getItem('usrId') }).then((response) => {
                setOrderList(response.data)
            });
        }
        else if (issue == category[2]) {
            setIssueOn('product')
            setIsOrder(false)
            setIsProduct(true)
            Axios.post('http://localhost:8000/query/getfarmerproduct', { usrId: localStorage.getItem('usrId') }).then((response) => {
                setProdList(response.data)
            });
        }
        else if (issue == category[3]) {
            setIssueOn('category')
            setIssueId(0)
            setIsOrder(false)
            setIsProduct(false)
        }
        else if (issue == category[4]) {
            setIssueOn('approve product')
            setIssueId(0)
            setIsOrder(false)
            setIsProduct(false)
        }
        else {
            setIssueOn('other')
            setIssueId(0)
            setIsOrder(false)
            setIsProduct(false)
        }
    }, [issue])

    const insertIssue = () => {
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
                    <select value={issue} onChange={(e) => setIssue(e.target.value)} className="form-select" required>
                        {category.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>


                {(isOrder) &&
                    <div className="form-group mb-3">
                        <label className="form-label">Select order</label>
                        <select name="issue" value={issueId} onChange={(e) => setIssueId(e.target.value)} className="form-select" required>
                            {orderList.map((order, index) => (
                                <option key={index} value={order.Order_id}>{order.Prod_name}-&gt; {order.Retailer_name}-&gt; {new Date(order.Order_date).toISOString().split('T')[0]}-&gt; Qty:{order.Quantity}</option>
                            ))}
                        </select>
                    </div>
                }

                {(isProduct) &&
                    <div className="form-group mb-3">
                        <label className="form-label">Select order</label>
                        <select name="issue" value={issueId} onChange={(e) => setIssueId(e.target.value)} className="form-select" required>
                            {prodList.map((prod, index) => (
                                <option key={index} value={prod.Prod_id}>{prod.Prod_name}-&gt; {new Date(prod.Prod_order_date).toISOString().split('T')[0]}-&gt; Price:{prod.Prod_price}</option>
                            ))}
                        </select>
                    </div>
                }


                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}
                        onBlur={() => (description == '') ? setErrDescription('Please provide description of the issue you are facing.') : setErrDescription('')}></textarea>
                    <span className='text-danger'>{errDescription}</span>
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
                            <th>Reply</th>
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
                                        <td>{query.Query_reply}</td>
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

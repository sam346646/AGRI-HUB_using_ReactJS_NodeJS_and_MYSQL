import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import AddCategory from './AddCategory';

function SolveQuery({ withoutIssue }) {

    const { id } = useParams();

    const [queryList, setQueryList] = useState([])

    useEffect(() => {
        Axios.get(`http://localhost:8000/query/get/${id}`).then((response) => {
            setQueryList(response.data)
        })
    }, [])

    return (
        <div className="content_area">
            {(withoutIssue) ?
                <>
                    <Breadcrumbs breadcrumbs_title='Add Category' breadcrumbs_icon='book' />
                    <AddCategory queryId={id} />
                </>
                :
                <>
                    <Breadcrumbs breadcrumbs_title='Issue Details' breadcrumbs_icon='book' />
                    <table className="table table-striped table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th>Farmer / reatiler  Id</th>
                                <th>Product / Order Id</th>
                                <th>Issue</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Email</th>
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
                                            <td>{query.Farmer_email}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <div className='w-50 justify-content-center mx-auto mt-5'>
                        {(queryList.length > 0) ?
                            <>
                                {(queryList[0].Query_name === 'Add Category') ? <AddCategory queryId={id} /> : null}
                            </>
                            : null}

                    </div>
                </>
            }
        </div>
    )
}

export default SolveQuery

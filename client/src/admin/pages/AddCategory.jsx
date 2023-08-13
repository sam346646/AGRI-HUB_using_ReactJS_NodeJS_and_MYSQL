import React, { useEffect, useState } from 'react'
import CustomModal from '../components/CustomModal'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

function AddCategory({queryId}) {

    const navigate = useNavigate()

    const [name, setName] = useState()
    const [measure, setMeasure] = useState()
    const [expiry, setExpiry] = useState()

    const [errName, setErrName] = useState()
    const [errMeasure, setErrMeasure] = useState()
    const [errExpiry, setErrExpiry] = useState()
    const [isInvalid, setIsInvalid] = useState(true)

    const insertCategory = () => {
        const formdata = new FormData();
        formdata.append('name', name)
        formdata.append('measure', measure)
        formdata.append('expiry', expiry)
        if(queryId) { formdata.append('queryId', queryId) }
        Axios.post('http://localhost:8000/admin/insertCategory', formdata).then((response) => {
        });
        navigate("/admin");
    }

    //Validation
    useEffect(() => {
        if (errName || errMeasure || errExpiry || !name || !measure || !expiry) {
            setIsInvalid(true)
        }
        else {
            setIsInvalid(false)
        }
    }, [errName, errMeasure, errExpiry, name, measure, expiry])


    return (
        <>
            <div className="form-group mb-3">
                <label className="form-label">Category Name</label>
                <input type="text" value={name}
                    onChange={(e) => {
                        if (/^[A-Za-z ]*$/.test(e.target.value)) {
                            setName(e.target.value)
                            setErrName('')
                        }
                        else {
                            setErrName('Please enter alphabets only.')
                        }
                    }
                    }
                    className="form-control" autoComplete="off" placeholder='Fruit' required />
                <span class="text-danger" aria-live="polite">{errName}</span>
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Category Measure</label>
                <input type="text" value={measure}
                    onChange={(e) => {
                        if (/^[A-Za-z ]*$/.test(e.target.value)) {
                            setMeasure(e.target.value)
                            setErrMeasure('')
                        }
                        else {
                            setErrMeasure('Please enter alphabets only.')
                        }
                    }
                    }
                    className="form-control" autoComplete="off" placeholder='Kg' required />
                <span class="text-danger" aria-live="polite">{errMeasure}</span>
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Category Expiry(in days)</label>
                <input type="text" value={expiry}
                    onChange={(e) => {
                        if (/^[0-9]*$/.test(e.target.value)) {
                            setExpiry(e.target.value)
                            setErrExpiry('')
                        }
                        else {
                            setErrExpiry('Please enter numbers only.')
                        }
                    }
                    }
                    className="form-control" autoComplete="off" placeholder='30' required />
                <span class="text-danger" aria-live="polite">{errExpiry}</span>
            </div>

            <div className="form-group mb-3">
                <button className="form-control btn btn-success" data-bs-toggle="modal" data-bs-target="#insertBtn" disabled={isInvalid}>Add Category</button>
                <CustomModal message={`You are going to add ${name} category`} action={insertCategory} modId='insertBtn' />
                {(isInvalid) ? <span class="text-danger" aria-live="polite">*Please fill mandatory fields to continue.</span> : null}
            </div>
        </>
    )
}

export default AddCategory

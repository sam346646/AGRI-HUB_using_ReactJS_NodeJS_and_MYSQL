import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import CustomModal from '../components/CustomModal';

function ViewFarmers() {

    const navigate = useNavigate()

    const [name, setName] = useState()

    const [farmerList, setFarmerList] = useState([])
    const [updatedFarmerList, setUpdatedFarmerList] = useState([])
    const [isContentAvailiable, setIsContentAvailiable] = useState(true)
    const [isEditEnable, setIsEditEnable] = useState(false)

    const [rid, setRid] = useState()
    const [rname, setRname] = useState()
    const [district, setDistrict] = useState()
    const [contact, setContact] = useState()
    const [email, setEmail] = useState()

    const [errName, setErrName] = useState()
    const [errContact, setErrContact] = useState()
    const [errEmail, setErrEmail] = useState()
    const [isInvalid, setIsInvalid] = useState(false)

    const districtList = ['Chamarajanagara', 'Chikkamagaluru', 'Dakshina Kannada', 'Hassan', 'Kodagu', 'Mandya', 'Mysuru', 'Udupi', 'Bengaluru Rural', 'Bengaluru Urban', 'Chikkaballapura', 'Chitradurga', 'Davanagere', 'Kolar', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Bagalkote', 'Belagavi', 'Dharwada', 'Gadaga', 'Haveri', 'Uttara Kannada', 'Vijayapura', 'Ballari', 'Bidar', 'Kalaburagi', 'Koppala', 'Raichuru', 'Vijayanagara', 'Yadagiri']


    useEffect(() => {
        Axios.get('http://localhost:8000/user/getfarmers').then((response) => {
            setFarmerList(response.data)
        })
    }, [])

    useEffect(() => {
        (farmerList.length !== 0) ? setIsContentAvailiable(true) : setIsContentAvailiable(false);
        setUpdatedFarmerList(farmerList)
    }, [farmerList]);

    const searchName = (e) => {
        let temp = e.target.value;
        if (/^[A-Za-z ]*$/.test(temp)) {
            setName(temp)
        }
        setIsEditEnable(false)
        setUpdatedFarmerList(farmerList.filter(farmer => farmer.name.toLowerCase().includes(temp.toLowerCase())));
    }

    const editHandle = (r) => {
        setIsEditEnable(true)
        setRid(r.id)
        setRname(r.name)
        setDistrict(r.district)
        setContact(r.contact)
        setEmail(r.email)
    }

    //Validation
    useEffect(() => {
        if (errName || errContact || errEmail || !rname || !contact || !email) {
            setIsInvalid(true)
        }
        else {
            setIsInvalid(false)
        }
    }, [errName, errContact, errEmail, rname, contact, email])

    const updateFarmer = async() => {
        const response = await fetch('http://localhost:8000/user/updateFarmer', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ rname, district, contact, email, rid }),
        });
        navigate('/admin')
    }

    const terminateFarmer= async(id)=> {
        const response = await fetch('http://localhost:8000/user/terminateFarmer', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ id }),
        });
        navigate('/admin')
    }

    return (
        <div className='content_area'>
            <Breadcrumbs breadcrumbs_title='Farmers' breadcrumbs_icon='user' />
            <div class="input-group my-3 ms-auto w-25">
                <input type="text" class="form-control" placeholder="Search by Farmer name" value={name} onChange={searchName} />
                <button class="btn btn-outline-secondary"><i className='fa fa-search'></i></button>
            </div>

            <span style={(isContentAvailiable === true) ? { display: 'none' } : null} className='text-danger fw-bold fs-5'>&emsp;*No Farmers found</span>
            {(!isEditEnable) &&
                <table className="table table-striped table-bordered table-hover" style={(isContentAvailiable === true) ? null : { display: 'none' }}>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>District</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Manage</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {
                            updatedFarmerList.map((farmer) => {
                                return (
                                    <tr>
                                        <td>{farmer.name}</td>
                                        <td>{farmer.district}</td>
                                        <td>{farmer.contact}</td>
                                        <td>{farmer.email}</td>
                                        <td>
                                            <button className='nav-link text-primary' onClick={() => editHandle(farmer)}><i className="fa fa-pencil"></i> Edit</button>
                                        </td>
                                        <td>
                                            <button data-bs-toggle="modal" data-bs-target={`#deleteBtn${farmer.id}`} className='btn btn-danger btn-sm'>Terminate</button>
                                            <CustomModal message={`You are terminatning ${farmer.name}`} action={() => terminateFarmer(farmer.id)} modId={`deleteBtn${farmer.id}`} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }

            {(isEditEnable) &&
                <div className='w-50 mx-auto'>
                    <div className="form-group mb-2">
                        <label className="form-label">Name</label>
                        <input type="text" value={rname}
                            onChange={(e) => {
                                if (/^[A-Za-z ]*$/.test(e.target.value)) {
                                    setRname(e.target.value)
                                    setErrName('')
                                }
                                else {
                                    setErrName(`Please provide valid name.`)
                                }
                            }
                            }
                            onBlur={() => (rname === '') ? setErrName(`Please provide valid name.`) : setErrName('')}
                            className="form-control" maxLength='30' autoComplete="off" placeholder='Sam' required />
                        <span class="text-danger" aria-live="polite">{errName}</span>
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label">District</label>
                        <select value={district} onChange={(e) => setDistrict(e.target.value)} className="form-select" required>
                            {districtList.map((d, index) => (
                                <option key={index} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group mb-2">
                        <label className="form-label">Contact No</label>
                        <input type="text" value={contact}
                            onChange={(e) => {
                                if (/^[0-9]*$/.test(e.target.value)) {
                                    setContact(e.target.value)
                                    setErrContact('')
                                }
                                else {
                                    setErrContact(`Please provide valid contact no.`)
                                }
                            }
                            }
                            onBlur={() => (contact === '') ? setErrContact(`Please provide valid contact no.`) : setErrContact('')}
                            className="form-control" maxLength='10' autoComplete="off" placeholder='7760506932' required />
                        <span class="text-danger" aria-live="polite">{errContact}</span>
                    </div>

                    <div className="form-group mb-2">
                        <label className="form-label">Email</label>
                        <input type="text" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() =>
                                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email) ? setErrEmail('') : setErrEmail(`Please provide a valid email.`)
                            }
                            className="form-control" maxLength='20' autoComplete="off" placeholder='example@gmail.com' required />
                        <span class="text-danger" aria-live="polite">{errEmail}</span>
                    </div>

                    <div className="text-center mb-2">
                        <button onClick={() => updateFarmer()} className="btn btn-secondary mt-3" disabled={isInvalid}> <i className="fa fa-user"></i>&nbsp;Update </button><br />
                    </div>
                </div>
            }
        </div>
    )
}

export default ViewFarmers

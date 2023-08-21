import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import CustomModal from '../components/CustomModal';
import PinnedQuery from '../components/PinnedQuery';

function ViewFarmers() {

    const navigate = useNavigate()

    const [name, setName] = useState()

    const [farmerList, setFarmerList] = useState([])
    const [updatedFarmerList, setUpdatedFarmerList] = useState([])
    const [isContentAvailiable, setIsContentAvailiable] = useState(true)
    const [isEditEnable, setIsEditEnable] = useState(false)

    const [rid, setRid] = useState()
    const [rname, setRname] = useState()
    const [area, setArea] = useState()
    const [village, setVillage] = useState()
    const [district, setDistrict] = useState()
    const [contact, setContact] = useState()

    const [errName, setErrName] = useState()
    const [errArea, setErrArea] = useState()
    const [errVillage, setErrVillage] = useState()
    const [errContact, setErrContact] = useState()
    const [isInvalid, setIsInvalid] = useState(false)
    const [isId, setIsId] = useState(true)

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
        setName(temp)
        setIsEditEnable(false)
        if (isId) {
            if (temp == '') {
                setUpdatedFarmerList(farmerList);
            }
            else {
                setUpdatedFarmerList(farmerList.filter(farmer => farmer.id == temp));
            }
        }
        else {
            if (temp == '') {
                setUpdatedFarmerList(farmerList);
            }
            else {
                setUpdatedFarmerList(farmerList.filter(farmer => farmer.email.toLowerCase().includes(temp.toLowerCase())));
            }
        }
    }

    const editHandle = (r) => {
        setIsEditEnable(true)
        setRid(r.id)
        setRname(r.name)
        setArea(r.area)
        setVillage(r.village)
        setDistrict(r.district)
        setContact(r.contact)
    }

    //Validation
    useEffect(() => {
        if (errName || errArea || errVillage || errContact || !rname || !area || !village || !contact) {
            setIsInvalid(true)
        }
        else {
            setIsInvalid(false)
        }
    }, [errName, errArea, errVillage, errContact, rname, area, village, contact])

    const updateFarmer = () => {
        Axios.put('http://localhost:8000/user/updateFarmer', { rname, area, village, district, contact, rid }).then((response) => {
            if (response) {
                navigate('/admin')
            }
        })
    }

    const terminateFarmer = (id) => {
        Axios.put('http://localhost:8000/user/terminateFarmer', { id }).then((response) => {
            navigate('/admin')
        })
    }

    return (
        <div className='content_area'>
            <Breadcrumbs breadcrumbs_title='Farmers' breadcrumbs_icon='user' />
            <div className="row">
                <div className="col-10">
                    <div class="input-group mb-3 ms-auto w-50">
                        <input type="text" value={name} onChange={searchName} class="form-control" placeholder={`Search by Farmer ${(isId) ? 'id' : 'email'}`} />
                        <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Search Options</button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><button onClick={() => setIsId(true)} class="dropdown-item">Search by id</button></li>
                            <li><button onClick={() => setIsId(false)} class="dropdown-item">Search by email</button></li>
                        </ul>
                    </div>

                    <span style={(isContentAvailiable === true) ? { display: 'none' } : null} className='text-danger fw-bold fs-5'>&emsp;*No Retailers found</span>
                    {(!isEditEnable) &&
                        <table className="table table-striped table-bordered table-hover" style={(isContentAvailiable === true) ? null : { display: 'none' }}>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
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
                                                <td>{farmer.area}, {farmer.village}, {farmer.district}</td>
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

                            <div className="form-group mb-2">
                                <label className="form-label">Area</label>
                                <input type="text" value={area}
                                    onChange={(e) => {
                                        if (/^[A-Za-z0-9 ,.]*$/.test(e.target.value)) {
                                            setArea(e.target.value)
                                            setErrArea('')
                                        }
                                        else {
                                            setErrArea(`Please provide valid area.`)
                                        }
                                    }
                                    }
                                    onBlur={() => (area === '') ? setErrArea(`Please provide area.`) : setErrArea('')}
                                    className="form-control" maxLength='30' autoComplete="off" placeholder='Near City Center, Hampankatta' required />
                                <span class="text-danger" aria-live="polite">{errArea}</span>
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Village/City</label>
                                <input type="text" value={village}
                                    onChange={(e) => {
                                        if (/^[A-Za-z ]*$/.test(e.target.value)) {
                                            setVillage(e.target.value)
                                            setErrVillage('')
                                        }
                                        else {
                                            setErrVillage(`Please provide valid village/city.`)
                                        }
                                    }
                                    }
                                    onBlur={() => (village === '') ? setErrVillage(`Please provide village/city.`) : setErrVillage('')}
                                    className="form-control" maxLength='30' autoComplete="off" placeholder='Mangalore' required />
                                <span class="text-danger" aria-live="polite">{errVillage}</span>
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

                            <div className="text-center mb-2">
                                <button data-bs-toggle="modal" data-bs-target={`#editBtn`} className="btn btn-secondary mt-3" disabled={isInvalid}> <i className="fa fa-user"></i>&nbsp;Update </button><br />
                            </div>
                            <CustomModal message={`You are updating retailer details.`} action={() => updateFarmer()} modId={`editBtn`} />
                        </div>
                    }
                </div>
                <div className="col-2 mt-5">
                    <PinnedQuery />
                </div>
            </div>
        </div>
    )
}

export default ViewFarmers

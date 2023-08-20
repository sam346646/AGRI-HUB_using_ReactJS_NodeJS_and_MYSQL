import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

import Footer from './Footer'
import CustomModal from '../components/CustomModal'

function ManageProfile() {

  const { manageProfileCh } = useParams()
  const [ch, setCh] = useState(parseInt(manageProfileCh))
  const user = 'Retailer'

  const [retailername, setRetailerName] = useState()
  const [retailerarea, setRetailerArea] = useState()
  const [retailervillage, setRetailerVillage] = useState()
  const [retailerdistrict, setRetailerDistrict] = useState()
  const [retailercontact, setRetailerContact] = useState()
  const [retaileremail, setRetailerEmail] = useState()

  const [name, setName] = useState()
  const [area, setArea] = useState()
  const [village, setVillage] = useState()
  const [district, setDistrict] = useState()
  const [contact, setContact] = useState()
  const [email, setEmail] = useState()
  const [pass, setPass] = useState()
  const [cpass, setCpass] = useState()

  const [errName, setErrName] = useState()
  const [errArea, setErrArea] = useState()
  const [errVillage, setErrVillage] = useState()
  const [errContact, setErrContact] = useState()
  const [errEmail, setErrEmail] = useState()
  const [errPass, setErrPass] = useState()
  const [errCpass, setErrCpass] = useState()
  const [isInvalid, setIsInvalid] = useState(true)
  const [errChangePass, setErrChangePass] = useState()
  const [errChangeEmail, setErrChangeEmail] = useState()

  const districtList = ['Chamarajanagara', 'Chikkamagaluru', 'Dakshina Kannada', 'Hassan', 'Kodagu', 'Mandya', 'Mysuru', 'Udupi', 'Bengaluru Rural', 'Bengaluru Urban', 'Chikkaballapura', 'Chitradurga', 'Davanagere', 'Kolar', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Bagalkote', 'Belagavi', 'Dharwada', 'Gadaga', 'Haveri', 'Uttara Kannada', 'Vijayapura', 'Ballari', 'Bidar', 'Kalaburagi', 'Koppala', 'Raichuru', 'Vijayanagara', 'Yadagiri']

  useEffect(() => {
    Axios.post('http://localhost:8000/user/get', { id: localStorage.getItem('usrId'), choice: localStorage.getItem('userType') }).then((response) => {
      setRetailerName(response.data[0].name)
      setRetailerArea(response.data[0].area)
      setRetailerVillage(response.data[0].village)
      setRetailerDistrict(response.data[0].district)
      setRetailerContact(response.data[0].contact)
      setRetailerEmail(response.data[0].email)
    })
  }, [])

  useEffect(() => {
    if (ch === 2) {
      setName(retailername)
      setArea(retailerarea)
      setVillage(retailervillage)
      setDistrict(retailerdistrict)
      setContact(retailercontact)
    }
  }, [ch])

  useEffect(() => {
    if (errName || errArea || errVillage || errContact || !name || !area || !village || !contact) {
      setIsInvalid(true)
    }
    else {
      setIsInvalid(false)
    }
  }, [errName, errArea, errVillage, errContact, name, area, village, contact])

  const updateHandle = () => {
    Axios.put('http://localhost:8000/user/update', { name: name, area: area, village: village, district: district, contact: contact, choice: localStorage.getItem('userType'), id: localStorage.getItem('usrId') }).then((response) => {
      if (response.data.success) {
        setRetailerName(name)
        setRetailerArea(area)
        setRetailerVillage(village)
        setRetailerDistrict(district)
        setRetailerContact(contact)
        setCh(1)
      }
    })
  }

  useEffect(() => {
    if (!pass || errPass || !cpass || errCpass) {
      setIsInvalid(true)
    }
    else {
      setIsInvalid(false)
    }
  }, [errPass, errCpass, pass, cpass])

  useEffect(() => {
    setTimeout(() => {
      setErrChangePass('');
    }, 5000);
  }, [errChangePass])

  const changePassHandle = () => {
    Axios.put('http://localhost:8000/user/changepass', { pass: pass, choice: localStorage.getItem('userType'), id: localStorage.getItem('usrId') }).then((response) => {
      if (response.data.success) {
        setPass('')
        setCpass('')
        setCh(1)
      }
      else if (response.data.samepass) {
        setErrChangePass("Password can't be same as previous password")
      }
    })
  }

  useEffect(() => {
    if (!email || errEmail) {
      setIsInvalid(true)
    }
    else {
      setIsInvalid(false)
    }
  }, [errEmail, email])

  useEffect(() => {
    setTimeout(() => {
      setErrChangeEmail('');
    }, 5000);
  }, [errChangeEmail])

  const changeEmailHandle = () => {
    Axios.put('http://localhost:8000/user/changeemail', { email: email, choice: localStorage.getItem('userType'), id: localStorage.getItem('usrId') }).then((response) => {
      if (response.data.success) {
        setRetailerEmail(email)
        setEmail('')
        setCh(1)
      }
      else if(response.data.emailExists){
        setErrChangeEmail('Provided email is already registered. Please use different email..')
      }
    })
  }

  return (
    <>
      <div className='retailer_content_area container-fluid py-5 ps-5'>
        <div className="row py-4">
          <div className="col-3">
            <div class="card mb-5">
              <div class="card-header fw-bold fs-5">
                Profile
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action">
                  <button className='nav-link text-success' onClick={() => setCh(1)}>
                    <i className='fa fa-user'></i> My Profile
                  </button>
                </li>
                <li class="list-group-item list-group-item-action">
                  <button className='nav-link text-success' onClick={() => setCh(2)}>
                    <i className='fa fa-edit'></i> Edit Profile
                  </button>
                </li>
                <li class="list-group-item list-group-item-action">
                  <button className='nav-link text-success' onClick={() => setCh(3)}>
                    <i className='fa fa-gear'></i> Change Password
                  </button>
                </li>
                <li class="list-group-item list-group-item-action">
                  <button className='nav-link text-success' onClick={() => setCh(4)}>
                    <i className='fa fa-envelope'></i> Change Email
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {
            ch === 1 &&
            <div className="col-8 ps-5">
              <div className="card shadow-sm w-75">
                <div className='card-header text-secondary bg-white text-center'>
                  <i className='fa fa-user fa-5x'></i><br />
                  <div className='fs-1 fw-bold'>{retailername}</div>

                </div>
                <div className="nav-link">
                  <div className="card-footer">
                    <div><b>Address:</b> {retailerarea}, {retailervillage}, {retailerdistrict}.</div>
                    <div><b>Contact:</b> {retailercontact}</div>
                    <div><b>Email:</b> {retaileremail}</div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          }

          {
            ch === 2 &&
            <div className='col-9 w-50 px-5'>
              <div className="form-group mb-2">
                <label className="form-label">{user} Name</label>
                <input type="text" value={name}
                  onChange={(e) => {
                    if (/^[A-Za-z ]*$/.test(e.target.value)) {
                      setName(e.target.value)
                      setErrName('')
                    }
                    else {
                      setErrName(`Please provide valid ${user} name.`)
                    }
                  }
                  }
                  onBlur={() => (name === '') ? setErrName(`Please provide ${user} name.`) : setErrName('')}
                  className="form-control" maxLength='30' autoComplete="off" placeholder='Sam' required />
                <span class="text-danger" aria-live="polite">{errName}</span>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">{user} Area</label>
                <input type="text" value={area}
                  onChange={(e) => {
                    if (/^[A-Za-z0-9 ,.]*$/.test(e.target.value)) {
                      setArea(e.target.value)
                      setErrArea('')
                    }
                    else {
                      setErrArea(`Please provide valid ${user} area.`)
                    }
                  }
                  }
                  onBlur={() => (area === '') ? setErrArea(`Please provide ${user} area.`) : setErrArea('')}
                  className="form-control" maxLength='30' autoComplete="off" placeholder='Near City Center, Hampankatta' required />
                <span class="text-danger" aria-live="polite">{errArea}</span>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">{user} Village/City</label>
                <input type="text" value={village}
                  onChange={(e) => {
                    if (/^[A-Za-z ]*$/.test(e.target.value)) {
                      setVillage(e.target.value)
                      setErrVillage('')
                    }
                    else {
                      setErrVillage(`Please provide valid ${user} village/city.`)
                    }
                  }
                  }
                  onBlur={() => (village === '') ? setErrVillage(`Please provide ${user} village/city.`) : setErrVillage('')}
                  className="form-control" maxLength='30' autoComplete="off" placeholder='Mangalore' required />
                <span class="text-danger" aria-live="polite">{errVillage}</span>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">{user} District</label>
                <select value={district} onChange={(e) => setDistrict(e.target.value)} className="form-select" required>
                  {districtList.map((d, index) => (
                    <option key={index} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">{user} Contact No</label>
                <input type="text" value={contact}
                  onChange={(e) => {
                    if (/^[0-9]*$/.test(e.target.value)) {
                      setContact(e.target.value)
                      setErrContact('')
                    }
                    else {
                      setErrContact(`Please provide valid ${user} contact no.`)
                    }
                  }
                  }
                  onBlur={() => (contact === '' || contact.length !== 10) ? setErrContact(`Please provide 10 digits ${user} contact no.`) : setErrContact('')}
                  className="form-control" maxLength='10' autoComplete="off" placeholder='7760506932' required />
                <span class="text-danger" aria-live="polite">{errContact}</span>
              </div>

              <div className="text-center mb-2">
                <button className="btn btn-secondary" disabled={isInvalid} data-bs-toggle="modal" data-bs-target="#updateProfile"> <i className="fa fa-pencil"></i> Update </button><br />
              </div>
              <CustomModal message={'You are updating profile details'} action={() => updateHandle()} modId={'updateProfile'}/>
            </div>
          }

          {
            ch === 3 &&
            <div className='col-9 w-50 px-5'>
              <div className="form-group mb-2">
                <label className="form-label">Password</label>
                <input type="password" value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  onBlur={() => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass)) ? setErrPass('') : setErrPass(`Password must have at least one lowercase letter, one uppercase letter, one special character, and one number with a minimum length of 8 characters.`)}
                  className="form-control" maxLength='20' autoComplete="off" required />
                <span class="text-danger" aria-live="polite">{errPass}</span>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" value={cpass}
                  onChange={(e) => setCpass(e.target.value)}
                  onBlur={() => (cpass === pass) ? setErrCpass('') : setErrCpass(`Password doesn't match.`)}
                  className="form-control" maxLength='20' autoComplete="off" required />
                <span class="text-danger" aria-live="polite">{errCpass}</span>
              </div>

              <div className="text-center mb-2">
                <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#changePassProfile" disabled={isInvalid}> <i className="fa fa-gear"></i> Change Password </button><br />
                <span className='text-danger'>{errChangePass}</span>
              </div>
              <CustomModal message={'You are changing password'} action={() => changePassHandle()} modId={'changePassProfile'}/>
            </div>
          }

          {
            ch === 4 &&
            <div className='col-9 w-50 px-5'>
              <div className="form-group mb-2">
                <label className="form-label">{user} Email</label>
                <input type="text" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => {
                    if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email)) {
                      setErrEmail('');
                    } else {
                      setErrEmail(`Please provide a valid ${user} email.`);
                    }

                    if (email === retaileremail) {
                      setErrEmail("Email can't be the same as the previous email.");
                    } else {
                      setErrEmail('');
                    }
                  }
                  }
                  className="form-control" maxLength='20' autoComplete="off" placeholder='example@gmail.com' required />
                <span class="text-danger" aria-live="polite">{errEmail}</span>
              </div>

              <div className="mt-4">
                <button className="btn btn-secondary"  data-bs-toggle="modal" data-bs-target="#changeEmailProfile" disabled={isInvalid}> <i className="fa fa-envelope"></i> Change Email </button><br />
              </div>
              <span className='text-danger'>{errChangeEmail}</span>
              <CustomModal message={'You are changing email'} action={() => changeEmailHandle()} modId={'changeEmailProfile'}/>
            </div>
          }

        </div>
      </div>

      <Footer />
    </>
  )
}

export default ManageProfile

import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {

    const navigate = useNavigate()

    const [user, setUser] = useState('Retailer')
    const [name, setName] = useState()
    const [district, setDistrict] = useState('Dakshina Kannada')
    const [contact, setContact] = useState()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const [cpass, setCpass] = useState()

    const [errName, setErrName] = useState()
    const [errContact, setErrContact] = useState()
    const [errEmail, setErrEmail] = useState()
    const [errPass, setErrPass] = useState()
    const [errCpass, setErrCpass] = useState()
    const [isInvalid, setIsInvalid] = useState()

    //Validation
    useEffect(() => {
        if (errName || errContact || errEmail || errPass || errCpass || !name || !contact || !email || !pass || !cpass) {
            setIsInvalid(true)
        }
        else {
            setIsInvalid(false)
        }
    }, [errName, errContact, errEmail, errPass, errCpass, name, contact, email, pass, cpass])

    const districtList = ['Chamarajanagara', 'Chikkamagaluru', 'Dakshina Kannada', 'Hassan', 'Kodagu', 'Mandya', 'Mysuru', 'Udupi', 'Bengaluru Rural', 'Bengaluru Urban', 'Chikkaballapura', 'Chitradurga', 'Davanagere', 'Kolar', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Bagalkote', 'Belagavi', 'Dharwada', 'Gadaga', 'Haveri', 'Uttara Kannada', 'Vijayapura', 'Ballari', 'Bidar', 'Kalaburagi', 'Koppala', 'Raichuru', 'Vijayanagara', 'Yadagiri']

    const register = () => {
        const formdata = new FormData();
        formdata.append('name', name)
        formdata.append('district', district)
        formdata.append('contact', contact)
        formdata.append('email', email)
        formdata.append('pass', pass)
        if (user === 'Retailer') {
            Axios.post('http://localhost:8000/retailer/insert', formdata).then((response) => {
            });
            localStorage.setItem('userType', 'retailer');
            navigate('/retailer')
        }
        else {
            Axios.post('http://localhost:8000/farmer/insert', formdata).then((response) => {
            })
            localStorage.setItem('userType', 'farmer');
            navigate('/farmer')
            window.location.reload()
        }
    }


    return (
        <div className='container-fluid bg-light'>
            <div className="py-5 w-25 mx-auto">
                <div className='text-center'>
                    <h1>Create new account</h1>
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Register As</label>
                    <select value={user} onChange={(e) => setUser(e.target.value)} className="form-select" required>
                        <option value={'Retailer'}> Retailer </option>
                        <option value={'Farmer'}> Farmer </option>
                    </select>
                </div>


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
                        onBlur={() => (name === '') ? setErrName(`Please provide valid ${user} name.`) : setErrName('')}
                        className="form-control" maxLength='30' autoComplete="off" placeholder='Sam' required />
                    <span class="text-danger" aria-live="polite">{errName}</span>
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
                        onBlur={() => (contact === '') ? setErrContact(`Please provide valid ${user} contact no.`) : setErrContact('')}
                        className="form-control" maxLength='10' autoComplete="off" placeholder='7760506932' required />
                    <span class="text-danger" aria-live="polite">{errContact}</span>
                </div>

                <div className="form-group mb-2">
                    <label className="form-label">{user} Email</label>
                    <input type="text" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() =>
                            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email) ? setErrEmail('') : setErrEmail(`Please provide a valid ${user} email.`)
                        }
                        className="form-control" maxLength='20' autoComplete="off" placeholder='example@gmail.com' required />
                    <span class="text-danger" aria-live="polite">{errEmail}</span>
                </div>

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
                    <button onClick={() => register()} className="btn btn-secondary" disabled={isInvalid}> <i className="fa fa-user"></i>&nbsp;{user} Register </button>
                </div>
            </div>
        </div>
    )
}

export default Register

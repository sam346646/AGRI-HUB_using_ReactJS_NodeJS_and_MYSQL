import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register({setIsLogin}) {

    const navigate = useNavigate()

    const [user, setUser] = useState('Retailer')
    const [name, setName] = useState()
    const [area, setArea] = useState()
    const [village, setVillage] = useState()
    const [district, setDistrict] = useState('Dakshina Kannada')
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
    const [isInvalid, setIsInvalid] = useState()
    const [errRegister, setErrRegister] = useState()

    //Validation
    useEffect(() => {
        if (errName || errArea || errVillage || errContact || errEmail || errPass || errCpass || !name || !area || !village || !contact || !email || !pass || !cpass) {
            setIsInvalid(true)
        }
        else {
            setIsInvalid(false)
        }
    }, [errName, errArea, errVillage, errContact, errEmail, errPass, errCpass, name, area, village, contact, email, pass, cpass])

    const districtList = ['Chamarajanagara', 'Chikkamagaluru', 'Dakshina Kannada', 'Hassan', 'Kodagu', 'Mandya', 'Mysuru', 'Udupi', 'Bengaluru Rural', 'Bengaluru Urban', 'Chikkaballapura', 'Chitradurga', 'Davanagere', 'Kolar', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Bagalkote', 'Belagavi', 'Dharwada', 'Gadaga', 'Haveri', 'Uttara Kannada', 'Vijayapura', 'Ballari', 'Bidar', 'Kalaburagi', 'Koppala', 'Raichuru', 'Vijayanagara', 'Yadagiri']

    useEffect(() => {
        setTimeout(() => {
            setErrRegister('');
        }, 5000);
    }, [errRegister])

    const registerHandle = async() => {

        //Admin, Farmer, Retailer Regiser and Validation
        const response = await fetch('http://localhost:8000/user/insert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ name, area, village, district, contact, email, pass, user }),
        });
        const data = await response.json();
        if (data.success) {
            const tempUser = user.toLowerCase();
            localStorage.setItem('userType', tempUser);
            localStorage.setItem('usrId', data.usrId);
            navigate(`/${tempUser}`)
            window.location.reload();
        } 
        else if(data.userExists){
            setErrRegister("You've already registered with this email! Please Login using this email...")
            setIsInvalid(true)
        }
    }


    return (
        <div className='container-fluid bg-light'>
            <div className="py-5 w-25 mx-auto">
                <div className='text-center mb-4'>
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
                        onBlur={() => (contact === '' || contact.length!==10) ? setErrContact(`Please provide 10 digits ${user} contact no.`) : setErrContact('')}
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
                    <button onClick={()=>registerHandle()} className="btn btn-secondary" disabled={isInvalid}> <i className="fa fa-user"></i>&nbsp;{user} Register </button><br/>
                    <span className='text-danger'>{errRegister}</span>
                </div>

                <div className='text-center mt-2'>
                    <span className="lead">Already have account..?</span>
                    <button className="nav-link text-secondary mx-auto" onClick={() => setIsLogin(true)}><h4>Login here</h4></button>
                </div>
            </div>
        </div>
    )
}

export default Register

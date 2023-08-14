import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Register from './Register'

function Login() {

    const navigate = useNavigate()

    const [user, setUser] = useState('Retailer')
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()

    const [errEmail, setErrEmail] = useState()
    const [errPass, setErrPass] = useState()
    const [isLogin, setIsLogin] = useState(true)
    const [errLogin, setErrLogin] = useState('')
    const [isInvalid, setIsInvalid] = useState(true)

    const logInHandle = async () => {

        //Admin, Farmer, Retailer Login Validation
        const response = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ email, pass, user }),
        });
        const data = await response.json();
        if (data.success) {
            const tempUser = user.toLowerCase();
            localStorage.setItem('userType', tempUser);
            localStorage.setItem('usrId', data.usrId);
            navigate(`/${tempUser}`)
            window.location.reload();
        } else {
            setErrLogin('Email or Password is not correct!')
        }
    }

    //Form validation
    useEffect(() => {
        if (errEmail || errPass || !email || !pass) {
            setIsInvalid(true)
        }
        else {
            setIsInvalid(false)
        }
    }, [errEmail, errPass, email, pass])

    useEffect(() => {
        setTimeout(() => {
            setErrLogin('');
        }, 5000);
    }, [errLogin])



    return (
        // Login
        (isLogin) ?
            <div className='container-fluid bg-light vh-100'>
                <div className="py-5 w-25 mx-auto">
                    <div className='text-center'>
                        <h1>Login</h1>
                        <p className="lead"> Already have account..?</p>
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label">Login As</label>
                        <select name="categoryId" value={user} onChange={(e) => setUser(e.target.value)} className="form-select" required>
                            <option value={'Retailer'}> Retailer </option>
                            <option value={'Farmer'}> Farmer </option>
                            <option value={'Admin'}> Admin </option>
                        </select>
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
                            onBlur={() => (pass === '') ? setErrPass('Please enter password.') : setErrPass('')}
                            className="form-control" maxLength='20' autoComplete="off" required />
                        <span class="text-danger" aria-live="polite">{errPass}</span>
                    </div>

                    <div className="text-center">
                        <span className='text-danger'>{errLogin}</span><br/>
                        <button className="btn btn-secondary" onClick={() => logInHandle()} disabled={isInvalid}> <i className="fa fa-sign-in"></i>&nbsp;{user} Login </button>
                    </div>
                    <div className='text-center mt-2'>
                        <span className="lead">Don't have account..?</span>
                        <button className="nav-link text-secondary mx-auto" onClick={() => setIsLogin(false)}><h4>Register here</h4></button>
                    </div>
                </div>
            </div>
            :
            // Register
            <Register setIsLogin={setIsLogin}/>
    )
}

export default Login

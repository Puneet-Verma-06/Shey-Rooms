import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import axios from "axios"
import Loader from '../component/Loader';
import Error from '../component/Error';

function Loginscreen() {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    async function Login() {


        const user = {

            email,
            password,

        }
        try {
            setloading(true)
            const { data } = await axios.post('/api/users/login', user);
            setloading(false)

            localStorage.setItem('currentUser', JSON.stringify(data)); // current user details are stored her.
            window.location.href='/home'

        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(true)
        }
        
    }

    return (
        <div>
        {loading && <Loader></Loader>}
            <div className='d-flex justify-content-center flex-wrap gap-3  mt-5'>
                <div className='col-md-5 mt-5'>
                {error &&  <Error message = 'invalid credentials.'></Error>}
                    <div className='bs'>
                        <h2>Login</h2>
                        <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }}></input>
                        <input type='text' className='form-control' placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }}></input>
                        <button className='btn btn-primary mt-3' onClick={Login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginscreen
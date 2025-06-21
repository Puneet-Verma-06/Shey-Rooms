import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import axios from "axios"
import Loader from '../component/Loader';
import Error from '../component/Error';
import Success from '../component/Success';

function Registerscreen() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')

  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()
  const [success, setsuccess] = useState()

  async function register() {
    // if (password.length < 8) {
    //   return alert("password must be of 8characters.")
    // }
    if (password == confirmpassword) {
      const user = {
        name,
        email,
        password,
      }
      // console.log(user)

      try {
        setloading(true);
        const { data } = await axios.post('/api/users/register', user);
        setloading(false);
        setsuccess(true)

        setname('')
        setemail('')
        setpassword('')
        setconfirmpassword('')
        // console.log(data); // now it logs response correctly

      } catch (error) {
        console.log(error)
        setloading(false)
        seterror(true)
      }
    }
    else {
      alert("Password don't match.")
    }
  }

  return (
    <div>
      {loading && <Loader></Loader>}
      {error && <Error></Error>}
      
      <div className='d-flex justify-content-center flex-wrap gap-3  mt-5'>
        <div className='col-md-5 mt-5'>
          {success && <Success message={'Registered Successfully'}></Success>}
          <div className='bs'>
            <h2>Register</h2>
            <input type='text' className='form-control' placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }}></input>
            <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }}></input>
            <input type='password' className='form-control' placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }}></input>
            <input type='password' className='form-control' placeholder='confirm password' value={confirmpassword} onChange={(e) => { setconfirmpassword(e.target.value) }}></input>
            <button className='btn btn-primary mt-3' onClick={register}>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registerscreen
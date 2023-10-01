import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {

    let navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const{firstName, lastName, email, password} = user;

    const onIpnutChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    const onSubmitFun = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/v1/registration", user)
            .then(response => {
                navigate("/")
            })
            .catch(error => {
                alert(error.response.data)
            })
    };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Register User</h2>
                
                <form onSubmit={(e) => onSubmitFun(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Firstname' className='form-label'>
                            Fisrtname
                        </label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Enter your name'
                            name='firstName'
                            value={firstName}
                            onChange={(e) => onIpnutChange(e)}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='Lastname' className='form-label'>
                            Lastname
                        </label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Enter your lastname'
                            name='lastName'
                            value={lastName}
                            onChange={(e) => onIpnutChange(e)}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='Email' className='form-label'>
                            E-mail
                        </label>
                        <input 
                            type='email'
                            className='form-control'
                            placeholder='Enter your e-mail address'
                            name='email'
                            value={email}
                            onChange={(e) => onIpnutChange(e)}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='Password' className='form-label'>
                            Password
                        </label>
                        <input 
                            type='password'
                            className='form-control'
                            placeholder='Enter your password'
                            name='password'
                            value={password}
                            onChange={(e) => onIpnutChange(e)}
                            required
                        />
                    </div>
                

                <button type='submit' className='btn btn-outline-primary'>Submit</button>
                <Link type='submit' className='btn btn-outline-danger mx-2' to={"/"}>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

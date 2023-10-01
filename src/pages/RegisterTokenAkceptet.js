import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function RegisterTokenAkceptet() {

    const [message, setMessage] = useState(null);

    const {registryToken} = useParams();


    const activeUser = async (token) => {
        axios.get(`http://localhost:8080/register-token/${token}`)
            .then(response => {
                setMessage(response.data)
            })
            .catch(error => {
                setMessage('Błąd z serwera: ' + error.message);
            });
    }

    useEffect(() => {
        activeUser(registryToken);
    },[])

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Registry token</h2>

                <div className='card'>
                    <div className='card-header'>
                        {/* TUTAJ WYSWETLIC KOMUNIKAT */}
                        {message && <div>{message}</div>}
                    </div>
                </div>

                <Link className='btn btn-outline-danger my-2' to={"/"}>Login</Link>
            </div>
        </div>
    </div> 
  )
}

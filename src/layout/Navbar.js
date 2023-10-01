import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <b>Bookmaker</b>
                </a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className='d-flex'>
                    <Link className='btn btn-light me-5' to='/login'>Login</Link>
                    <Link className='btn btn-outline-light me-5' to='/register'>Register</Link>
                    <Link className='btn btn-outline-light me-5' to='/add-new-season'>Add season</Link>
                </div>
            </div>
        </nav>
    </div>
  )
}

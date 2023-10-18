import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function AddNewSeason() {

  let navigate = useNavigate();

  const [season, setSeason] = useState({
    name: "",
    startDate: null,
    endDate: null,
  });

  const{name, startDate, endDate} = season;

  const onIpnutChange = (e) => {
    setSeason({...season, [e.target.name] : e.target.value})
  }

  const onSubmitFun = async (e) => {

    const currentDate = new Date();

    if(season.startDate > season.endDate) {
      alert("Wrong end date")
      return;
    } else if (currentDate > season.endDate) {
      alert("End season date can not be before than today")
      return;
    }

    e.preventDefault();
    await axios.post("http://localhost:8080/api/v1/save-new-season", season)
        .then(response => {
            alert(response.data)
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
                <h2 className='text-center m-4'>Add new season</h2>
                
                <form onSubmit={(e) => onSubmitFun(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Season name
                        </label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Enter season name'
                            name='name'
                            value={name}
                            onChange={(e) => onIpnutChange(e)}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='startDate' className='form-label'>
                            Start date
                        </label>
                        <input 
                            type='date'
                            className='form-control'
                            placeholder='Enter season start date'
                            name='startDate'
                            value={startDate}
                            onChange={(e) => onIpnutChange(e)}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='endDate' className='form-label'>
                            End date
                        </label>
                        <input 
                            type='date'
                            className='form-control'
                            placeholder='Enter your e-mail address'
                            name='endDate'
                            value={endDate}
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

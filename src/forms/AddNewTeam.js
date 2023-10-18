import axios from 'axios';
import React, {  useState } from 'react'
import { Link,  } from 'react-router-dom'


export default function AddNewTeam() {


  const [team, setTeam] = useState({
    name: "",
    country: ""
  });

  const onIpnutChange = (e) => {
    setTeam({...team, [e.target.name] : e.target.value})
  }

  const clearForm = () => {
    setTeam({ name: '', country: '' });
  }

  const onSubmitFunction = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8080/api/v1/save-new-team`, team)
        .then(response => {
            console.log(response.data)
            alert("Team added correctly")
            clearForm();
        })
        .catch(error => {
            alert(error.response.data)
        })
  };




  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add new team</h2>
                
                {/* <form onSubmit={(e) => onSubmitFun(e)}> */}
                <form onSubmit={(e) => onSubmitFunction(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Team name
                        </label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Enter team name'
                            name='name'
                            value={team.name}
                            onChange={(e) => onIpnutChange(e)}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='Country' className='form-label'>
                            Country
                        </label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Enter country'
                            name='country'
                            value={team.country}
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

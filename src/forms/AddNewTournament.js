import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function AddNewTournament() {

  let navigate = useNavigate();

  const [tournament, setTournament] = useState({
    name: ""
  });

  const [season, setSeason] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');


  const onIpnutChange = (e) => {
    const newName = e.target.value;
    setTournament({ ...tournament, name: newName });
  }

  const onSelectChange = (e) => {
    const selectedValue = e.target.value; 
    const selectedObject = season.find((option) => option.name === selectedValue); 

    setSelectedSeason(selectedObject);
  }

  const onSubmitFunction = async (e) => {
    
    e.preventDefault();
    await axios.post(`http://localhost:8080/api/v1/save-new-tournament/${selectedSeason.id}`, tournament)
        .then(response => {
            alert(response.data)
            navigate("/settings")
        })
        .catch(error => {
            alert(error.response.data)
        })
  };

    useEffect(() => {
        loadActiveSeasons();
    }, []);

  const loadActiveSeasons = async() => {
    const resault = await axios.get("http://localhost:8080/api/v1/get-active-seasons")
    setSeason(resault.data);
}



  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add new tournament</h2>
                
                {/* <form onSubmit={(e) => onSubmitFun(e)}> */}
                <form onSubmit={(e) => onSubmitFunction(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Tournament name
                        </label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Enter season name'
                            name='name'
                            value={tournament.name}
                            onChange={(e) => onIpnutChange(e)}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='endDate' className='form-label'>
                            Season
                        </label>
                        <select className='form-control' 
                            placeholder='Choose season' 
                            name='season'
                            onChange={(e) => onSelectChange(e)}
                            required
                        >
                            <option selected>Choose season</option>
                            {
                                season.map((option) => (
                                    <option key={option.id} value={option.value} >
                                        {option.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                
                <button type='submit' className='btn btn-outline-primary'>Submit</button>
                <Link type='submit' className='btn btn-outline-danger mx-2' to={"/"}>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

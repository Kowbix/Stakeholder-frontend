import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  Link, useNavigate, useParams } from 'react-router-dom'


export default function UpdateMatch() {
    const { matchId } = useParams();
    const [match, setMatch] = useState(null);
    const [updatedMatch, setUpdatedMatch] = useState({
        date: '',
        time: ''
    });
    let navigate = useNavigate();
  
    const loadMatchById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/get-match/${matchId}`);
        setMatch(response.data);
        updatedMatch.date = response.data.date
        updatedMatch.time = response.data.time
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    useEffect(() => {
      loadMatchById();
    }, [matchId]); 


    const onInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMatch({...updatedMatch, [name]: value,});
    };

    const onSubmitFunction = async(e) => {
        e.preventDefault();

        await axios.put(`http://localhost:8080/api/v1/update-match/${match.id}`, updatedMatch)
        .then(() => {
            alert("Match updated correctly")
            navigate(`/config-tournament/${match.tournament.id}`)
        })
        .catch(error => {
          alert("Error")
        })
      };
    
  
    if (!match) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>Update</h2>
            <h2 className='text-center m-4'>{match.homeTeam.name} vs. {match.awayTeam.name}</h2>
          

          <form onSubmit={onSubmitFunction}>
            <div className='mb-3'>
                <label htmlFor='date' className='form-label'>
                Match date
                </label>
                <input
                    type='date'
                    className='form-control'
                    placeholder='Enter match date'
                    name='date'
                    value={updatedMatch.date}
                    onChange={onInputChange}
                    required/>
            </div>

            <div className='mb-3'>
                <label htmlFor='time' className='form-label'>
                Match time
                </label>
                <input
                type='time'
                className='form-control'
                placeholder='Enter match date'
                name='time'
                value={updatedMatch.time}
                onChange={onInputChange}
                required
                />
            </div>

            <button type='submit' className='btn btn-outline-primary'>Submit</button>
          </form>
          </div>
        </div>
      </div>
    )
}

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddNewMatch(tournamentId) {

    const [match, setMatch] = useState({
        date: null,
        time: null,
        homeTeamId: null,
        awayTeamId: null
    });

    const [team, setTeam] = useState([]);

    const onInputChange = (e) => {
      setMatch({...match, [e.target.name] : e.target.value})
    }

    const loadTeams = async() => {
      const resault = await axios.get("http://localhost:8080/api/v1/get-team-list")
      setTeam(resault.data);
    }

    const onSelectChangeHomeTeam = (e) => {
      const selectedValue = e.target.value;

      setMatch((prevMatch) => ({
        ...prevMatch,
        homeTeamId: selectedValue
      }))
  
    }


    const onSelectChangeAwayTeam = (e) => {
      const selectedValue = e.target.value;
  
      setMatch((prevMatch) => ({
        ...prevMatch,
        awayTeamId: selectedValue
      }))
    }


    useEffect(() => {
      loadTeams();
    }, [])

    const onSubmitFunction = async (e) => {
      e.preventDefault();

      await axios.post(`http://localhost:8080/api/v1/save-new-match/${tournamentId.parametr}`, match)
        .then(response => {
          alert('Match added correctly')
          window.location.reload();
        })
        .catch(error => {
          alert("Error")
        })
      
    };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Add match to</h2>

          <form onSubmit={(e) => onSubmitFunction(e)}>
            <div className='mb-3'>
                <label htmlFor='date' className='form-label'>
                    Match date
                </label>
                <input 
                    type='date'
                    className='form-control'
                    placeholder='Enter match date'
                    name='date'
                    value={match.date}
                    onChange={(e) => onInputChange(e)}
                    required
                />
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
                    value={match.time}
                    onChange={(e) => onInputChange(e)}
                    required
                />
            </div>

            <div className='mb-3'>
                <label htmlFor='homeTeamId' className='form-label'>
                    Home team
                </label>
                <select className='form-control' 
                    placeholder='Choose home team' 
                    name='homeTeamId'
                    onChange={(e) => onSelectChangeHomeTeam(e)}
                    required
                >
                    <option selected>Choose home team</option>
                    {
                        team.map((option) => (
                            <option key={option.id} value={option.id} >
                                {option.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className='mb-3'>
                <label htmlFor='awayTeamId' className='form-label'>
                    Away team
                </label>
                <select className='form-control' 
                    placeholder='Choose home team' 
                    name='awayTeamId'
                    onChange={(e) => onSelectChangeAwayTeam(e)}
                    required
                >
                    <option selected>Choose away team</option>
                    {
                        team.map((option) => (
                            <option key={option.id} value={option.id} >
                                {option.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <button type='submit' className='btn btn-outline-primary'>Submit</button>
          </form>

        </div>
      </div>
    </div>
  )
}

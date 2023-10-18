import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

export default function SetResult() {

    let navigate = useNavigate();

    const {matchId} = useParams();
    const [match, setMatch] = useState(null);
    const [result, SetResult] = useState({
        homeTeamGoals: 0,
        awayTeamGoals: 0
      });

    const loadMatchById = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/get-match/${matchId}`);
          setMatch(response.data);

        } catch (error) {
            navigate("/")
        }
    }

    const onInputChange = (e) => {
        const { name, value } = e.target;
        SetResult({...result, [name]: value,});
    };

    useEffect(() => {
        loadMatchById();
    }, [])

    const onSubmitFunction = async(e) => {
        e.preventDefault();

        
        await axios.post(`http://localhost:8080/api/v1/save-result/${match.id}`, result)
            .then(() => {
                alert("Result added correctly")
                navigate(`/`)
            })
            .catch(error => {
                alert("Error")
            })
    };


    if (!match) {
        return <p>Loading...</p>;
    }

    if(match.result != null) {
        navigate("/")
    }

    return (
        <div className='container'>
            <div className='row'>
              <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Set result</h2>
                <h2 className='text-center m-4'>{match.homeTeam.name} vs. {match.awayTeam.name}</h2>
              
    
              <form onSubmit={onSubmitFunction}>
                <div className='mb-3'>
                    <label htmlFor='homeTeamGoals' className='form-label'>
                        {match.homeTeam.name} goals
                    </label>
                    <input
                        type='number'
                        className='form-control'
                        placeholder='Enter home team goals'
                        name='homeTeamGoals'
                        value={result.homeTeamGoals}
                        onChange={onInputChange}
                        required/>
                </div>
    
                <div className='mb-3'>
                    <label htmlFor='awayTeamGoals' className='form-label'>
                        {match.awayTeam.name} goals
                    </label>
                    <input
                    type='number'
                    className='form-control'
                    placeholder='Enter away team goals'
                    name='awayTeamGoals'
                    value={result.awayTeamGoals}
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

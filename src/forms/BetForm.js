import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

export default function BetForm() {

    let navigate = useNavigate();

    const {matchId} = useParams();
    const [match, setMatch] = useState(null);
    const [users, setUsers] = useState();

    const [bet, setBet] = useState({
        homeTeamGoals: 0,
        awayTeamGoals: 0,
        userId: null
      });


    const loadMatchById = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/get-match/${matchId}`);
          setMatch(response.data);

        } catch (error) {
            navigate("/")
        }
    }

    const loadUsersWithoutBetByMatchId = async () =>{
        try{
            const response = await axios.get(`http://localhost:8080/api/v1/get-user-without-bet/${matchId}`);
            setUsers(response.data);
            
        }catch (error) {
            alert("All users seted bet")
            navigate("/")
            
        }
    }

    const onSelectChange = (e) => {
        const selectedValue = e.target.value; 
        bet.userId = parseInt(selectedValue, 10);
        
      }

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setBet({...bet, [name]: value,});
    };

    useEffect(() => {
        loadUsersWithoutBetByMatchId();
        loadMatchById();
    }, [])

    const onSubmitFunction = async(e) => {
        e.preventDefault();
        

        if(typeof bet.userId != 'number'){
            alert("select user")
            return
        }
        
        await axios.post(`http://localhost:8080/api/v1/save-new-bet/${match.id}`, bet)
            .then(() => {
                alert("Bet added correctly")
                navigate(`/`)
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
            <h2 className='text-center m-4'>BET</h2>
            <h2 className='text-center m-4'>{match.homeTeam.name} vs. {match.awayTeam.name}</h2>
          

          <form onSubmit={onSubmitFunction}>
            <div className='mb-3'>
                <label htmlFor='homeTeamGoals' className='form-label'>
                    Home team gols
                </label>
                <input
                    type='number'
                    className='form-control'
                    placeholder='Enter home team goals'
                    name='homeTeamGoals'
                    value={bet.homeTeamGoals}
                    onChange={onInputChange}
                    required/>
            </div>

            <div className='mb-3'>
                <label htmlFor='awayTeamGoals' className='form-label'>
                    Away team gols
                </label>
                <input
                type='number'
                className='form-control'
                placeholder='Enter away team goals'
                name='awayTeamGoals'
                value={bet.awayTeamGoals}
                onChange={onInputChange}
                required
                />
            </div>

            <div className='mb-3'>
                        <label htmlFor='user' className='form-label'>
                            Select user
                        </label>
                        <select className='form-control' 
                            placeholder='Select user' 
                            name='user'
                            onChange={(e) => onSelectChange(e)}
                            required
                        >
                            <option selected>Select user</option>
                            {
                                users.map((user) => (
                                    <option key={user.id} value={user.id} >
                                        {user.firstName} {user.lastName} 
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

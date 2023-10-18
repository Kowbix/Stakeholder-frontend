import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,  } from 'react-router-dom'

export default function MatchesToBet() {
  
    const [match, setMatch] = useState([]);

    const loadActiveMatches = async () => {
        const resault = await axios.get(`http://localhost:8080/api/v1/get-list-active-matches`)
        
        setMatch(resault.data);
    }


    useEffect(() => {
        loadActiveMatches()
    }, [])

    const renderTournamentsTable = () => {
        return match.map((item, index) => (
            <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.homeTeam.name}</td>
                <td>{item.awayTeam.name}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>
                  <Link type="button" className='btn btn-info' to={`/set-bet/${item.id}`}>BET</Link>
                </td>

            </tr>
        ));
    };

    if(!match){
        return "";
    }

  return (
    <div className='container'>
        <div className=' p-4 mt-4 shadow'>
            <h2 className='text-center m-2 mb-5'><b>MATCHES TO BET</b></h2>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Home team</th>
                    <th scope="col">Away Team</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    {renderTournamentsTable()}
                </tbody>
            </table>
        </div>
    </div>
  )
}

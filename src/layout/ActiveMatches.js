import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,  } from 'react-router-dom'
import MatchService from '../service/MatchService';

export default function ActiveMatches(tournamentId) {

    const [match, setMatch] = useState([]);

    const loadActiveMatches = async () => {
        const resault = await axios.get(`http://localhost:8080/api/v1/get-active-matches/${tournamentId.parametr}`)
        
        setMatch(resault.data);
    }

    const deleteMatch = (id) => {
      MatchService.deleteMatchById(id).then(resault => {
        alert(resault.data);
        deleteMatchFromList(id);
        // loadActiveMatches()
      })
    }

    const deleteMatchFromList = (id) => {
      const updatedMatch = match.filter(item => item.id !== id);

      setMatch(updatedMatch);
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
                  <Link type="button" className='btn btn-info' to={`/update-match/${item.id}`}>UPDATE</Link>
                </td>
                <td>
                  <button type="button" className='btn btn-danger' onClick={ () => deleteMatch(item.id)}>DELETE</button>
                </td>
            </tr>
        ));
    };

  return (
    <div className='container'>
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
  )
}

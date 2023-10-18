import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { Link,  } from 'react-router-dom'

export default function TournamentList() {

  const [tournament, setTournament] = useState([]);

  const loadActiveTournaments = async() => {
    const resault = await axios.get("http://localhost:8080/api/v1/get-active-tournaments")
    setTournament(resault.data);
    
  }

  useEffect(() => {
    loadActiveTournaments();
  }, [])

  const renderTournamentsTable = () => {
    return tournament.map((item, index) => (
      <tr key={item.id}>
        <th scope="row">{index + 1}</th>
        <td>{item.name}</td>
        <td>{item.season.name}</td>
        <td>
          <Link type="button" className='btn btn-secondary' to={`/config-tournament/${item.id}`}>CONFIG</Link>
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
            <th scope="col">Tournament</th>
            <th scope="col">Season</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {renderTournamentsTable()}
        </tbody>
      </table>
    </div>
  )
}


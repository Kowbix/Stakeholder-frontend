import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddNewMatch from '../forms/AddNewMatch';
import ActiveMatches from '../layout/ActiveMatches';
import OutOfDateMatches from '../layout/OutOfDateMatches';
import MatchWithoutResult from '../layout/MatchWithoutResult';


export default function TournamentConfig() {

    const {tournamentId} = useParams();

    const sectionData = [
        { title: 'Add Match', content: <AddNewMatch parametr={tournamentId}/> },
        { title: 'Active Matches', content: <ActiveMatches parametr={tournamentId}/> },
        { title: 'Out of date Matches', content: <OutOfDateMatches parametr={tournamentId}/> },
        // { title: 'Matches without result and points', content: <MatchWithoutResult parametr={tournamentId}/> },
    ];

    const [activeSection, setActiveSection] = useState(null);
    
    const [tournament, setTournament] = useState([]);

    const [season, setSeason] = useState([]);
    
    const toggleSection = (index) => {
        setActiveSection(activeSection === index ? null : index);
    };

    const loadTournament = async() => {
        const resault = await axios.get(`http://localhost:8080/api/v1/get-tournament-by-id/${tournamentId}`)
        setTournament(resault.data)
        setSeason(resault.data.season)
    }

    useEffect(() => {
        loadTournament();
    }, [])

  return (
    <div style={{ paddingLeft: '20%', paddingRight: '20%' }}>
        <div>
            <h2 className='text-center m-4'>{tournament.name} {season.name}</h2>
        </div>
            <div className="list-group mx-5 mt-5" >
            {sectionData.map((section, index) => (
                <div key={index} className='list-group-item'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p><b>{section.title}</b></p>
                    <button
                    className={activeSection === index ? 'btn btn-danger' : 'btn btn-primary'}
                    type="button"
                    onClick={() => toggleSection(index)}
                    >
                    {activeSection === index ? 'Collapse' : 'Expand'}
                    </button>
                </div>
                {activeSection === index && section.content}
                </div>
            ))}
            </div>

        </div>
  )
}

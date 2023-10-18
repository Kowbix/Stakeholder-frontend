import React, { useState } from 'react'
import AddNewSeason from '../forms/AddNewSeason';
import AddNewTournament from '../forms/AddNewTournament';
import AddNewTeam from '../forms/AddNewTeam';
import TournamentList from '../layout/TournamentList';

export default function Settings() {
    const sectionData = [
        { title: 'Add Season', content: <AddNewSeason /> },
        { title: 'Add Tournament', content: <AddNewTournament /> },
        { title: 'Add Team', content: <AddNewTeam /> },
        { title: 'Toutnaments List', content: <TournamentList/> },
      ];
    
      const [activeSection, setActiveSection] = useState(null);
    
      const toggleSection = (index) => {
        setActiveSection(activeSection === index ? null : index);
      };
    
      return (
        <div style={{ paddingLeft: '20%', paddingRight: '20%' }}>
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
      );
    }
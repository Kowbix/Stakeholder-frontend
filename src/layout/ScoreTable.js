import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ScoreTable() {

    const[table, setTable] = useState(null);

    const loadDataToTable = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/get-users-points`);
          setTable(response.data);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadDataToTable();
    }, [])


    

    if(!table) {
        return <p>Loading...</p>;
    }

    const renderPointTable = () => {
        
        return table.map((item, index) => (
            <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.firstName} {item.lastName}</td>
                <td>{item.points}</td>
            </tr>
        ));

    };

  return (
    <div className='container mt-5'>
        <div className='col-md-8 offset-md-2 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-2 mb-5'><b>Score table</b></h2>

            <table class="table table-bordered table-responsive">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {renderPointTable()}
                </tbody>
            </table>
        </div>
    </div>
  )
}

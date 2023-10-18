import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Register from './forms/Register';
import RegisterTokenAkceptet from './pages/RegisterTokenAkceptet';
import AddNewSeason from './forms/AddNewSeason';
import AddNewTournament from './forms/AddNewTournament';
import Settings from './pages/Settings';
import TournamentConfig from './pages/TournamentConfig';
import UpdateMatch from './forms/UpdateMatch';
import BetForm from './forms/BetForm';
import SetResult from './forms/SetResult';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
    
        <Routes>
          <Route exact path='/'element={<Home/>}/>
          <Route exact path='/register'element={<Register/>}/>
          <Route exact path='/registry-token-accepted/:registryToken' element={<RegisterTokenAkceptet/>}/>
          <Route exact path='/settings' element={<Settings/>}/>
          <Route exact path='/config-tournament/:tournamentId' element={<TournamentConfig/>}/>
          <Route exact path='/update-match/:matchId' element={<UpdateMatch/>}/>
          <Route exact path='/set-bet/:matchId' element={<BetForm/>}/>
          <Route exact path='/set-result/:matchId' element={<SetResult/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

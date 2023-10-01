import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Register from './forms/Register';
import RegisterTokenAkceptet from './pages/RegisterTokenAkceptet';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
    
        <Routes>
          <Route exact path='/'element={<Home/>}/>
          <Route exact path='/register'element={<Register/>}/>
          <Route exact path='/registry-token-accepted/:registryToken' element={<RegisterTokenAkceptet/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

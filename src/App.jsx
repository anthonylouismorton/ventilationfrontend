import Main from './components/Main';
import NavBar from './NavBar/NavBar';
import { useState, useEffect, useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

function App() {
  const { user, isAuthenticated} = useAuth0();
  const [technicians, setTechnicians] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState({unitId: ''});

  return (
    <>
    <NavBar setSelectedUnit={setSelectedUnit} setTechnicians={setTechnicians}/>
    <Main technicians={technicians} selectedUnit={selectedUnit}/>
    </>
  );
}
    
export default App;
    
import { useState, useEffect } from 'react';
// import AddVentSurvey from './Surveys/AddVentSurvey';
import Technician from './Technician/Technician';
import Vents from './Vents/Vents';
import Units from './Units/Units';
import Surveys from './Surveys/Surveys';
import Equipment from './Equipment/Equipment';
import Login from './Logging/Login';
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Main(props) {
  const [open, setOpen] = useState({'addUnitModal': false, 'addTechnician': false});
  const [units, setUnits] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedVent, setSelectedVent] = useState({ventSurvey: {ventId: ''}});
  const [equipment, setEquipment] = useState([]);
  const [selectedVentSurvey, setSelectedVentSurvey] = useState({ventSurvey: {ventSurveyId: ''}});
  const [selectedUnit, setSelectedUnit] = useState({unitId: ''});
  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  const getEquipment = async () => {
    let equipmentList = await axios.get(
      `${process.env.REACT_APP_DATABASE}/equipment`)
      setEquipment(equipmentList.data)
  }
  
  useEffect(() => {
    console.log(location.pathname)
    if(isAuthenticated && location.pathname === '/'){
      return navigate('/Vents')
    }
    getEquipment();
    console.log(location.pathname)
  },[isAuthenticated])
  
  return (
    <Routes>
        <Route
          path='/'
          element={<Login/>}
        />
        <Route
          path='/Technicians/*'
          element={!isAuthenticated ? <Login/> : <Technician technicians={technicians} setTechnicians={setTechnicians} selectedTech={selectedTech} setSelectedTech={setSelectedTech}/>}
        />
        <Route
          path='/Units/*'
          element={!isAuthenticated ? <Login/> : <Units units={units} setUnits={setUnits} selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit} selectedVent={selectedVent} setSelectedVent={setSelectedVent} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey}/>}
        />
        <Route
          path='/Equipment/*'
          element={!isAuthenticated ? <Login/> : <Equipment setEquipment={setEquipment} equipment={equipment} selectedEquipment={selectedEquipment} setSelectedEquipment={setSelectedEquipment}/>}
        />
        <Route
          path='/Surveys/*'
          element={!isAuthenticated ? <Login/> : <Surveys selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} equipment={equipment} setEquipment={setEquipment} technicians={props.technicians} setTechnicians={setTechnicians}/>}
        />
        <Route
          path='/Vents/*'
          element={!isAuthenticated ? <Login/> : <Vents technicians={technicians} setTechnicians={setTechnicians} setSelectedVent={setSelectedVent} selectedUnit={selectedUnit} selectedVent={selectedVent} units={units} setUnits={setUnits} open={open} setOpen={setOpen} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} equipment={equipment} setEquipment={setEquipment}/>}
        />
      </Routes>
  );
}
    
export default Main;
    
import { useState, useEffect } from 'react';
import './App.css';
import AddTechnicianForm from './components/Technicians/AddTechnicianForm';
import AddUnitModalForm from './components/Units/AddUnitModalForm';
import AddVentForm from './components/Vents/AddVentForm';
import AddVentSurvey from './components/Surveys/AddVentSurvey';
import VentList from './components/Vents/VentList';
import VentInfo from './components/Vents/VentInfo';
import NavBar from './components/NavBar';
import EquipmentList from './components/Equipment/EquipmentList';
import AddEquipmentForm from './components/Equipment/AddEquipmentForm';
import AllVentSurveysList from './components/Surveys/AllVentSurveysList';
import TechnicianList from './components/Technicians/TechnicianList';
import VentSurveyList from './components/Vents/VentSurveyList';
import AssignSurveyForm from './components/Surveys/AssignSurveyForm';
import CompleteVentSurvey from './components/Surveys/CompleteVentSurvey';
import UnitList from './components/Units/UnitList';
import AddUnitForm from './components/Units/AddUnitForm';
import UnitInfo from './components/Units/UnitInfo';
import UnitVentList from './components/Units/UnitVentList';
import ReviewSurveyForm from './components/Surveys/ReviewSurveyForm';
import TechInfo from './components/Technicians/TechInfo';
import EquipmentInfo from './components/Equipment/EquipmentInfo';
import Login from './components/Login';
import axios from 'axios'
import Main from './components/Main';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated} = useAuth0();

  return (
    <div className="App">
      {!isAuthenticated ?
      <Login/>
      :
      <Main/>
      }
    </div>
  );
    }
    
    export default App;
    
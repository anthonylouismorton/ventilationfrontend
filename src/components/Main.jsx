import { useState, useEffect } from 'react';
// import AddVentSurvey from './Surveys/AddVentSurvey';
import Technician from './Technician/Technician';
import Vents from './Vents/Vents';
import VentList from './Vents/VentList';
import Units from './Units/Units';
import Surveys from './Surveys/Surveys';
import Equipment from './Equipment/Equipment';
import Login from './Login';
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, useNavigate } from 'react-router-dom';

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
  useEffect(() => {
    if(isAuthenticated){
      return navigate('/Vents')
    }
  },[isAuthenticated ])

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
          element={!isAuthenticated ? <Login/> : <Units units={units} setUnits={setUnits} selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit} selectedVent={selectedVent} setSelectedVent={setSelectedVent} equipment={equipment} setEquipment={setEquipment}/>}
        />
        <Route
          path='/Equipment/*'
          element={!isAuthenticated ? <Login/> : <Equipment setEquipment={setEquipment} equipment={equipment} selectedEquipment={selectedEquipment} setSelectedEquipment={setSelectedEquipment}/>}
        />
        <Route
          path='/Surveys/*'
          element={!isAuthenticated ? <Login/> : <Surveys selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} setShow={props.setShow} show={props.show} equipment={equipment} setEquipment={setEquipment} technicians={props.technicians} setTechnicians={setTechnicians}/>}
        />
        <Route
          path='/Vents/*'
          element={!isAuthenticated ? <Login/> : <Vents setShow={props.setShow} show={props.show} technicians={technicians} setTechnicians={setTechnicians} setSelectedVent={setSelectedVent} selectedUnit={selectedUnit} selectedVent={selectedVent} units={units} setUnits={setUnits} open={open} setOpen={setOpen}/>}
        />
      </Routes>
      // {/* {props.show.addUnit &&
      // <AddUnitForm setShow={props.setShow} show={props.show} units={units} setUnits={setUnits}/>
      // }
      // {props.show.unitList &&
      // <UnitList setShow={props.setShow} show={props.show} units={units} setUnits={setUnits} selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit}/>
      // }
      // {props.show.unitInfo &&
      // <>
      // <UnitInfo setShow={props.setShow} show={props.show} units={units} setUnits={setUnits} selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit}/>
      // <UnitVentList setShow={props.setShow} show={props.show} technicians={technicians} setTechnicians={setTechnicians} setSelectedVent={setSelectedVent} selectedUnit={selectedUnit}/>
      // </>
      // }
      // {props.show.ventList &&
      // <VentList setShow={props.setShow} show={props.show} technicians={technicians} setTechnicians={setTechnicians} setSelectedVent={setSelectedVent} selectedUnit={selectedUnit}/>
      // }
      // {/* {props.show.addVentSurvey &&
      // <AddVentSurvey selectedVent={selectedVent} show={props.show} setShow={props.setShow} equipment={equipment} setEquipment={setEquipment}/>
      // } */}
      // <AddUnitModalForm open={open} setOpen={setOpen} units={units} setUnits={setUnits}/>
      // {props.show.addVent &&
      // <AddVentForm setShow={props.setShow} show={props.show} open={open} setOpen={setOpen} units={units} setUnits={setUnits} selectedUnit={selectedUnit}/>
      // }
      // {props.show.ventInfo &&
      // <>
      // <VentInfo selectedVent={selectedVent} setSelectedVent={setSelectedVent} technicians={technicians} show={props.show} setShow={props.setShow}/>
      // <VentSurveyList selectedVent={selectedVent} setShow={props.setShow} show={props.show} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} equipment={equipment} setEquipment={setEquipment} userProfile={props.userProfile}/>
      // </>
      // }
      // {props.show.ventSurveyList &&
      // <AllVentSurveysList selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} setShow={props.setShow} show={props.show} equipment={equipment} setEquipment={setEquipment}/>
      // }
      // {props.show.assignSurvey &&
      // <AssignSurveyForm setTechnicians={setTechnicians} technicians={props.technicians} setShow={props.setShow} show={props.show} selectedVent={selectedVent} setSelectedVent={setSelectedVent}/>
      // }
      // {props.show.reviewSurvey &&
      // <ReviewSurveyForm setTechnicians={setTechnicians} technicians={props.technicians} setShow={props.setShow} show={props.show} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} equipment={equipment} setEquipment={setEquipment}/>
      // }
      //  */}
  );
}
    
export default Main;
    
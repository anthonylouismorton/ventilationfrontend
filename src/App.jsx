import { useState } from 'react';
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
import VentSurveyList from './components/Surveys/VentSurveyList';
import TechnicianList from './components/Technicians/TechnicianList';
import UnitVentSurveyList from './components/Units/UnitVentSurveyList';
import AssignSurveyForm from './components/Surveys/AssignSurveyForm';
import CompleteSurveyForm from './components/Surveys/CompleteVentSurvey';
import UnitList from './components/Units/UnitList';
import AddUnitForm from './components/Units/AddUnitForm';
import UnitInfo from './components/Units/UnitInfo';

function App() {
  const defaultShow = {'ventList': false, 'addTechnician': false, 'addVent': false, 'addVentSurvey': false, 'addUnit': false, 'ventInfo': false, 'equipment': false, 'addEquipment': false, 'technicianList': false, 'ventSurveyList': false, 'assignSurvey': false, 'completeSurvey': false, unitList: false, unitInfo: false };
  const [show, setShow] = useState({'ventList': true, 'addTechnician': false, 'addVent': false, 'addVentSurvey': false, 'addUnit': false, 'ventInfo': false, 'equipment': false, 'addEquipment': false, 'technicianList': false, 'ventSurveyList': false, 'assignSurvey': false, 'completeSurvey': false, unitList: false, unitInfo: false });
  const [open, setOpen] = useState({'addUnitModal': false, 'addTechnician': false});
  const [units, setUnits] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedVent, setSelectedVent] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [selectedVentSurvey, setSelectedVentSurvey] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState({unitId: ''});
  console.log(selectedUnit)
  return (
    <div className="App">
      <NavBar setShow={setShow} show={show} defaultShow={defaultShow} setSelectedUnit={setSelectedUnit}/>
      {show.addUnit &&
      <AddUnitForm setShow={setShow} show={show} units={units} setUnits={setUnits}/>
      }
      {show.unitList &&
      <UnitList setShow={setShow} show={show} units={units} setUnits={setUnits} selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit}/>
      }
      {show.unitInfo &&
      <>
      <UnitInfo setShow={setShow} show={show} units={units} setUnits={setUnits} selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit}/>
      <VentList setShow={setShow} show={show} technicians={technicians} setTechnicians={setTechnicians} setSelectedVent={setSelectedVent} selectedUnit={selectedUnit}/>
      </>
      }
      {show.ventList && !show.unitInfo &&
      <VentList setShow={setShow} show={show} technicians={technicians} setTechnicians={setTechnicians} setSelectedVent={setSelectedVent} selectedUnit={selectedUnit}
      />
      }
      {show.addTechnician &&
      <AddTechnicianForm setShow={setShow} show={show} technicians={technicians} setTechnicians={setTechnicians}/>
      }
      {show.technicianList &&
      <TechnicianList setShow={setShow} show={show} technicians={technicians}/>
      }
      {show.addVentSurvey &&
      <AddVentSurvey selectedVent={selectedVent} show={show} setShow={setShow} equipment={equipment} setEquipment={setEquipment}/>
      }
      <AddUnitModalForm open={open} setOpen={setOpen} units={units} setUnits={setUnits}/>
      {show.addVent &&
      <AddVentForm setShow={setShow} show={show} open={open} setOpen={setOpen} units={units} setUnits={setUnits}/>
      }
      {show.ventInfo &&
      <>
      <VentInfo selectedVent={selectedVent} setSelectedVent={setSelectedVent} technicians={technicians} show={show} setShow={setShow}/>
      <UnitVentSurveyList selectedVent={selectedVent} show={show} setShow={setShow}/>
      </>
      }
      {show.ventSurveyList &&
      <VentSurveyList selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} setShow={setShow} show={show}/>
      }
      {show.addEquipment &&
      <AddEquipmentForm setEquipment={setEquipment} equipment={equipment} setShow={setShow} show={show}/>
      }
      {show.equipment &&
      <EquipmentList setShow={setShow} show={show}/>
      }
      {show.assignSurvey &&
      <AssignSurveyForm setTechnicians={setTechnicians} technicians={technicians} setShow={setShow} show={show} selectedVent={selectedVent} setSelectedVent={setSelectedVent}/>
      }
      {show.completeSurvey &&
      <CompleteSurveyForm selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} setShow={setShow} show={show} equipment={equipment} setEquipment={setEquipment}/>
      }
    </div>
  );
}

export default App;

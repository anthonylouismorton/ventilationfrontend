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

function App() {
  const defaultShow = {'ventList': false, 'addTechnician': false, 'addVent': false, 'addVentSurvey': false, 'addUnit': false, 'ventInfo': false, 'equipment': false, 'addEquipment': false, 'technicianList': false, 'ventSurveyList': false, 'assignSurvey': false, 'completeSurvey': false, unitList: false, unitInfo: false, reviewSurvey: false, techInfo: false, equipmentInfo: false };
  const [show, setShow] = useState({'ventList': true, 'addTechnician': false, 'addVent': false, 'addVentSurvey': false, 'addUnit': false, 'ventInfo': false, 'equipment': false, 'addEquipment': false, 'technicianList': false, 'ventSurveyList': false, 'assignSurvey': false, 'completeSurvey': false, unitList: false, unitInfo: false, reviewSurvey: false, techInfo: false, equipmentInfo: false });
  const [open, setOpen] = useState({'addUnitModal': false, 'addTechnician': false});
  const [units, setUnits] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedVent, setSelectedVent] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [selectedVentSurvey, setSelectedVentSurvey] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState({unitId: ''});
  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

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
      <UnitVentList setShow={setShow} show={show} technicians={technicians} setTechnicians={setTechnicians} setSelectedVent={setSelectedVent} selectedUnit={selectedUnit}/>
      </>
      }
      {show.ventList &&
      <VentList setShow={setShow} show={show} technicians={technicians} setTechnicians={setTechnicians} setSelectedVent={setSelectedVent} selectedUnit={selectedUnit}
      />
      }
      {show.addTechnician &&
      <AddTechnicianForm setShow={setShow} show={show} technicians={technicians} setTechnicians={setTechnicians}/>
      }
      {show.technicianList &&
      <TechnicianList setShow={setShow} show={show} technicians={technicians} selectedTech={selectedTech} setSelectedTech={setSelectedTech}/>
      }
      {show.addVentSurvey &&
      <AddVentSurvey selectedVent={selectedVent} show={show} setShow={setShow} equipment={equipment} setEquipment={setEquipment}/>
      }
      <AddUnitModalForm open={open} setOpen={setOpen} units={units} setUnits={setUnits}/>
      {show.addVent &&
      <AddVentForm setShow={setShow} show={show} open={open} setOpen={setOpen} units={units} setUnits={setUnits} selectedUnit={selectedUnit}/>
      }
      {show.ventInfo &&
      <>
      <VentInfo selectedVent={selectedVent} setSelectedVent={setSelectedVent} technicians={technicians} show={show} setShow={setShow}/>
      <VentSurveyList selectedVent={selectedVent} setShow={setShow} show={show} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} equipment={equipment} setEquipment={setEquipment}/>
      </>
      }
      {show.ventSurveyList &&
      <AllVentSurveysList selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} setShow={setShow} show={show} equipment={equipment} setEquipment={setEquipment}/>
      }
      {show.addEquipment &&
      <AddEquipmentForm setEquipment={setEquipment} equipment={equipment} setShow={setShow} show={show}/>
      }
      {show.equipment &&
      <EquipmentList setShow={setShow} show={show} setEquipment={setEquipment} equipment={equipment} selectedEquipment={selectedEquipment} setSelectedEquipment={setSelectedEquipment}/>
      }
      {show.equipmentInfo &&
      <EquipmentInfo setShow={setShow} show={show} selectedEquipment={selectedEquipment} setSelectedEquipment={setSelectedEquipment}/>
      }
      {show.assignSurvey &&
      <AssignSurveyForm setTechnicians={setTechnicians} technicians={technicians} setShow={setShow} show={show} selectedVent={selectedVent} setSelectedVent={setSelectedVent}/>
      }
      {show.completeSurvey &&
      <CompleteVentSurvey selectedVent={selectedVent} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} setShow={setShow} show={show} equipment={equipment} setEquipment={setEquipment}/>
      }
      {show.reviewSurvey &&
      <ReviewSurveyForm setTechnicians={setTechnicians} technicians={technicians} setShow={setShow} show={show} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} equipment={equipment} setEquipment={setEquipment}/>
      }
      {show.techInfo &&
      <TechInfo selectedTech={selectedTech} setSelectedTech={setSelectedTech} show={show} setShow={setShow}/>
      }
    </div>
  );
}

export default App;

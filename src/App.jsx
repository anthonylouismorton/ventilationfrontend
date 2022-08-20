import { useState } from 'react';
import './App.css';
import AddTechnicianForm from './components/AddTechnicianForm';
import AddUnitForm from './components/AddUnitForm';
import AddVentForm from './components/AddVentForm';
import AddVentSurvey from './components/AddVentSurvey';
import VentList from './components/VentList';
import Button from '@mui/material/Button';
import VentInfo from './components/VentInfo';
import NavBar from './components/NavBar';
import EquipmentList from './components/EquipmentList';
import AddEquipmentForm from './components/AddEquipmentForm';
import VentSurveyList from './components/VentSurveyList';

function App() {
  const defaultShow = {'ventList': false, 'addTechnician': false, 'addVent': false, 'addVentSurvey': false, 'addUnit': false, 'buttons': false, 'ventInfo': false, 'equipment': false, 'addEquipment': false }
  const [show, setShow] = useState({'ventList': true, 'addTechnician': false, 'addVent': false, 'addVentSurvey': false, 'addUnit': false, 'buttons': true, 'ventInfo': false, 'equipment': false, 'addEquipment': false });
  const [open, setOpen] = useState({'addUnitModal': false, 'addTechnician': false});
  const [units, setUnits] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedVent, setSelectedVent] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const handleShowTech = () => setShow({...show, addTechnician: true, buttons: false, ventList: false});

  return (
    <div className="App">
      <NavBar setShow={setShow} show={show} defaultShow={defaultShow}/>
      {show.ventList &&
      <VentList setShow={setShow} show={show} technicians={technicians} setTechnicians={setTechnicians} setSelectedVent={setSelectedVent}/>
      }
      {show.addTechnician &&
      <AddTechnicianForm setShow={setShow} show={show} setTechnicians={setTechnicians}/>
      }
      {show.addVentSurvey &&
      <AddVentSurvey selectedVent={selectedVent} show={show} setShow={setShow} equipment={equipment} setEquipment={setEquipment}/>
      }
      <AddUnitForm open={open} setOpen={setOpen} units={units} setUnits={setUnits}/>
      {show.addVent &&
      <AddVentForm setShow={setShow} show={show} open={open} setOpen={setOpen} units={units} setUnits={setUnits}/>
      }
      {show.buttons &&
      <Button onClick={handleShowTech} variant='contained'>Add Tech</Button>
      }
      {show.ventInfo &&
      <>
      <VentInfo selectedVent={selectedVent} setSelectedVent={setSelectedVent} technicians={technicians} show={show} setShow={setShow}/>
      <VentSurveyList selectedVent={selectedVent}/>
      </>
      }
      {show.equipment &&
      <EquipmentList setShow={setShow} show={show}/>
      }
      {show.addEquipment &&
      <AddEquipmentForm setEquipment={setEquipment} equipment={equipment} setShow={setShow} show={show}/>
      }
    </div>
  );
}

export default App;

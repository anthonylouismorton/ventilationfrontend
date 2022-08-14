import { useState } from 'react';
import './App.css';
import AddTechnicianForm from './components/AddTechnicianForm';
import AddUnitForm from './components/AddUnitForm';
import AddVentForm from './components/AddVentForm';
import AddVentSurvey from './components/AddVentSurvey';
import VentList from './components/VentList';
import Button from '@mui/material/Button';
import VentInfo from './components/VentInfo';

function App() {
  const [show, setShow] = useState({'ventList': true, 'addTechnician': false, 'addVent': false, 'addVentSurvey': false, 'addUnit': false, 'buttons': true, 'ventInfo': false });
  const [open, setOpen] = useState({'addUnitModal': false, 'addTechnician': false});
  const [units, setUnits] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedVent, setSelectedVent] = useState([]);
  const handleShowTech = () => setShow({...show, addTechnician: true, buttons: false, ventList: false});
  return (
    <div className="App">
      {show.ventList &&
      <VentList setShow={setShow} show={show} technicians={technicians} setTechnicians={setTechnicians} setSelectedVent={setSelectedVent}/>
      }
      {show.addTechnician &&
      <AddTechnicianForm setShow={setShow} show={show} setTechnicians={setTechnicians}/>
      }
      {show.addVentSurvey &&
      <AddVentSurvey/>
      }
      <AddUnitForm open={open} setOpen={setOpen} units={units} setUnits={setUnits}/>
      {show.addVent &&
      <AddVentForm setShow={setShow} show={show} open={open} setOpen={setOpen} units={units} setUnits={setUnits}/>
      }
      {show.buttons &&
      <Button onClick={handleShowTech} variant='contained'>Add Tech</Button>
      }
      {show.ventInfo &&
      <VentInfo selectedVent={selectedVent} setSelectedVent={setSelectedVent} technicians={technicians} setShow={setShow}/>
      }
    </div>
  );
}

export default App;

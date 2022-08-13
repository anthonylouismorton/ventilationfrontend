import { useState } from 'react';
import './App.css';
import AddTechnicianForm from './components/AddTechnicianForm';
import AddUnitForm from './components/AddUnitForm';
import AddVentForm from './components/AddVentForm';
import AddVentSurvey from './components/AddVentSurvey';
import VentList from './components/VentList';

function App() {
  const [show, setShow] = useState({'ventList': true, 'addTechnician': false, 'addVent': false, 'addVentSurvey': false, 'addUnit': false })
  const [open, setOpen] = useState({'addUnitModal': false})
  const [units, setUnits] = useState([])
  return (
    <div className="App">
      {show.ventList &&
      <VentList setShow={setShow} show={show}/>
      }
      {show.addTechnician &&
      <AddTechnicianForm/>
      }
      {show.addVentSurvey &&
      <AddVentSurvey/>
      }
      <AddUnitForm open={open} setOpen={setOpen} units={units} setUnits={setUnits}/>
      {show.addVent &&
      <AddVentForm setShow={setShow} show={show} open={open} setOpen={setOpen} units={units} setUnits={setUnits}/>
      }
    </div>
  );
}

export default App;

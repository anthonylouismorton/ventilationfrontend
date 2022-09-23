import { useState } from 'react';
import AddTechnicianForm from './Technician/AddTechnicianForm';
import AddUnitModalForm from './Units/AddUnitModalForm';
import AddVentForm from './Vents/AddVentForm';
// import AddVentSurvey from './Surveys/AddVentSurvey';
import VentList from './Vents/VentList';
import VentInfo from './Vents/VentInfo';
import EquipmentList from './Equipment/EquipmentList';
import AddEquipmentForm from './Equipment/AddEquipmentForm';
import AllVentSurveysList from './Surveys/AllVentSurveysList';
import TechnicianList from './Technician/TechnicianList';
import VentSurveyList from './Vents/VentSurveyList';
import AssignSurveyForm from './Surveys/AssignSurveyForm';
import CompleteVentSurvey from './Surveys/CompleteVentSurvey';
import UnitList from './Units/UnitList';
import AddUnitForm from './Units/AddUnitForm';
import UnitInfo from './Units/UnitInfo';
import UnitVentList from './Units/UnitVentList';
import ReviewSurveyForm from './Surveys/ReviewSurveyForm';
import TechInfo from './Technician/TechnicianInfo';
import EquipmentInfo from './Equipment/EquipmentInfo';
import Login from './Login';
import { useAuth0 } from "@auth0/auth0-react";

function Main(props) {
  const [open, setOpen] = useState({'addUnitModal': false, 'addTechnician': false});
  const [units, setUnits] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedVent, setSelectedVent] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [selectedVentSurvey, setSelectedVentSurvey] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState({unitId: ''});
  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const { isAuthenticated } = useAuth0();
  console.log(props.technicians)

  return (
    <>
      {!isAuthenticated ?
      <Login/>
      :
      <>
      {props.show.addUnit &&
      <AddUnitForm setShow={props.setShow} show={props.show} units={units} setUnits={setUnits}/>
      }
      {props.show.unitList &&
      <UnitList setShow={props.setShow} show={props.show} units={units} setUnits={setUnits} selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit}/>
      }
      {props.show.unitInfo &&
      <>
      <UnitInfo setShow={props.setShow} show={props.show} units={units} setUnits={setUnits} selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit}/>
      <UnitVentList setShow={props.setShow} show={props.show} technicians={technicians} setTechnicians={setTechnicians} setSelectedVent={setSelectedVent} selectedUnit={selectedUnit}/>
      </>
      }
      {props.show.ventList &&
      <VentList setShow={props.setShow} show={props.show} technicians={technicians} setTechnicians={setTechnicians} setSelectedVent={setSelectedVent} selectedUnit={selectedUnit}
      />
      }
      {props.show.addTechnician &&
      <AddTechnicianForm setShow={props.setShow} show={props.show} technicians={technicians} setTechnicians={setTechnicians}/>
      }
      {props.show.technicianList &&
      <TechnicianList setShow={props.setShow} show={props.show} technicians={technicians} selectedTech={selectedTech} setSelectedTech={setSelectedTech}/>
      }
      {/* {props.show.addVentSurvey &&
      <AddVentSurvey selectedVent={selectedVent} show={props.show} setShow={props.setShow} equipment={equipment} setEquipment={setEquipment}/>
      } */}
      <AddUnitModalForm open={open} setOpen={setOpen} units={units} setUnits={setUnits}/>
      {props.show.addVent &&
      <AddVentForm setShow={props.setShow} show={props.show} open={open} setOpen={setOpen} units={units} setUnits={setUnits} selectedUnit={selectedUnit}/>
      }
      {props.show.ventInfo &&
      <>
      <VentInfo selectedVent={selectedVent} setSelectedVent={setSelectedVent} technicians={technicians} show={props.show} setShow={props.setShow}/>
      <VentSurveyList selectedVent={selectedVent} setShow={props.setShow} show={props.show} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} equipment={equipment} setEquipment={setEquipment} userProfile={props.userProfile}/>
      </>
      }
      {props.show.ventSurveyList &&
      <AllVentSurveysList selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} setShow={props.setShow} show={props.show} equipment={equipment} setEquipment={setEquipment}/>
      }
      {props.show.addEquipment &&
      <AddEquipmentForm setEquipment={setEquipment} equipment={equipment} setShow={props.setShow} show={props.show}/>
      }
      {props.show.equipment &&
      <EquipmentList setShow={props.setShow} show={props.show} setEquipment={setEquipment} equipment={equipment} selectedEquipment={selectedEquipment} setSelectedEquipment={setSelectedEquipment}/>
      }
      {props.show.equipmentInfo &&
      <EquipmentInfo setShow={props.setShow} show={props.show} selectedEquipment={selectedEquipment} setSelectedEquipment={setSelectedEquipment}/>
      }
      {props.show.assignSurvey &&
      <AssignSurveyForm setTechnicians={setTechnicians} technicians={props.technicians} setShow={props.setShow} show={props.show} selectedVent={selectedVent} setSelectedVent={setSelectedVent}/>
      }
      {props.show.completeSurvey &&
      <CompleteVentSurvey selectedVent={selectedVent} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} setShow={props.setShow} show={props.show} equipment={equipment} setEquipment={setEquipment} technicians={technicians} setTechnicians={setTechnicians}/>
      }
      {props.show.reviewSurvey &&
      <ReviewSurveyForm setTechnicians={setTechnicians} technicians={props.technicians} setShow={props.setShow} show={props.show} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} equipment={equipment} setEquipment={setEquipment}/>
      }
      {props.show.techInfo &&
      <TechInfo selectedTech={selectedTech} setSelectedTech={setSelectedTech} show={props.show} setShow={props.setShow}/>
      }
      </>
    }
    </>
  );
}
    
export default Main;
    
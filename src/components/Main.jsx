import { useState, useEffect } from 'react';
import AddTechnicianForm from './Technician/AddTechnicianForm';
import AddUnitModalForm from './Units/AddUnitModalForm';
import AddVentForm from './Vents/AddVentForm';
import AddVentSurvey from './Surveys/AddVentSurvey';
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
import NavBar from './NavBar';
import Login from './Login';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

function Main() {
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
  const [userProfile, setUserProfile] = useState([]);
  const { user, isAuthenticated} = useAuth0();

  useEffect(()=> {
    const getTechs = async () => {
      let techList= await axios.get(`${process.env.REACT_APP_DATABASE}/technician`);
      let currentUser = techList.data.filter(tech => tech.technicianEmail === user.email)
      console.log(currentUser)
      setUserProfile({...currentUser, ...user})
      setTechnicians(techList.data)
    }
    let ignore = false;
    if (!ignore)  getTechs()
    return () => { ignore = true; }
  }, [user]);

  return (
    <>
      <NavBar setShow={setShow} show={show} defaultShow={defaultShow} setSelectedUnit={setSelectedUnit} userProfile={userProfile}/>
      {!isAuthenticated ?
      <Login/>
      :
      <>
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
      <VentSurveyList selectedVent={selectedVent} setShow={setShow} show={show} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} equipment={equipment} setEquipment={setEquipment} userProfile={userProfile}/>
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
      <CompleteVentSurvey selectedVent={selectedVent} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} setShow={setShow} show={show} equipment={equipment} setEquipment={setEquipment} technicians={technicians} setTechnicians={setTechnicians}/>
      }
      {show.reviewSurvey &&
      <ReviewSurveyForm setTechnicians={setTechnicians} technicians={technicians} setShow={setShow} show={show} selectedVentSurvey={selectedVentSurvey} setSelectedVentSurvey={setSelectedVentSurvey} equipment={equipment} setEquipment={setEquipment}/>
      }
      {show.techInfo &&
      <TechInfo selectedTech={selectedTech} setSelectedTech={setSelectedTech} show={show} setShow={setShow}/>
      }
      </>
    }
    </>
  );
}
    
export default Main;
    
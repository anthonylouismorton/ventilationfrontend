import Main from './components/Main';
import NavBar from './NavBar/NavBar';
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

function App() {
  const [userProfile, setUserProfile] = useState('');
  const { user, isAuthenticated} = useAuth0();
  const [technicians, setTechnicians] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState({unitId: ''});
  const defaultShow = {'ventList': false, 'addTechnician': false, 'addVent': false, 'addVentSurvey': false, 'addUnit': false, 'ventInfo': false, 'equipment': false, 'addEquipment': false, 'technicianList': false, 'ventSurveyList': false, 'assignSurvey': false, 'completeSurvey': false, unitList: false, unitInfo: false, reviewSurvey: false, techInfo: false, equipmentInfo: false };
  const [show, setShow] = useState({'ventList': true, 'addTechnician': false, 'addVent': false, 'addVentSurvey': false, 'addUnit': false, 'ventInfo': false, 'equipment': false, 'addEquipment': false, 'technicianList': false, 'ventSurveyList': false, 'assignSurvey': false, 'completeSurvey': false, unitList: false, unitInfo: false, reviewSurvey: false, techInfo: false, equipmentInfo: false });
  
  useEffect(()=> {
    const getTechs = async () => {
      if(userProfile === ''){
        console.log('in the if')
        let techList= await axios.get(`${process.env.REACT_APP_DATABASE}/technician`);
        if(isAuthenticated){
          let currentUser = techList.data.filter(tech => tech.technicianEmail === user.email)
          console.log(currentUser)
          setUserProfile({...currentUser[0], user})
        }
        setTechnicians(techList.data)
      }
    }
    let ignore = false;
    if (!ignore)  getTechs()
    return () => { ignore = true; }

  }, [isAuthenticated, user, userProfile]);
  return (
    <>
    <NavBar setShow={setShow} show={show} defaultShow={defaultShow} setSelectedUnit={setSelectedUnit} userProfile={userProfile} setTechnicians={setTechnicians}/>
    <Main setShow={setShow} show={show} defaultShow={defaultShow} userProfile={userProfile} technicians={technicians} selectedUnit={selectedUnit}/>
    </>
  );
}
    
export default App;
    
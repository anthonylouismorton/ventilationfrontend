import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
export const UserContext = React.createContext();

function UserProvider({children}){
  console.log('hitting this')
  const [userProfile, setUserProfile] = useState({user: {nickName: ''}});
  const { user, isAuthenticated} = useAuth0();
  const getTechs = async () => {
    if(userProfile.user.nickName === ''){
      let techList= await axios.get(`${process.env.REACT_APP_DATABASE}/technician`);
      if(isAuthenticated){
        let currentUser = techList.data.filter(tech => tech.technicianEmail === user.email)
        setUserProfile({...currentUser[0], user})
      }
    }
  }
  useEffect(()=> {
    getTechs();
  }, [isAuthenticated, user, userProfile]);

  return (
    <UserContext.Provider value={userProfile}>
      {children}
    </UserContext.Provider>
  );
  
}

export default UserProvider;


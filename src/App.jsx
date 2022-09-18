import Login from './components/Login';
import Main from './components/Main';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated} = useAuth0();

  return (
    <>
      {!isAuthenticated ?
      <Login/>
      :
      <Main/>
      }
    </>
  );
    }
    
    export default App;
    
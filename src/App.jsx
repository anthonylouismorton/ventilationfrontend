import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated} = useAuth0();

  return (
    <div className="App">
      {!isAuthenticated ?
      <Login/>
      :
      <Main/>
      }
    </div>
  );
    }
    
    export default App;
    
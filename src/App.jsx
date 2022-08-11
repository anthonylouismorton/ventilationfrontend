import logo from './logo.svg';
import './App.css';
import AddTechnicianForm from './components/AddTechnicianForm';
import AddUnitForm from './components/AddUnitForm';
import AddVentForm from './components/AddVentForm';
import AddVentSurvey from './components/AddVentSurvey';
import VentList from './components/VentList';

function App() {
  return (
    <div className="App">
      {/* <VentList/> */}
      {/* <AddTechnicianForm/> */}
      <AddVentSurvey/>
      {/* <AddUnitForm/> */}
      {/* <AddVentForm/> */}
    </div>
  );
}

export default App;

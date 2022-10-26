import VentList from './VentList';
import VentInfo from './VentInfo';
import VentSurveyList from './VentSurveyList';
import AddVentForm from './AddVentForm';
import AssignSurveyForm from './AssignSurveyForm';
import ReviewSurveyForm from './ReviewSurveyForm';
import { Routes, Route } from 'react-router-dom';

export default function Vents(props) {
	return (
	<Routes>
    <Route
      path={`/Vent/${props.selectedVent.ventId}`}
      element={<><VentInfo selectedVent={props.selectedVent} setSelectedVent={props.setSelectedVent} technicians={props.technicians}/><VentSurveyList selectedVent={props.selectedVent} selectedVentSurvey={props.selectedVentSurvey} setSelectedVentSurvey={props.setSelectedVentSurvey}/></>}
    />
    <Route
      path={'/AddVent'}
      element={<AddVentForm open={props.open} setOpen={props.setOpen} units={props.units} setUnits={props.setUnits} selectedUnit={props.selectedUnit}/>}
    />
    <Route
      path={'/'}
      element={<VentList technicians={props.technicians} setTechnicians={props.setTechnicians} setSelectedVent={props.setSelectedVent} selectedUnit={props.selectedUnit}/>}
    />
    <Route
      path={'/AssignSurvey'}
      element={<AssignSurveyForm setTechnicians={props.setTechnicians} technicians={props.technicians} selectedVent={props.selectedVent} setSelectedVent={props.setSelectedVent} selectedUnit={props.selectedUnit}/>}
    />
    <Route
      path={`/ReviewSurvey/${props.selectedVentSurvey.ventSurvey.ventSurveyId}`}
      element={<ReviewSurveyForm setTechnicians={props.setTechnicians} technicians={props.technicians} selectedVent={props.selectedVent} setSelectedVent={props.setSelectedVent} selectedVentSurvey={props.selectedVentSurvey} setSelectedVentSurvey={props.setSelectedVentSurvey} selectedEquipment={props.selectedEquipment}/>}
    />
  </Routes>
	);
};
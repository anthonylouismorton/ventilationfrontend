import { useState } from 'react';
import VentList from './VentList';
import VentInfo from './VentInfo';
import VentSurveyList from './VentSurveyList';
import AddVentForm from './AddVentForm';
import { Routes, Route } from 'react-router-dom';

export default function Vents(props) {
	return (
	<Routes>
    <Route
      path={`/Vent/${props.selectedVent.ventId}`}
      element={<><VentInfo selectedVent={props.selectedVent} setSelectedVent={props.setSelectedVent} technicians={props.technicians} show={props.show} setShow={props.setShow}/><VentSurveyList selectedVent={props.selectedVent} setShow={props.setShow} show={props.show} selectedVentSurvey={props.selectedVentSurvey} setSelectedVentSurvey={props.setSelectedVentSurvey} equipment={props.equipment} setEquipment={props.setEquipment} userProfile={props.userProfile}/></>}
    />
    <Route
      path={'/AddVent'}
      element={<AddVentForm open={props.open} setOpen={props.setOpen} units={props.units} setUnits={props.setUnits} selectedUnit={props.selectedUnit}/>}
    />
    <Route
      path={'/'}
      element={<VentList setShow={props.setShow} show={props.show} technicians={props.technicians} setTechnicians={props.setTechnicians} setSelectedVent={props.setSelectedVent} selectedUnit={props.selectedUnit}/>}
    />
  </Routes>
	);
};
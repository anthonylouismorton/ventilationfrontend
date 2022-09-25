import React from 'react';
import AddVentSurvey from './AddVentSurvey';
import AllVentSurveysList from './AllVentSurveysList';
import CompleteVentSurvey from './CompleteVentSurvey';
import { Routes, Route } from 'react-router-dom';

export default function Surveys(props) {
	return (
		<Routes>
      <Route
        path={'/'}
        element={<AllVentSurveysList selectedVentSurvey={props.selectedVentSurvey} setSelectedVentSurvey={props.setSelectedVentSurvey} equipment={props.equipment} setEquipment={props.setEquipment}/>}
      />
      <Route
        path={'/AddVent'}
        element={<AddVentSurvey selectedVent={props.selectedVent} show={props.show} setShow={props.setShow} equipment={props.equipment} setEquipment={props.setEquipment}/>}
      />
      <Route
        path={`/CompleteVentSurvey/${props.selectedVentSurvey.ventSurvey.ventSurveyId}`}
        element={<CompleteVentSurvey selectedVent={props.selectedVent} selectedVentSurvey={props.selectedVentSurvey} setSelectedVentSurvey={props.setSelectedVentSurvey} equipment={props.equipment} setEquipment={props.setEquipment} technicians={props.technicians} setTechnicians={props.setTechnicians}/>}
      />
    </Routes>
	);
};
import React from 'react';
import TechnicianList from './TechnicianList'
import TechnicianInfo from './TechnicianInfo';
import AddTechnicianForm from './AddTechnicianForm'
import { Routes, Route } from 'react-router-dom';

export default function Technician(props) {
	return (
		<Routes>
      <Route
        path={'/'}
        element={<TechnicianList technicians={props.technicians} selectedTech={props.selectedTech} setSelectedTech={props.setSelectedTech}/>}
      />
      <Route     
        path={'/AddTechnician'} 
        element={<AddTechnicianForm technicians={props.technicians} setTechnicians={props.setTechnicians}/>}
      />
      <Route
        path={`TechnicianInfo/${props.selectedTech.technicianId}`}
        element={<TechnicianInfo selectedTech={props.selectedTech} setSelectedTech={props.setSelectedTech}/>}
      />
    </Routes>
	);
};
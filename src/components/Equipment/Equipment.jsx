import AddEquipmentForm from './AddEquipmentForm';
import EquipmentInfo from './EquipmentInfo';
import EquipmentList from './EquipmentList';
import { Routes, Route } from 'react-router-dom';

export default function Equipment(props) {
	return (
    <Routes>
      <Route
        path={'/'}
        element={<EquipmentList setEquipment={props.setEquipment} equipment={props.equipment} setSelectedEquipment={props.setSelectedEquipment}/>}
      />
      <Route
        path={'/Equipment/AddEquipment'}
        element={<AddEquipmentForm setEquipment={props.setEquipment}/>}
      />
    <Route
      path={`Equipment/EquipmentInfo/${props.selectedEquipment.equipmentId}`}
      element={<EquipmentInfo selectedEquipment={props.selectedEquipment} setSelectedEquipment={props.setSelectedEquipment}/>}
     />
    </Routes>
	);
};
import UnitList from './UnitList';
import AddUnitForm from '../Vents/AddUnitModalForm';
import UnitInfo from './UnitInfo';
import UnitVentList from './UnitVentList';
import VentInfo from '../Vents/VentInfo';
import VentSurveyList from '../Vents/VentSurveyList';
import { Routes, Route } from 'react-router-dom';

export default function Units(props) {
  // const [open, setOpen] = useState({'addUnitModal': false, 'addTechnician': false});
	return (
	<Routes>
    <Route
      path={`/Unit/${props.selectedUnit.unitId}`}
      element={<><UnitInfo setShow={props.setShow} show={props.show} units={props.units} setUnits={props.setUnits} selectedUnit={props.selectedUnit} setSelectedUnit={props.setSelectedUnit}/><UnitVentList setShow={props.setShow} show={props.show} technicians={props.technicians} setTechnicians={props.setTechnicians} setSelectedVent={props.setSelectedVent} selectedUnit={props.selectedUnit}/> </>}
    />
    <Route
      path={'/AddUnit'}
      element={<AddUnitForm setShow={props.setShow} show={props.show} units={props.units} setUnits={props.setUnits}/>}
    />
    <Route
      path={'/'}
      element={<UnitList setShow={props.setShow} show={props.show} units={props.units} setUnits={props.setUnits} selectedUnit={props.selectedUnit} setSelectedUnit={props.setSelectedUnit}/>}
    />
    <Route
      path={`/Unit/${props.selectedUnit.unitId}/Vent/${props.selectedVent.ventId}`}
      element={<><VentInfo selectedVent={props.selectedVent} setSelectedVent={props.setSelectedVent} technicians={props.technicians} show={props.show} setShow={props.setShow}/><VentSurveyList selectedVent={props.selectedVent} setShow={props.setShow} show={props.show} selectedVentSurvey={props.selectedVentSurvey} setSelectedVentSurvey={props.setSelectedVentSurvey} equipment={props.equipment} setEquipment={props.setEquipment} userProfile={props.userProfile}/></>}
    />
  </Routes>
	);
};
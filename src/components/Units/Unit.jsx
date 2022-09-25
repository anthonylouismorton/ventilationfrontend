import {useState} from 'react';
import UnitList from './UnitList';
import AddUnitForm from './AddUnitModalForm';
import UnitInfo from './UnitInfo';
import UnitVentList from './UnitVentList';
import AddUnitModalForm from './AddUnitModalForm';
import { Routes, Route } from 'react-router-dom';

export default function Unit(props) {
  const [open, setOpen] = useState({'addUnitModal': false, 'addTechnician': false});
	return (
	<Routes>
    <Route
      path={`/UnitInfo/${props.selectedUnit.unitId}`}
      element={<><UnitVentList setShow={props.setShow} show={props.show} technicians={props.technicians} setTechnicians={props.setTechnicians} setSelectedVent={props.setSelectedVent} selectedUnit={props.selectedUnit}/> <UnitInfo setShow={props.setShow} show={props.show} units={props.units} setUnits={props.setUnits} selectedUnit={props.selectedUnit} setSelectedUnit={props.setSelectedUnit}/></>}
    />
    <Route
      path={'/AddUnit'}
      element={<AddUnitForm setShow={props.setShow} show={props.show} units={props.units} setUnits={props.setUnits}/>}
    />
    {props.show.addUnit &&
    <AddUnitForm setShow={props.setShow} show={props.show} units={props.units} setUnits={props.setUnits}/>
    }
    <Route
      path={'/'}
      element={<UnitList setShow={props.setShow} show={props.show} units={props.units} setUnits={props.setUnits} selectedUnit={props.selectedUnit} setSelectedUnit={props.setSelectedUnit}/>}
    />
  </Routes>
	);
};
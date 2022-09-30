import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	TextField,
	Button,
	Paper,
	Grid,
	FormControl,
	Box,
	Typography,
  Select,
  MenuItem,
  InputLabel,
  Tooltip,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import AddUnitModalForm from './AddUnitModalForm';

export default function AddVentForm(props) {
  const defaultFormValues = {
    description: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
		startDate: new Date().toISOString().split('T')[0],
    unitId: '',
    unitName: '',
    surveyFrequency: 'Quarterly',
    ventShape: 'Square',
    type: 'Fume Hood'
  }
	const [formValues, setFormValues] = useState(defaultFormValues);
  const { selectedUnit, setUnits } = props
  const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
	};
  const handleUnit = (unit) => {
    setFormValues({
      ...formValues,
      unitId: unit.unitId,
      unitName: `${unit.WPID} ${unit.unitName}`
    });
  }

	const handleCancel = () => {
		setFormValues(defaultFormValues);
    navigate(-1)

  };

	const onSubmit = async (e) => {
		e.preventDefault();
    await axios.post(
      `${process.env.REACT_APP_DATABASE}/vents`,
      formValues,
    )
    setFormValues(defaultFormValues);
    navigate(-1)

	};
  const handleOpen = () => props.setOpen({...props.open, addUnitModal: true });
  const getUnits = async () => {
    let unitList = await axios.get(
      `${process.env.REACT_APP_DATABASE}/unit`,
      formValues,
      );
    props.setUnits([...unitList.data]);
    if(selectedUnit.unitId){
      setFormValues({...formValues, unitId: selectedUnit.unitId, unitName: `${selectedUnit.WPID} ${selectedUnit.unitName}`})
    }
    else{
      setFormValues({...formValues, unitId: unitList.data[0].unitId, unitName: `${unitList.data[0].WPID} ${unitList.data[0].unitName}`})
    }
  }
  useEffect(()=> {
    getUnits();
  }, []);

	return (
    <>
		<Box>
			<Paper>
				<Typography>New Vent</Typography>
				<Grid>
					<form onSubmit={onSubmit}>
            <Grid>
                <FormControl>
                  <TextField
                    name='manufacturer'
                    id='outlined-multiline-static'
                    label='Manufacturer'
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    name='model'
                    id='outlined-multiline-static'
                    label='Model'
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
              <Grid item>
                <FormControl>
                  <TextField
                    name='description'
                    id='outlined-multiline-static'
                    label='description'
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
							</Grid>
						</Grid>
						<Grid>
							<Grid item>
                <FormControl>
                  <TextField
                    name='serialNumber'
                    id='outlined-multiline-static'
                    label='Serial #'
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
							</Grid>
						</Grid>
            <Grid>
							<Grid item>
                <FormControl>
                  <TextField
                    name='startDate'
                    id='outlined-multiline-static'
                    label='Start Date'
                    defaultValue={formValues.startDate}
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
							</Grid>
						</Grid>
            <Grid>
                <Grid item>
                  <FormControl>
                    <InputLabel id='demo-simple-select-label'>
                      Vent Shape
                    </InputLabel>
                    <Select
                      name='ventShape'
                      value={formValues.ventShape}
                      onChange={handleChange}
                    >
                      <MenuItem value={'Circular'}>Circular</MenuItem>
                      <MenuItem value={'Square'}>Square</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
						</Grid>
            <Grid>
                <Grid item>
                  <FormControl>
                    <InputLabel id='demo-simple-select-label'>
                      Frequency
                    </InputLabel>
                    <Select
                      name='surveyFrequency'
                      value={formValues.surveyFrequency}
                      onChange={handleChange}
                    >
                      <MenuItem value={'Quarterly'}>Quarterly</MenuItem>
                      <MenuItem value={'Semi Annually'}>Semi Annually</MenuItem>
                      <MenuItem value={'Annually'}>Annually</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
						</Grid>
            <Grid>
              <Grid item>
                <FormControl>
                  <InputLabel id='demo-simple-select-label'>
                    Type
                  </InputLabel>
                  <Select
                    name='type'
                    value={formValues.type}
                    placeholder={'Select Vent Type'}
                    onChange={handleChange}
                  >
                    <MenuItem value={'Fume Hood'}>Fume Hood</MenuItem>
                    <MenuItem value={'Paint Booth'}>Paint Booth</MenuItem>
                    <MenuItem value={'Battery Room'}>Battery Room</MenuItem>
                    <MenuItem value={'Welding Hood'}>Welding Hood</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
						</Grid>
            <Grid>
            <Grid item>
              <Select
                name='unitName'
                value={formValues.unitName}
              >
                {props.units.map((unit) =>(
                  <MenuItem key={unit.unitId} onClick={() => handleUnit(unit)} value={`${unit.WPID} ${unit.unitName}`}>{`${unit.WPID} ${unit.unitName}`}</MenuItem>
                ))}
              </Select>
              <Tooltip title="Add New Unit">
                <IconButton onClick={handleOpen}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Grid>
						</Grid>
						<Grid item>
							<Button type='submit' variant='contained'>
								Submit
							</Button>
							<Button onClick={handleCancel} color='error' variant='contained'>
								Cancel
							</Button>
						</Grid>
					</form>
				</Grid>
			</Paper>
		</Box>
    <AddUnitModalForm open={props.open} setOpen={props.setOpen} units={props.units} setUnits={props.setUnits}/>
    </>
	);
};
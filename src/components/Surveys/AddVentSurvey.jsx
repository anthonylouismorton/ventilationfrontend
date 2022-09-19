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
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function AddVentSurveyForm(props) {
  let [ventFlowMeasurements, setVentFlowMeasurements] = useState(['']);
  let [averageVentFlow, setAverageVentFlow] = useState('');
  let [roomVolume, setRoomVolume] = useState('');
  let [airChanges, setAirChanges] = useState('');
  let [roomDimensions, setRoomDimensions] = useState(['','','']);
  let [ventDimensions, setVentDimensions] = useState(['','']);
  let [ventArea, setVentArea] = useState('');
  const defaultFormValues = {
    equipmentId: '',
    equipment: '',
    expirationDate: '',
    roomDimensions: '',
    surveyDate: new Date().toISOString().split('T')[0],
    ventDimensions: '',
    ventId: '',
    ventReadings: '',
    pass: '',
    technicianId: ''
  }
  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleEquipmentSelect = (equipment) => {
    setFormValues({
      ...formValues,
      equipmentId: equipment.equipmentId,
      equipment: `${equipment.manufacturer} ${equipment.model} ${equipment.serialNumber}`
    })
  }
  //This is for the actul vent flow and not the dimensions of the vent
  const handleVentMeasurements = (index, e) => {
    let value = e.target.value
    let newVentFlowMeasurements = ventFlowMeasurements;
    newVentFlowMeasurements[index] = parseInt(value)
    const sum = newVentFlowMeasurements.reduce((prev, current) => prev + current);
    let average = Math.round(sum/newVentFlowMeasurements.length)
    passCheck(newVentFlowMeasurements,average)
    setVentFlowMeasurements([...newVentFlowMeasurements]);
    setAverageVentFlow(average);
  };

  const handleNewVentFlow = () => {
    let newVentFlowMeasurements = ventFlowMeasurements;
    newVentFlowMeasurements.push('');
    setVentFlowMeasurements([...newVentFlowMeasurements]);
  };

  const handleRemoveVentFlow = (flow) => {
    let newVentFlowMeasurements = ventFlowMeasurements;
    newVentFlowMeasurements.splice(flow, 1);
    const sum = newVentFlowMeasurements.reduce((prev, current) => prev + current);
    setVentFlowMeasurements([...newVentFlowMeasurements]);
    setAverageVentFlow(Math.round(sum/newVentFlowMeasurements.length));
  };
  const handleRoomDimensions = (e) => {
    const { name, value } = e.target;
    if(name === 'roomHeight'){
      let newRoomDimensions = roomDimensions;
      newRoomDimensions[0] = parseInt(value);
      setRoomDimensions([...newRoomDimensions]);
      if(roomDimensions.every(e => typeof e === 'number')){
        let volume = newRoomDimensions.reduce((prev, current) => prev * current);
        let sqFtVolume = Math.round(volume/1728)
        setRoomVolume(sqFtVolume);
      };
    }
    else if(name === 'roomWidth'){
      let newRoomDimensions = roomDimensions;
      newRoomDimensions[1] = parseInt(value);
      setRoomDimensions([...newRoomDimensions]);
      if(roomDimensions.every(e => typeof e === 'number')){
        let volume = newRoomDimensions.reduce((prev, current) => prev * current);
        let sqFtVolume = Math.round(volume/1728)
        setRoomVolume(sqFtVolume);
      };
    }
    else if(name === 'roomLength'){
      let newRoomDimensions = roomDimensions;
      newRoomDimensions[2] = parseInt(value);
      setRoomDimensions([...newRoomDimensions]);
      if(roomDimensions.every(e => typeof e === 'number')){
        let volume = newRoomDimensions.reduce((prev, current) => prev * current)
        let sqFtVolume = Math.round(volume/1728)
        setRoomVolume(sqFtVolume);
      };
    };
    
  };
  const handleVentArea = (e) => {
    if(!e.target.value){
      setVentDimensions([0,0])
      setVentArea(0)
    }
    else if(props.selectedVent.ventShape === 'Circular'){
      const diameter = e.target.value;
      let newVentDimensions = ventDimensions
      newVentDimensions[0] = parseInt(diameter)
      setVentDimensions([...newVentDimensions])
      let area = diameter/2 * diameter/2 * Math.PI /144;
      let areaRounded = Math.round((area + Number.EPSILON) * 100) / 100;
      setVentArea(areaRounded);
    }
  };
  const handleAirChanges = () => {
    if(roomDimensions.every(e => typeof e === 'number') && props.selectedVent.ventShape === 'Circular' && typeof ventDimensions[0] === 'number' && averageVentFlow){
      let ventCuFtPerHour = averageVentFlow * ventArea * 60
      let airChangesPerHour = ventCuFtPerHour /roomVolume;
      let roundedAirChanges = Math.round((airChangesPerHour + Number.EPSILON) * 10) / 10;
      setAirChanges(roundedAirChanges);
    };
  };
  
  const passCheck = (flows, average) => {
    let lowFlows = []
    let failFlow = flows.every(el => el < 75)
    for(let i = 0; flows.length > i; i++){
      if(flows[i] < 100){
        lowFlows.push(flows[i])
      }
    }
    if(lowFlows.length < 2 && average > 99 && failFlow === false){
      setFormValues({...formValues, pass: true})
    }
    else{
      setFormValues({...formValues, pass: false})
    }
  }

  const handleCancel = () => {
    setFormValues(defaultFormValues);
    props.setShow({
      ...props.show,
      ventInfo: true,
      addVentSurvey: false
    });
  };

  const onSubmit = async (e) => {
    // new Date().toISOString().split('T')[0]
    e.preventDefault();
		await axios.post(
			`${process.env.REACT_APP_DATABASE}/ventSurvey`,
			formValues,
			);
    setFormValues(defaultFormValues);
    props.setShow({
      ...props.show,
      ventInfo: true,
      addVentSurvey: false
    })
  };
  
  useEffect(()=> {
    const getEquipment = async () =>{
      let equipmentList= await axios.get(`${process.env.REACT_APP_DATABASE}/equipment`)
      props.setEquipment(equipmentList.data)
      let surveyDate = new Date();
      if(props.selectedVent.surveyFrequency === 'Quarterly'){
        setFormValues({...formValues, expirationDate: new Date(surveyDate.setMonth(surveyDate.getMonth()+8)).toISOString().split('T')[0]})
      }
    };
    getEquipment();
  }, [props.setEquipment, formValues, props.selectedVent.surveyFrequency, props]);

  return (
    <Box>
      <Paper>
        <Typography>New Vent Survey</Typography>
        <Grid>
          <form onSubmit={onSubmit}>
            <Grid>
                <FormControl>
                <InputLabel id='demo-simple-select-label'>
                  Equipment
                </InputLabel>
                <Select
                  name='equipment'
                  value={formValues.equipment}
                  placeholder={'Select Vent Type'}
                  >
                {props.equipment.map((equipment) => (
                  <MenuItem onClick={()=> handleEquipmentSelect(equipment)} key={equipment.equipmentId} value={`${equipment.manufacturer} ${equipment.model} ${equipment.serialNumber}`}>{`${equipment.manufacturer} ${equipment.model} ${equipment.serialNumber}`}</MenuItem>
                ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  name='surveyDate'
                  id='outlined-multiline-static'
                  label='Survey Date'
                  value={formValues.surveyDate}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='expirationDate'
                    id='outlined-multiline-static'
                    label='Expiration Date'
                    value={formValues.expirationDate}
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Typography>Vent Flows</Typography>
              {ventFlowMeasurements.map((flow,index) => 
              <Grid key ={index}>
                <TextField
                name='ventFlow'
                id='outlined-multiline-static'
                label={`Vent Flow Measurement ${index+1} (fpm)`}
                value={ventFlowMeasurements[index]}
                rows={1}
                onChange={(e)=> handleVentMeasurements(index, e)}
                />
                {index === 0 ?
                <Tooltip title="Add Measurement">
                  <IconButton onClick={handleNewVentFlow}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                :
                <Tooltip title="Remove Measurement">
                  <IconButton onClick={()=> handleRemoveVentFlow(index)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
                }
                </Grid>
              )}
            </Grid>
            <Grid item>
              <FormControl>
                <TextField
                  name='averageVentFlow'
                  id='outlined-multiline-static'
                  label='Average Vent Flow (fpm)'
                  value={averageVentFlow}
                  rows={1}
                />
              </FormControl>
            </Grid>
            {props.selectedVent.type === 'Battery Room' &&
            <Grid>
              <Typography>Room Dimensions</Typography>
                <TextField
                name='roomHeight'
                id='outlined-multiline-static'
                label={`Height (in.)`}
                value={roomDimensions[0]}
                rows={1}
                onChange={handleRoomDimensions}
                />
                <TextField
                name='roomWidth'
                id='outlined-multiline-static'
                label={`Width (in.)`}
                value={roomDimensions[1]}
                rows={1}
                onChange={handleRoomDimensions}
                />
                <TextField
                name='roomLength'
                id='outlined-multiline-static'
                label={`Length (in.)`}
                value={roomDimensions[2]}
                rows={1}
                onChange={handleRoomDimensions}
                />
                <FormControl>
                  <TextField
                    name='roomVolume'
                    id='outlined-multiline-static'
                    label='room Volume (cu ft)'
                    value={roomVolume}
                    rows={1}
                    />
                </FormControl>
            <Grid item>
            <Typography>Vent Dimensions</Typography>
              {props.selectedVent.ventShape === 'Circular' ?
              <Grid>
                <TextField
                name='diameter'
                id='outlined-multiline-static'
                label={`Diameter (in.)`}
                value={ventDimensions[0]}
                rows={1}
                onChange={handleVentArea}
                />
              </Grid>
              :
              <Grid>
                <TextField
                name='ventWidth'
                id='outlined-multiline-static'
                label={`Width (in.)`}
                value={ventDimensions[0]}
                rows={1}
                onChange={handleRoomDimensions}
                />
                <TextField
                name='ventLength'
                id='outlined-multiline-static'
                label={`Length (in.)`}
                value={roomDimensions[1]}
                rows={1}
                onChange={handleRoomDimensions}
                />
              </Grid>
              }
                <FormControl>
                  <TextField
                    name='ventArea'
                    id='outlined-multiline-static'
                    label='Vent Area (cu ft)'
                    value={ventArea}
                    rows={1}
                    />
                </FormControl>
            </Grid>
              <Typography>Air Changes Per Hour</Typography>
                <FormControl>
                  <TextField
                    name='airChanges'
                    id='outlined-multiline-static'
                    value={airChanges}
                    rows={1}
                    />
                </FormControl>
                <Button onClick={handleAirChanges} variant="contained">Calculate</Button>
            </Grid>
            }
            <Grid item>
              <FormControl>
                <TextField
                  name='pass'
                  id='outlined-multiline-static'
                  label={'Pass/Fail'}
                  value={formValues.pass}
                  rows={1}
                />
              </FormControl>
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
  );
};
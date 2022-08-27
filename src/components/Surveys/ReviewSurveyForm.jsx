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
import ClassNameGenerator from '@mui/utils/ClassNameGenerator';

export default function ReviewSurveyForm(props) {
  let [ventFlowMeasurements, setVentFlowMeasurements] = useState(['']);
  let [averageVentFlow, setAverageVentFlow] = useState('');
  let [roomVolume, setRoomVolume] = useState('');
  let [ventArea, setVentArea] = useState('');
  const defaultFormValues = {
    equipmentId: props.selectedVentSurvey.equipmentId,
    equipment: '',
    airChanges: props.selectedVentSurvey.airChanges,
    expirationDate: props.selectedVentSurvey.expirationDate,
    surveyDate: props.selectedVentSurvey.surveyDate,
    ventId: props.selectedVentSurvey.ventId,
    pass: props.selectedVentSurvey.pass,
    distanceFromVent: props.selectedVentSurvey.distanceFromVent,
    technicianId: props.selectedVentSurvey.technician.technicianId,
    completedBy: `${props.selectedVentSurvey.technician.technicianRank} ${props.selectedVentSurvey.technician.lastName}, ${props.selectedVentSurvey.technician.firstName}`,
    status: props.selectedVentSurvey.status
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
  //This is for the actual vent flow and not the dimensions of the vent
  const handleVentMeasurements = (index, e) => {
    let value = e.target.value
    let newVentFlowMeasurements = ventFlowMeasurements;
    newVentFlowMeasurements[index] = parseInt(value)
    const sum = newVentFlowMeasurements.reduce((prev, current) => prev + current);
    let average = Math.round(sum/newVentFlowMeasurements.length)
    setAverageVentFlow(average);
    setVentFlowMeasurements([...newVentFlowMeasurements]);
    // passCheck(newVentFlowMeasurements,average)
    if(props.selectedVentSurvey.vent.type === 'Battery Room'){
      let ventCuFtPerHour = average * ventArea * 60
      let airChangesPerHour = ventCuFtPerHour /roomVolume;
      let roundedAirChanges = Math.round((airChangesPerHour + Number.EPSILON) * 10) / 10;
      if(roundedAirChanges >= 6){
        setFormValues({
          ...formValues,
          pass: 'Pass',
          airChanges: roundedAirChanges
        });
      }
      else{
        setFormValues({
          ...formValues,
          pass: 'Fail',
          airChanges: roundedAirChanges
        });
      };
    };
    if(props.selectedVentSurvey.vent.type === 'Fume Hood'){
      let lowFlows = []
      let failFlow = newVentFlowMeasurements.every(flow => flow >= 75)
      for(let i = 0; newVentFlowMeasurements.length > i; i++){
        if(newVentFlowMeasurements[i] < 100){
          lowFlows.push(newVentFlowMeasurements[i])
        };
      };
      if(lowFlows.length < 2 && average > 99 && failFlow === true){
        setVentFlowMeasurements([...newVentFlowMeasurements]);
        setFormValues({...formValues, ventReadings: [...newVentFlowMeasurements], pass: 'Pass'});
      }
      else{
        setVentFlowMeasurements([...newVentFlowMeasurements]);
        setFormValues({...formValues, ventReadings: [...newVentFlowMeasurements], pass: 'Fail'});
      };
    };
    if(props.selectedVentSurvey.vent.type === 'Welding Hood'){
      if(average > 99){
        setVentFlowMeasurements([...newVentFlowMeasurements]);
        setFormValues({...formValues, ventReadings: [...newVentFlowMeasurements], pass: 'Pass'});
      }
      else{
        setVentFlowMeasurements([...newVentFlowMeasurements]);
        setFormValues({...formValues, ventReadings: [...newVentFlowMeasurements], pass: 'Fail'});
      };
    };
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

  const handleCancel = () => {
    setFormValues(defaultFormValues);
    props.setShow({
      ...props.show,
      ventSurveyList: true,
      completeSurvey: false,
    });
    props.selectedVentSurvey([]);
  };

  const onSubmit = async (e) => {
    // new Date().toISOString().split('T')[0]
    e.preventDefault();
		await axios.put(
			`${process.env.REACT_APP_DATABASE}/ventSurvey/${props.selectedVentSurvey.ventSurveyId}`,
			formValues,
		);
    Promise.all(ventFlowMeasurements.map((ventFlow) => axios.post(
      `${process.env.REACT_APP_DATABASE}/ventSurveyMeasurements`,
			{ventMeasurement: ventFlow, ventSurveyId: props.selectedVentSurvey.ventSurveyId},
    )))

    setFormValues(defaultFormValues);
    props.setShow({
      ...props.show,
      ventSurveyList: true,
      completeSurvey: false,
    });
    props.setSelectedVentSurvey([]);
  };
  const setForm = async () => {
    let equipmentName = ''
    props.equipment.map((equipment) => equipment.equipmentId = props.selectedVentSurvey.equipmentId ? equipmentName = `${equipment.manufacturer} ${equipment.model} ${equipment.serialNumber}` : equipmentName ='')
    setFormValues({
      ...formValues,
      equipment: equipmentName
    });

  };
  
  useEffect(()=> {
    setForm();
  }, []);
  console.log(formValues)
  console.log(props.selectedVentSurvey)
  return (
    <Box>
      <Paper>
        <Typography>Review Survey</Typography>
        <Grid>
          <form onSubmit={onSubmit}>
            <Grid>
              <Grid item>
                <FormControl>
                  <TextField
                    name='equipment'
                    id='outlined-multiline-static'
                    label='Equipment'
                    value={formValues.equipment}
                    rows={1}
                  />
                </FormControl>
              </Grid>
              <Grid item>
              <FormControl>
                <TextField
                  name='surveyDate'
                  id='outlined-multiline-static'
                  label='Survey Date'
                  value={formValues.surveyDate}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
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
            {props.selectedVentSurvey.vent.type !== 'Welding Hood' &&
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
            }
            {props.selectedVentSurvey.vent.type === 'Welding Hood' &&
            <Grid item>
              <FormControl>
                <TextField
                  name='distanceFromVent'
                  id='outlined-multiline-static'
                  label='Distance from Vent (in.)'
                  value={formValues.distanceFromVent}
                  onChange={handleChange}
                  rows={1}
                />
              </FormControl>
            </Grid>
            }
            {props.selectedVentSurvey.vent.type === 'Battery Room' &&
            <Grid>
              <Typography>Room Dimensions</Typography>
                <TextField
                name='roomHeight'
                id='outlined-multiline-static'
                label={`Height (in.)`}
                value={props.selectedVentSurvey.vent.roomHeight}
                rows={1}
                />
                <TextField
                name='roomWidth'
                id='outlined-multiline-static'
                label={`Width (in.)`}
                value={props.selectedVentSurvey.vent.roomWidth}
                rows={1}
                />
                <TextField
                name='roomLength'
                id='outlined-multiline-static'
                label={`Length (in.)`}
                value={props.selectedVentSurvey.vent.roomLength}
                rows={1}
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
              {props.selectedVentSurvey.vent.ventShape === 'Circular' ?
              <Grid>
                <TextField
                name='diameter'
                id='outlined-multiline-static'
                label={`Diameter (in.)`}
                value={props.selectedVentSurvey.vent.ventDimension1}
                rows={1}
                />
              </Grid>
              :
              <Grid>
                <TextField
                name='ventWidth'
                id='outlined-multiline-static'
                label={`Width (in.)`}
                value={props.selectedVentSurvey.vent.ventDimension1}
                rows={1}
                />
                <TextField
                name='ventLength'
                id='outlined-multiline-static'
                label={`Length (in.)`}
                value={props.selectedVentSurvey.vent.ventDimension2}
                rows={1}
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
                    value={formValues.airChanges}
                    rows={1}
                    />
                </FormControl>
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
              <FormControl>
                <TextField
                  name='completedBy'
                  id='outlined-multiline-static'
                  label={'Completed By'}
                  value={formValues.completedBy}
                  rows={1}
                />
              </FormControl>
            </Grid>
            <Grid item>
                  <FormControl>
                    <InputLabel id='demo-simple-select-label'>
                      Status
                    </InputLabel>
                    <Select
                      name='status'
                      value={formValues.status}
                      onChange={handleChange}
                    >
                      <MenuItem value={'In Progress'}>In Progress</MenuItem>
                      <MenuItem value={'Ready For QA'}>Ready For QA</MenuItem>
                      <MenuItem value={'Approved'}>Approved</MenuItem>
                    </Select>
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
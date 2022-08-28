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

export default function CompleteSurveyForm(props) {
  let [ventFlowMeasurements, setVentFlowMeasurements] = useState(['']);
  let [averageVentFlow, setAverageVentFlow] = useState('');
  let [roomVolume, setRoomVolume] = useState('');
  let [ventArea, setVentArea] = useState('');
  const defaultFormValues = {
    ventSurveyId: props.selectedVentSurvey.ventSurvey.ventSurveyId,
    equipmentId: '',
    equipment: '',
    airChanges: '',
    expirationDate: '',
    surveyDate: new Date().toISOString().split('T')[0],
    ventId: props.selectedVentSurvey.ventSurvey.ventId,
    pass: '',
    distanceFromVent: '',
    technicianId: props.selectedVentSurvey.ventSurvey.technician.technicianId,
    completedBy: `${props.selectedVentSurvey.ventSurvey.technician.technicianRank} ${props.selectedVentSurvey.ventSurvey.technician.lastName}, ${props.selectedVentSurvey.ventSurvey.technician.firstName}`,
    status: props.selectedVentSurvey.ventSurvey.status
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
    if(props.selectedVentSurvey.ventSurvey.vent.type === 'Battery Room'){
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
    if(props.selectedVentSurvey.ventSurvey.vent.type === 'Fume Hood'){
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
    if(props.selectedVentSurvey.ventSurvey.vent.type === 'Welding Hood'){
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
    props.setSelectedVentSurvey([]);
  };

  const onSubmit = async (e) => {
    // new Date().toISOString().split('T')[0]
    try{
    e.preventDefault();
		await axios.put(
			`${process.env.REACT_APP_DATABASE}/ventSurvey/${formValues.ventSurveyId}`,
			formValues,
		);
    console.log('we here')
    Promise.all(ventFlowMeasurements.map((ventFlow) => axios.post(
      `${process.env.REACT_APP_DATABASE}/ventSurveyMeasurements`,
			{ventMeasurement: ventFlow, ventSurveyId: formValues.ventSurveyId},
    )))
    console.log('here')
    setFormValues([]);
    props.setShow({
      ...props.show,
      ventSurveyList: true,
      completeSurvey: false,
    });
    props.setSelectedVentSurvey([]);
    }
    catch(e){
      console.log(e)
    }
  };
  const getEquipment = async () =>{
    let equipmentList= await axios.get(`${process.env.REACT_APP_DATABASE}/equipment`)
    props.setEquipment(equipmentList.data)
    let surveyDate = new Date();
    if(props.selectedVentSurvey.ventSurvey.vent.surveyFrequency === 'Quarterly'){
      setFormValues({...formValues, expirationDate: new Date(surveyDate.setMonth(surveyDate.getMonth()+3)).toISOString().split('T')[0]})
    }
    else if (props.selectedVentSurvey.ventSurvey.vent.surveyFrequency === 'Semi Annually'){
      setFormValues({...formValues, expirationDate: new Date(surveyDate.setMonth(surveyDate.getMonth()+6)).toISOString().split('T')[0]})
    }
    else if (props.selectedVentSurvey.ventSurvey.vent.surveyFrequency === 'Annually'){
      setFormValues({...formValues, expirationDate: new Date(surveyDate.setMonth(surveyDate.getMonth()+12)).toISOString().split('T')[0]})
    }
    let volume = Math.round((props.selectedVentSurvey.ventSurvey.vent.roomHeight * props.selectedVentSurvey.ventSurvey.vent.roomWidth * props.selectedVentSurvey.ventSurvey.vent.roomLength)/1728)
    setRoomVolume(volume);
    
    if(props.selectedVentSurvey.ventSurvey.vent.ventShape === 'Square'){
      let area = Math.round((props.selectedVentSurvey.ventSurvey.vent.ventDimension1 * props.selectedVentSurvey.ventSurvey.vent.ventDimension2)/144)
      setVentArea(area)
    }
    else{
      let area = props.selectedVentSurvey.ventSurvey.vent.ventDimension1/2 * props.selectedVentSurvey.ventSurvey.vent.ventDimension1/2 * Math.PI /144;
      let areaRounded = Math.round((area + Number.EPSILON) * 100) / 100;
      setVentArea(areaRounded);
    }
  };
  
  useEffect(()=> {
    getEquipment();
  }, []);
  console.log(formValues)
  console.log(props.selectedVentSurvey)
  return (
    <Box>
      <Paper>
        <Typography>Vent Survey</Typography>
        <Grid>
          <form onSubmit={onSubmit}>
            <Grid>
              <Grid item>
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
            {props.selectedVentSurvey.ventSurvey.vent.type !== 'Welding Hood' &&
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
            {props.selectedVentSurvey.ventSurvey.vent.type === 'Welding Hood' &&
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
            {props.selectedVentSurvey.ventSurvey.vent.type === 'Battery Room' &&
            <Grid>
              <Typography>Room Dimensions</Typography>
                <TextField
                name='roomHeight'
                id='outlined-multiline-static'
                label={`Height (in.)`}
                value={props.selectedVentSurvey.ventSurvey.vent.roomHeight}
                rows={1}
                />
                <TextField
                name='roomWidth'
                id='outlined-multiline-static'
                label={`Width (in.)`}
                value={props.selectedVentSurvey.ventSurvey.vent.roomWidth}
                rows={1}
                />
                <TextField
                name='roomLength'
                id='outlined-multiline-static'
                label={`Length (in.)`}
                value={props.selectedVentSurvey.ventSurvey.vent.roomLength}
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
              {props.selectedVentSurvey.ventSurvey.vent.ventShape === 'Circular' ?
              <Grid>
                <TextField
                name='diameter'
                id='outlined-multiline-static'
                label={`Diameter (in.)`}
                value={props.selectedVentSurvey.ventSurvey.vent.ventDimension1}
                rows={1}
                />
              </Grid>
              :
              <Grid>
                <TextField
                name='ventWidth'
                id='outlined-multiline-static'
                label={`Width (in.)`}
                value={props.selectedVentSurvey.ventSurvey.vent.ventDimension1}
                rows={1}
                />
                <TextField
                name='ventLength'
                id='outlined-multiline-static'
                label={`Length (in.)`}
                value={props.selectedVentSurvey.ventSurvey.vent.ventDimension2}
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
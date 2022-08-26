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
    equipmentId: '',
    equipment: '',
    airChanges: '',
    expirationDate: '',
    surveyDate: new Date().toISOString().split('T')[0],
    ventId: props.selectedVentSurvey.ventId,
    pass: '',
    distanceFromVent: '',
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
      console.log('in here now')
      let ventCuFtPerHour = average * ventArea * 60
      let airChangesPerHour = ventCuFtPerHour /roomVolume;
      let roundedAirChanges = Math.round((airChangesPerHour + Number.EPSILON) * 10) / 10;
      if(roundedAirChanges >= 6){
        console.log('in the rounded air changes if')
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
        console.log('in here')
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
    // else{
    //   setVentFlowMeasurements([...newVentFlowMeasurements]);
    //   setFormValues({...formValues, ventReadings: [...newVentFlowMeasurements]})
    //   setAverageVentFlow(average);
    // }
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

// Room dimensions are set on the vent info form. Vent dimensions have been moved from the vent survey model to vent model.
//Unsure whether I want to set room dimensions on this form as they should not change

// const handleRoomDimensions = (e) => {
//   const { name, value } = e.target;
//   if(name === 'roomHeight'){
//     let newRoomDimensions = roomDimensions;
//     newRoomDimensions[0] = parseInt(value);
//     setRoomDimensions([...newRoomDimensions]);
//     if(roomDimensions.every(e => typeof e === 'number')){
//       let volume = newRoomDimensions.reduce((prev, current) => prev * current);
//       let sqFtVolume = Math.round(volume/1728)
//       setRoomVolume(sqFtVolume);
//     };
//   }
//   else if(name === 'roomWidth'){
//     let newRoomDimensions = roomDimensions;
//     newRoomDimensions[1] = parseInt(value);
//     setRoomDimensions([...newRoomDimensions]);
//     if(roomDimensions.every(e => typeof e === 'number')){
//       let volume = newRoomDimensions.reduce((prev, current) => prev * current);
//       let sqFtVolume = Math.round(volume/1728)
//       setRoomVolume(sqFtVolume);
//     };
//   }
//   else if(name === 'roomLength'){
//     let newRoomDimensions = roomDimensions;
//     newRoomDimensions[2] = parseInt(value);
//     setRoomDimensions([...newRoomDimensions]);
//     console.log(newRoomDimensions.every(e => e === true))
//     if(roomDimensions.every(e => typeof e === 'number')){
//       let volume = newRoomDimensions.reduce((prev, current) => prev * current)
//       let sqFtVolume = Math.round(volume/1728)
//       setRoomVolume(sqFtVolume);
//     };
//   };
// };
  // const handleVentArea = (e) => {
  //   if(!e.target.value){
  //     console.log('in here')
  //     setVentDimensions([0,0])
  //     setVentArea(0)
  //   }
  //   else if(props.selectedVent.ventShape === 'Circular'){
  //     const diameter = e.target.value;
  //     let newVentDimensions = ventDimensions
  //     newVentDimensions[0] = parseInt(diameter)
  //     setVentDimensions([...newVentDimensions])
  //     let area = diameter/2 * diameter/2 * Math.PI /144;
  //     let areaRounded = Math.round((area + Number.EPSILON) * 100) / 100;
  //     setVentArea(areaRounded);
  //   }
  // };

  // const handleAirChanges = () => {
  //   console.log('hello')
  //   if(averageVentFlow){
  //     console.log(averageVentFlow, ventArea, roomVolume);
  //     let ventCuFtPerHour = averageVentFlow * ventArea * 60
  //     let airChangesPerHour = ventCuFtPerHour /roomVolume;
  //     let roundedAirChanges = Math.round((airChangesPerHour + Number.EPSILON) * 10) / 10;
  //     setAirChanges(roundedAirChanges);
  //   };
  // };
  
  // const passCheck = (flows, average) => {
  //   let lowFlows = []
  //   let failFlow = flows.every(el => el < 75)
  //   for(let i = 0; flows.length > i; i++){
  //     if(flows[i] < 100){
  //       lowFlows.push(flows[i])
  //     }
  //   }

  //   if(lowFlows.length < 2 && average > 99 && failFlow === false){
  //     console.log('in the if')
  //     setFormValues({...formValues, pass: true})
  //   }
  //   else{
  //     console.log('in the else')
  //     setFormValues({...formValues, pass: false})
  //   }
  // };

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
  const getEquipment = async () =>{
    let equipmentList= await axios.get(`${process.env.REACT_APP_DATABASE}/equipment`)
    props.setEquipment(equipmentList.data)
    let surveyDate = new Date();
    if(props.selectedVentSurvey.vent.surveyFrequency === 'Quarterly'){
      setFormValues({...formValues, expirationDate: new Date(surveyDate.setMonth(surveyDate.getMonth()+3)).toISOString().split('T')[0]})
    }
    else if (props.selectedVentSurvey.vent.surveyFrequency === 'Semi Annually'){
      setFormValues({...formValues, expirationDate: new Date(surveyDate.setMonth(surveyDate.getMonth()+6)).toISOString().split('T')[0]})
    }
    else if (props.selectedVentSurvey.vent.surveyFrequency === 'Annually'){
      setFormValues({...formValues, expirationDate: new Date(surveyDate.setMonth(surveyDate.getMonth()+12)).toISOString().split('T')[0]})
    }
    let volume = Math.round((props.selectedVentSurvey.vent.roomHeight * props.selectedVentSurvey.vent.roomWidth * props.selectedVentSurvey.vent.roomLength)/1728)
    setRoomVolume(volume);
    
    if(props.selectedVentSurvey.vent.ventShape === 'Square'){
      let area = Math.round((props.selectedVentSurvey.vent.ventDimension1 * props.selectedVentSurvey.vent.ventDimension2)/144)
      setVentArea(area)
    }
    else{
      let area = props.selectedVentSurvey.vent.ventDimension1/2 * props.selectedVentSurvey.vent.ventDimension1/2 * Math.PI /144;
      let areaRounded = Math.round((area + Number.EPSILON) * 100) / 100;
      setVentArea(areaRounded);
    }
  };
  
  useEffect(()=> {
    getEquipment();
  }, []);
  console.log(props.selectedVentSurvey.vent.type)
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
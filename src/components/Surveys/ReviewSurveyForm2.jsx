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
    equipmentId: props.equipment[0].equipmentId,
    equipment: props.equipment[0].equipment,
    completedBy: `${props.selectedVentSurvey.ventSurvey.technician.technicianRank} ${props.selectedVentSurvey.ventSurvey.technician.lastName}, ${props.selectedVentSurvey.ventSurvey.technician.firstName}`,
  }
  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    var regEx = /^\d{4}-\d{2}-\d{2}$/
    let expirationDate = '';
    let surveyDate = '';
    let status = props.selectedVentSurvey.ventSurvey.status
    let ventShape = props.selectedVentSurvey.ventSurvey.vent.ventShape;
    if(name === 'surveyDate' && value.match(regEx)){
      let from = value.split('-')
      let convertedDate = new Date(from[0], from[1]-1, from[2] )
      surveyDate = convertedDate
    }
    else if(name === 'surveyDate' && !value.match(regEx)){
      surveyDate = value
    }
    
    if(props.selectedVentSurvey.ventSurvey.vent.surveyFrequency === 'Quarterly' && value.match(regEx)){
      expirationDate = new Date(surveyDate.setMonth(surveyDate.getMonth()+3)).toISOString().split('T')[0]
    }
    else if (props.selectedVentSurvey.ventSurvey.vent.surveyFrequency === 'Semi Annually' && value.match(regEx)){
      expirationDate = new Date(surveyDate.setMonth(surveyDate.getMonth()+6)).toISOString().split('T')[0]
    }
    else if (props.selectedVentSurvey.ventSurvey.vent.surveyFrequency === 'Annually' && value.match(regEx)){
      console.log('in the else if')
      expirationDate = new Date(surveyDate.setMonth(surveyDate.getMonth()+12)).toISOString().split('T')[0]
    };

    if(name === 'surveyDate'){
      surveyDate = value
    }
    else{
      surveyDate = props.selectedVentSurvey.ventSurvey.surveyDate
    };

    if(name === 'ventShape'){
      ventShape = value
    }

    if(name === 'status'){
      status = value
    }

    props.setSelectedVentSurvey({
      ventMeasurements: [
        ...props.selectedVentSurvey.ventMeasurements,
      ],
      ventSurvey: {
        ...props.selectedVentSurvey.ventSurvey,
        surveyDate: surveyDate,
        expirationDate: expirationDate,
        status: status,
        vent: {
          ...props.selectedVentSurvey.ventSurvey.vent,
          ventShape: ventShape
        }
      }
    });
  };

  const handleDimensions = async (e) => {
    let { name, value } = e.target;
    if(value === ''){
      value = 0
    }
    if(name === 'roomLength'){
      props.setSelectedVentSurvey({
        ventMeasurements: [
          ...props.selectedVentSurvey.ventMeasurements,
        ],
        ventSurvey: {
          ...props.selectedVentSurvey.ventSurvey,
          vent: {
            ...props.selectedVentSurvey.ventSurvey.vent,
            roomLength: parseInt(value)
          }
        }
      });
    }
    else if(name === 'roomWidth'){
      props.setSelectedVentSurvey({
        ventMeasurements: [
          ...props.selectedVentSurvey.ventMeasurements,
        ],
        ventSurvey: {
          ...props.selectedVentSurvey.ventSurvey,
          vent: {
            ...props.selectedVentSurvey.ventSurvey.vent,
            roomWidth: parseInt(value)
          }
        }
      });
    }
    else if(name === 'roomHeight'){
      props.setSelectedVentSurvey({
        ventMeasurements: [
          ...props.selectedVentSurvey.ventMeasurements,
        ],
        ventSurvey: {
          ...props.selectedVentSurvey.ventSurvey,
          vent: {
            ...props.selectedVentSurvey.ventSurvey.vent,
            roomHeight: parseInt(value)
          }
        }
      });
    }
    else if(name === 'ventDimension1'){
      props.setSelectedVentSurvey({
        ventMeasurements: [
          ...props.selectedVentSurvey.ventMeasurements,
        ],
        ventSurvey: {
          ...props.selectedVentSurvey.ventSurvey,
          vent: {
            ...props.selectedVentSurvey.ventSurvey.vent,
            ventDimension1: parseInt(value)
          }
        }
      });
    }
    else if(name === 'ventDimension2'){
      console.log(parseInt(value))
      props.setSelectedVentSurvey({
        ventMeasurements: [
          ...props.selectedVentSurvey.ventMeasurements,
        ],
        ventSurvey: {
          ...props.selectedVentSurvey.ventSurvey,
          vent: {
            ...props.selectedVentSurvey.ventSurvey.vent,
            ventDimension2: parseInt(value)
          }
        }
      });
    }
  };

  const handleEquipmentSelect = (equipment) => {
    props.setSelectedVentSurvey({
      ...props.selectedVentSurvey,
      ventSurvey: {
        ...props.selectedVentSurvey.ventSurvey,
        equipmentId: equipment.equipmentId,
        equipment: equipment.equipment
      }
    })
    setFormValues({
      ...formValues,
      equipmentId: equipment.equipmentId,
      equipment: equipment.equipment
    })
  }

  const handleTechnicianSelect = (technician) => {
    props.setSelectedVentSurvey({
      ...props.selectedVentSurvey,
      ventSurvey: {
        ...props.selectedVentSurvey.ventSurvey,
        technicianId: technician.technicianId,
        technician: {
          ...props.selectedVentSurvey.ventSurvey.technician,
          technicianId: technician.technicianId,
          firstName: technician.firstName,
          lastName: technician.lastName,
          middleName: technician.middleName,
          technicianEmail: technician.technicianEmail,
          technicianRank: technician.technicianRank,
          technicianRole: technician.technicianRole
        }
      }
    })
    setFormValues({
      ...formValues,
      technicianId: technician.technicianId,
      completedBy: `${technician.technicianRank} ${technician.lastName}, ${technician.firstName}`
    })
  }
  //This is for the actual vent flow and not the dimensions of the vent
  const handleVentMeasurements = (index, e) => {
    let value = e.target.value;

    if(value === ''){
      value = 0
    };

    let newVentFlowMeasurements = ventFlowMeasurements;
    newVentFlowMeasurements[index] = parseInt(value);
    const sum = newVentFlowMeasurements.reduce((prev, current) => prev + current);
    let average = Math.round(sum/newVentFlowMeasurements.length);
    let airChanges = checkAirChanges(roomVolume, average, ventArea);
    setAverageVentFlow(average);
    props.setSelectedVentSurvey({
      ventSurvey:{
        ...props.selectedVentSurvey.ventSurvey,
        airChanges: airChanges.airChanges,
        pass: airChanges.pass
      },
      ventMeasurements: [...newVentFlowMeasurements]
    });

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
        // setFormValues({...formValues, ventReadings: [...newVentFlowMeasurements], pass: 'Pass'});
      }
      else{
        setVentFlowMeasurements([...newVentFlowMeasurements]);
        // setFormValues({...formValues, ventReadings: [...newVentFlowMeasurements], pass: 'Fail'});
      };
    };
    if(props.selectedVentSurvey.ventSurvey.vent.type === 'Welding Hood'){
      if(average > 99){
        setVentFlowMeasurements([...newVentFlowMeasurements]);
        // setFormValues({...formValues, ventReadings: [...newVentFlowMeasurements], pass: 'Pass'});
      }
      else{
        setVentFlowMeasurements([...newVentFlowMeasurements]);
        // setFormValues({...formValues, ventReadings: [...newVentFlowMeasurements], pass: 'Fail'});
      };
    };
  };

  const handleNewVentFlow = () => {
    let newVentFlowMeasurements = props.selectedVentSurvey.ventMeasurements;
    newVentFlowMeasurements.push('');
    props.setSelectedVentSurvey({
      ventSurvey:{
        ...props.selectedVentSurvey.ventSurvey
      },
      ventMeasurements: [...newVentFlowMeasurements]
    });
  };

  const handleRemoveVentFlow = (flow) => {
    let newVentFlowMeasurements = ventFlowMeasurements;
    newVentFlowMeasurements.splice(flow, 1);
    const sum = newVentFlowMeasurements.reduce((prev, current) => prev + current);
    props.setSelectedVentSurvey({
      ventSurvey:{
        ...props.selectedVentSurvey.ventSurvey
      },
      ventMeasurements: [...newVentFlowMeasurements]
    });
    setAverageVentFlow(Math.round(sum/newVentFlowMeasurements.length));
  };

  const checkAirChanges = (volume, area, ventFlow) => {
    let airChanges = 0;
    let pass = '';
    if(props.selectedVentSurvey.ventSurvey.vent.type === 'Battery Room'){
      let ventCuFtPerHour = ventFlow * area * 60
      let airChangesPerHour = ventCuFtPerHour /volume;
      let roundedAirChanges = Math.round((airChangesPerHour + Number.EPSILON) * 10) / 10;
      if(roundedAirChanges >= 6){
        pass = 'Pass'
        airChanges = roundedAirChanges
      }
      else if(roundedAirChanges < 6){
        pass = 'Fail'
        airChanges = roundedAirChanges
      };
    };
    return {airChanges, pass};
  }

  const handleCancel = () => {
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
    console.log(props.selectedVentSurvey.ventSurveyId, props.selectedVentSurvey.ventSurvey.vent.ventId)
		await axios.put(
			`${process.env.REACT_APP_DATABASE}/ventSurvey/${props.selectedVentSurvey.ventSurvey.ventSurveyId}`,
      props.selectedVentSurvey.ventSurvey
		);
    await axios.put(
			`${process.env.REACT_APP_DATABASE}/vents/${props.selectedVentSurvey.ventSurvey.vent.ventId}`,
      props.selectedVentSurvey.ventSurvey.vent
			// {
      //   roomHeight: props.selectedVentSurvey.ventSurvey.vent.roomHeight,
      //   roomLength: props.selectedVentSurvey.ventSurvey.vent.roomLength,
      //   roomWidth: props.selectedVentSurvey.ventSurvey.vent.roomWidth
      // }
		);
    Promise.all(props.selectedVentSurvey.ventMeasurements.map((ventFlow) => axios.post(
      `${process.env.REACT_APP_DATABASE}/ventSurveyMeasurements`,
			{ventMeasurement: ventFlow, ventSurveyId: props.selectedVentSurvey.ventSurveyId},
    )))
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
  
  const getEquipment = async () => {
    
    let equipmentId = '';
    let equipment = '';
    let setArea = 0;
    let ventMeasurements = props.selectedVentSurvey.ventMeasurements;
    if (props.selectedVentSurvey.ventMeasurements.length === 0){
      ventMeasurements = ['']
    }
    if(props.selectedVentSurvey.ventSurvey.vent.ventShape === 'Square'){
      console.log(props.selectedVentSurvey.ventSurvey.vent.ventDimension1, props.selectedVentSurvey.ventSurvey.vent.ventDimension2)
      let area = (props.selectedVentSurvey.ventSurvey.vent.ventDimension1 * props.selectedVentSurvey.ventSurvey.vent.ventDimension2)/144
      setArea = Math.round((area + Number.EPSILON) * 100) / 100;
    }
    else if(props.selectedVentSurvey.ventSurvey.vent.ventShape === 'Circular'){
      let area = props.selectedVentSurvey.ventSurvey.vent.ventDimension1/2 * props.selectedVentSurvey.ventSurvey.vent.ventDimension1/2 * Math.PI /144;
      setArea = Math.round((area + Number.EPSILON) * 100) / 100;

    }
    if(props.selectedVentSurvey.equipmentId === undefined){
      equipmentId = props.equipment[0].equipmentId
      equipment = props.equipment[0].equipment
    }
    else{
      equipmentId = props.equipment[0].equipmentId
      equipment = props.equipment[0].equipment
    }
    let volume = Math.round((props.selectedVentSurvey.ventSurvey.vent.roomHeight * props.selectedVentSurvey.ventSurvey.vent.roomWidth * props.selectedVentSurvey.ventSurvey.vent.roomLength)/1728)
    let airChanges = checkAirChanges(volume, averageVentFlow, setArea)
    setRoomVolume(volume);
    setVentArea(setArea);

    props.setSelectedVentSurvey({
      ventMeasurements: [
        ...ventMeasurements
      ],
      ventSurvey: {
        ...props.selectedVentSurvey.ventSurvey,
        equipmentId: equipmentId,
        equipment: equipment,
        airChanges: airChanges.airChanges,
        pass: airChanges.pass
      }
    })
  };
  
  useEffect(()=> {
    let ignore = false;
    if (!ignore)  getEquipment()
    return () => { ignore = true; }
  }, [props.selectedVentSurvey.ventSurvey.vent, props.selectedVentSurvey.ventSurvey.technician]);
  console.log(props.selectedVentSurvey.ventSurvey.vent)
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
                  placeholder={'Select Equipment'}
                  >
                {props.equipment.map((equipment) => (
                  <MenuItem onClick={()=> handleEquipmentSelect(equipment)} key={equipment.equipmentId} value={equipment.equipment}>{equipment.equipment}</MenuItem>
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
                  value={props.selectedVentSurvey.ventSurvey.surveyDate}
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
                    value={props.selectedVentSurvey.ventSurvey.expirationDate}
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Typography>Vent Flows</Typography>
              {props.selectedVentSurvey.ventMeasurements !== null && (
              props.selectedVentSurvey.ventMeasurements.map((flow,index) => 
              <Grid key = {index}>
                <TextField
                name='ventFlow'
                id='outlined-multiline-static'
                label={`Vent Flow Measurement ${index+1} (fpm)`}
                value={props.selectedVentSurvey.ventMeasurements[index]}
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
              )
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
                  value={props.selectedVentSurvey.distanceFromVent}
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
                onChange={handleDimensions}
                />
                <TextField
                name='roomWidth'
                id='outlined-multiline-static'
                label={`Width (in.)`}
                value={props.selectedVentSurvey.ventSurvey.vent.roomWidth}
                rows={1}
                onChange={handleDimensions}
                />
                <TextField
                name='roomLength'
                id='outlined-multiline-static'
                label={`Length (in.)`}
                value={props.selectedVentSurvey.ventSurvey.vent.roomLength}
                rows={1}
                onChange={handleDimensions}
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
              <Grid item>
                <FormControl>
                  <InputLabel id='demo-simple-select-label'>
                    Vent Type
                  </InputLabel>
                  <Select
                    name='ventShape'
                    value={props.selectedVentSurvey.ventSurvey.vent.ventShape}
                    onChange={handleChange}
                  >
                    <MenuItem value={'Circular'}>Circular</MenuItem>
                    <MenuItem value={'Square'}>Square</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {props.selectedVentSurvey.ventSurvey.vent.ventShape === 'Circular' ?
              <Grid>
                <TextField
                name='ventDimension1'
                id='outlined-multiline-static'
                label={`Diameter (in.)`}
                value={props.selectedVentSurvey.ventSurvey.vent.ventDimension1}
                onChange={handleDimensions}
                rows={1}
                />
              </Grid>
              :
              <Grid>
                <TextField
                name='ventDimension1'
                id='outlined-multiline-static'
                label={`Width (in.)`}
                value={props.selectedVentSurvey.ventSurvey.vent.ventDimension1}
                onChange={handleDimensions}
                rows={1}
                />
                <TextField
                name='ventDimension2'
                id='outlined-multiline-static'
                label={`Length (in.)`}
                value={props.selectedVentSurvey.ventSurvey.vent.ventDimension2}
                onChange={handleDimensions}
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
                    value={props.selectedVentSurvey.ventSurvey.airChanges}
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
                  value={props.selectedVentSurvey.ventSurvey.pass}
                  rows={1}
                />
              </FormControl>
            </Grid>
            <Grid item>
            <FormControl>
                <InputLabel id='demo-simple-select-label'>
                  Completed By
                </InputLabel>
                <Select
                  name='completedBy'
                  value={formValues.completedBy}
                >
                {props.technicians.map((technician) => (
                  <MenuItem onClick={()=> handleTechnicianSelect(technician)} key={technician.technicianId} value={`${technician.technicianRank} ${technician.lastName}, ${technician.firstName}`}>{`${technician.technicianRank} ${technician.lastName}, ${technician.firstName}`}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel id='demo-simple-select-label'>
                  Status
                </InputLabel>
                <Select
                  name='status'
                  value={props.selectedVentSurvey.ventSurvey.status}
                  onChange={handleChange}
                >
                  <MenuItem value={'In Progress'}>In Progress</MenuItem>
                  <MenuItem value={'Ready For QA'}>Ready For QA</MenuItem>
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
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
    expirationDate: '',
    roomDimensions: '',
    surveyDate: new Date().toISOString().split('T')[0],
    ventDimensions: '',
    ventId: '',
    ventReadings: ''
  }
  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleVentMeasurements = (index, e) => {
    let value = e.target.value
    let newVentFlowMeasurements = ventFlowMeasurements;
    newVentFlowMeasurements[index] = parseInt(value)
    const sum = newVentFlowMeasurements.reduce((prev, current) => prev + current);
    setVentFlowMeasurements([...newVentFlowMeasurements]);
    setAverageVentFlow(Math.round(sum/newVentFlowMeasurements.length));
  };

  const handleNewVentFlow = () => {
    let newVentFlowMeasurements = ventFlowMeasurements;
    newVentFlowMeasurements.push('');
    console.log(newVentFlowMeasurements)
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
      console.log(newRoomDimensions.every(e => e === true))
      if(roomDimensions.every(e => typeof e === 'number')){
        let volume = newRoomDimensions.reduce((prev, current) => prev * current)
        let sqFtVolume = Math.round(volume/1728)
        setRoomVolume(sqFtVolume);
      };
    };
    
  };
  const handleVentArea = (e) => {
    if(!e.target.value){
      console.log('in here')
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
      console.log(averageVentFlow, ventArea, roomVolume);
      let ventCuFtPerHour = averageVentFlow * ventArea * 60
      let airChangesPerHour = ventCuFtPerHour /roomVolume;
      let roundedAirChanges = Math.round((airChangesPerHour + Number.EPSILON) * 10) / 10;
      setAirChanges(roundedAirChanges);
    }
  }

  const handleCancel = () => {
    setFormValues(defaultFormValues);
    props.setShow({
      ...props.show,
      ventInfo: true,
      addVentSurvey: false
    })
  };

  const onSubmit = async (e) => {
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

  return (
    <Box>
      <Paper>
        <Typography>New Vent Survey</Typography>
        <Grid>
          <form onSubmit={onSubmit}>
            <Grid>
              <FormControl fullWidth>
                <TextField
                  name='equipmentId'
                  id='outlined-multiline-static'
                  label='Survey Equipment'
                  rows={1}
                  onChange={handleChange}
                />
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
                  disabled
                  id='outlined-multiline-static'
                  label='Average Vent Flow (fpm)'
                  value={averageVentFlow}
                  rows={1}
                />
              </FormControl>
            </Grid>
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
                    disabled
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
                    disabled
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
                    disabled
                    id='outlined-multiline-static'
                    value={airChanges}
                    rows={1}
                  />
                </FormControl>
                <Button onClick={handleAirChanges} variant="contained">Calculate</Button>
            <Grid item>
              <Button type='submit' color='success' variant='contained'>
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
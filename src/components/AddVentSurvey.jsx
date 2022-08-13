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
  let [ventMeasurements, setVentMeasurements] = useState(['']);
  let [airChanges, setAirChanges] = useState('');
  let [roomDimensions, setRoomDimensions] = useState(['','','']);
  const [formValues, setFormValues] = useState({
    equipmentId: '',
    expirationDate: '',
    roomDimensions: '',
    surveyDate: new Date().toISOString().split('T')[0],
    ventDimensions: '',
    ventId: '',
    ventReadings: ''
  });

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
      setRoomDimensions([...newRoomDimensions])
      if(roomDimensions.every(e => typeof e === 'number')){
        let volume = newRoomDimensions.reduce((prev, current) => prev * current)
        setRoomVolume(volume)
      }
    }
    else if(name === 'roomWidth'){
      let newRoomDimensions = roomDimensions;
      newRoomDimensions[1] = parseInt(value);
      setRoomDimensions([...newRoomDimensions])
      if(roomDimensions.every(e => typeof e === 'number')){
        let volume = newRoomDimensions.reduce((prev, current) => prev * current)
        setRoomVolume(volume)
      }
    }
    else if(name === 'roomLength'){
      let newRoomDimensions = roomDimensions;
      newRoomDimensions[2] = parseInt(value);
      setRoomDimensions([...newRoomDimensions])
      console.log(newRoomDimensions.every(e => e === true))
      if(roomDimensions.every(e => typeof e === 'number')){
        let volume = newRoomDimensions.reduce((prev, current) => prev * current)
        setRoomVolume(volume)
      }
    }

  }

  const handleCancel = () => {
    setFormValues([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
		await axios.post(
			`${process.env.REACT_APP_DATABASE}/ventSurvey`,
			formValues,
			);
    setFormValues([]);
  };
  console.log(roomDimensions)
  return (
    <Box>
      <Paper>
        <Typography>Add Vent</Typography>
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
              <Typography>Vent Measurements</Typography>
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
                    label='room Volume (cu in)'
                    value={roomVolume}
                    rows={1}
                  />
                </FormControl>
            <Grid item>
            </Grid>
              <Typography>Air Changes Per Hour</Typography>
                <FormControl>
                  <TextField
                    name='airChanges'
                    disabled
                    id='outlined-multiline-static'
                    value={roomVolume}
                    rows={1}
                  />
                </FormControl>
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
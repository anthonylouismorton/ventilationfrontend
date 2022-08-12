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
  let [ventFlowMeasurements, setVentFlowMeasurements] = useState([''])
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
    console.log(newVentFlowMeasurements)
    setVentFlowMeasurements([...newVentFlowMeasurements]);
  };

  const handleNewVentFlow = () => {
    let newVentFlowMeasurements = ventFlowMeasurements;
    newVentFlowMeasurements.push('');
    console.log(newVentFlowMeasurements)
    setVentFlowMeasurements([...newVentFlowMeasurements]);
  };

  const handleRemoveVentFlow = (flow) => {
    console.log(flow)
    let newVentFlowMeasurements = ventFlowMeasurements;
    newVentFlowMeasurements.splice(flow, 1);
    console.log(newVentFlowMeasurements)
    setVentFlowMeasurements([...newVentFlowMeasurements]);
  };

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
  useEffect(() => {
    // first
  
    // return () => {
    //   second
    // }
  }, [])
  
  console.log(ventFlowMeasurements[0])
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
              <Grid>
                <TextField
                name='ventFlow'
                id='outlined-multiline-static'
                label={`Vent Flow Measurement ${index+1}`}
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
                <FormControl fullWidth>
                  <TextField
                    name='averageVentFlow'
                    disabled
                    id='outlined-multiline-static'
                    label='Average Vent Flow (fpm)'
                    value={ventFlowMeasurements}
                    rows={1}
                  />
                </FormControl>
              </Grid>
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
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

export default function AddVentSurveyForm(props) {
  let [ventFlows, setVentFlows] = useState(0);
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
  const handleVentMeasurements = (e) => {
    const measurement = e.target.value;
    setFormValues(parseInt(measurement));
  };

  const handleNewVentFlow =() => {
    let newVentFlowMeasurements = ventFlowMeasurements
    newVentFlowMeasurements.push('')
    let newFlows = ventFlows + 1
    setVentFlows(newFlows)
    setVentFlowMeasurements(newVentFlowMeasurements)
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
  console.log(ventFlowMeasurements)
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
              <Grid item>
                <FormControl>
                  <TextField
                    name='ventFlow'
                    id='outlined-multiline-static'
                    label='Vent Flow Measurement 1'
                    rows={1}
                    onChange={handleVentMeasurements}
                  />
                </FormControl>
                <Tooltip title="Add Measurement">
                  <IconButton onClick={handleNewVentFlow}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              {ventFlowMeasurements.map((flow,index) => 
                <TextField
                name='ventFlow'
                id='outlined-multiline-static'
                label={`Vent Flow Measurement ${index+2}`}
                rows={1}
                onChange={handleVentMeasurements}
              />
              )}
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
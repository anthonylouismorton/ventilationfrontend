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
  Modal
} from '@mui/material';

export default function AssignSurveyForm(props) {
  const defaultFormValues = {
    dueByDate: '',
    ventId: props.selectedVent.ventId,
    technicianId: '',
    assignedTechnician: ''
  }
  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setFormValues({...defaultFormValues});
    props.setShow({
      ...props.show,
      ventInfo: true,
      assignSurvey: false
    })
  };

  const onSubmit = async (e) => {
    e.preventDefault();
		await axios.post(
			`${process.env.REACT_APP_DATABASE}/ventSurvey`,
			formValues,
			);
    setFormValues({...defaultFormValues});
    props.setShow({
      ...props.show,
      ventInfo: true,
      assignSurvey: false
    })
  };
  const getTechs = async () =>{
    let techList= await axios.get(`${process.env.REACT_APP_DATABASE}/technician`)

    setFormValues({
      ...formValues, 
      assignedTechnician: `${techList.data[0].technicianRank} ${techList.data[0].lastName}, ${techList.data[0].firstName}`,
      technicianId: techList.data[0].technicianId
    })
    props.setTechnicians(techList.data)
  };

  const handleTechSelect = async (tech) => {
    setFormValues({
      ...formValues, 
      technicianId: tech.technicianId, 
      assignedTechnician: `${tech.technicianRank} ${tech.lastName}, ${tech.firstName}`,
    })
  }
  
  useEffect(()=> {
    getTechs();
  }, []);
  console.log(formValues)
  return (
    <Box>
      <Paper>
        <Typography>Assign Survey</Typography>
        <Grid>
          <form onSubmit={onSubmit}>
          <FormControl>
            <Select
            value={formValues.assignedTechnician}
            >
              {props.technicians.map((tech) => (
              <MenuItem key={tech.technicianId} onClick={() => handleTechSelect(tech)} value={`${tech.technicianRank} ${tech.lastName}, ${tech.firstName}`}>{`${tech.technicianRank} ${tech.lastName}, ${tech.firstName}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              name='dueByDate'
              id='outlined-multiline-static'
              label='Due By Date'
              placeholder='yyyy-mm-dd'
              value={formValues.dueByDate}
              rows={1}
              onChange={handleChange}
            />
          </FormControl>
          <Grid>
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
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
  InputLabel
} from '@mui/material';

export default function AssignSurveyForm(props) {
  const defaultFormValues = {
    dueByDate: '',
    ventId: props.selectedVent.ventId,
    technicianId: 0,
    assignedTechnician: '',
    coverageDate: ''
  }
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [coverages, setCoverages] = useState([]);
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
    let currentCoverage = ''
    if(props.selectedVent.surveyFrequency){
      let coverage = []
      let year = 22
      let today = new Date()

      for(let i = 0; 11 > i; i++){
        let quarter = 1
        let quarterString = 'Q'
        let yearString = '20'
        for(let j = 0; 4 > j; j++){
          let coverString = quarterString + quarter + ' ' + yearString + year
          quarter++
          coverage.push(coverString)
        }
        year++
      }
      let currentQuarter = '';
      coverage.forEach(x => {
        if(today.getMonth() >= 0 && today.getMonth() <= 2){
          currentQuarter = 'Q1'
        }
        else if(today.getMonth() >= 3 && today.getMonth() <= 5){
          currentQuarter = 'Q2'
        }
        else if(today.getMonth() >= 6 && today.getMonth()<= 8){
          currentQuarter = 'Q3'
        }
        else if(today.getMonth() >= 9 && today.getMonth() <= 11){
          currentQuarter = 'Q4'
        }
        if(x.includes(today.getFullYear()) && x.includes(currentQuarter)){
          currentCoverage = x
        }
      });
      setCoverages([...coverage])
    }
    
    // setFormValues({
    //   ...formValues, 
    //   assignedTechnician: `${techList.data[0].technicianRank} ${techList.data[0].lastName}, ${techList.data[0].firstName}`,
    //   technicianId: techList.data[0].technicianId
    // })
    props.setTechnicians(techList.data)
    setFormValues({
      ...formValues,
      coverageDate: currentCoverage
    });
  };

  const handleTechSelect = async (tech) => {
    setFormValues({
      ...formValues, 
      technicianId: tech.technicianId, 
      assignedTechnician: `${tech.technicianRank} ${tech.lastName}, ${tech.firstName}`,
    })
  }
  const handleCoverage = async (coverage) => {
    setFormValues({
      ...formValues, 
      coverageDate: coverage, 
    })
  }
  
  useEffect(()=> {
    getTechs();
  }, []);
  return (
    <Box>
      <Paper>
        <Typography>Assign Survey</Typography>
        <Grid>
          <form onSubmit={onSubmit}>
          <FormControl>
            <InputLabel id='demo-simple-select-label'>
              Assign Tech
            </InputLabel>
              <Select
              value={formValues.assignedTechnician}
              >
                {props.technicians.map((tech) => (
                <MenuItem key={tech.technicianId} onClick={() => handleTechSelect(tech)} value={`${tech.technicianRank} ${tech.lastName}, ${tech.firstName}`}>{`${tech.technicianRank} ${tech.lastName}, ${tech.firstName}`}</MenuItem>
                ))}
              </Select>
          </FormControl>
          <FormControl>
            <InputLabel id='demo-simple-select-label'>
              Coverage
            </InputLabel>
            <Select
            value={formValues.coverageDate}
            >
              {coverages.map((coverage) => (
              <MenuItem key={coverage} onClick={() => handleCoverage(coverage)} value={coverage}>{coverage}</MenuItem>
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
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
import { send } from '@emailjs/browser'
import { useNavigate } from 'react-router-dom';

export default function AssignSurveyForm(props) {
  const defaultFormValues = {
    dueByDate: '',
    ventId: props.selectedVent.ventId,
    technicianId: 0,
    assignedTechnician: '',
    coverageDate: '',
    assignedTechnicianEmail: ''
  }
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [coverages, setCoverages] = useState([]);
  const { setTechnicians, selectedVent } = props
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setFormValues({...defaultFormValues});
    navigate(-1)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
		let newVentSurvey = await axios.post(
      `${process.env.REACT_APP_DATABASE}/ventSurvey`,
			formValues,
			);
      let toSend = {
        to_name: formValues.assignedTechnician,
        to_email: formValues.assignedTechnicianEmail,
        message: `You have been assigned the ${formValues.coverageDate} ventilation survey for ${props.selectedUnit.WPID} ${props.selectedUnit.unitName} due by ${formValues.dueByDate}. Contact your program mananager if you have any questions.`,
        ventInfo: `Vent Information:`,
        ventSerialNumber: `Serial Number: ${props.selectedVent.serialNumber}`,
        ventDescription: `Vent Type: ${props.selectedVent.description}`,
        ventType: `Vent Type: ${props.selectedVent.type}`,
        ventManufacturerModel: `Manufacturer: ${props.selectedVent.manufacturer} Model: ${props.selectedVent.model}`,
        poc: `POC: ${props.selectedUnit.poc}, Phone: ${props.selectedUnit.phone}`,
        link: `http://localhost:3000/Surveys`
      }
      send(
        'service_kpczsow',
        'template_e6g6pnr',
        toSend,
        'SyddjlnFwc3jnKKv3'
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
      console.log(newVentSurvey)
    setFormValues({...defaultFormValues});
    navigate(-1)
  };

  const handleTechSelect = async (tech) => {
    console.log(tech)
    setFormValues({
      ...formValues, 
      technicianId: tech.technicianId, 
      assignedTechnician: `${tech.technicianRank} ${tech.lastName}, ${tech.firstName}`,
      assignedTechnicianEmail: tech.technicianEmail
    })
  }
  const handleCoverage = async (coverage) => {
    setFormValues({
      ...formValues, 
      coverageDate: coverage, 
    })
  }
  
  const getTechs = async () => {
    let techList= await axios.get(`${process.env.REACT_APP_DATABASE}/technician`)
    let currentCoverage = ''
    if(selectedVent.surveyFrequency){
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
    setTechnicians(techList.data)
    setFormValues({
      ...formValues,
      coverageDate: currentCoverage,
      technicianId: techList.data[0].technicianId,
      assignedTechnician: `${techList.data[0].technicianRank} ${techList.data[0].lastName}, ${techList.data[0].firstName}`,
      assignedTechnicianEmail: techList.data[0].technicianEmail
    });
  };
  useEffect(()=> {
    getTechs();
  }, []);
  console.log(formValues)
  console.log(props.selectedVent)
  console.log(props.selectedUnit)
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
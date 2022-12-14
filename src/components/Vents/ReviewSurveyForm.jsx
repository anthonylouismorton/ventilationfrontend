import React, { useState, useEffect, useContext } from 'react';
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
import { send } from '@emailjs/browser'
import { ProgramContext } from '../../context/program';
import { useNavigate } from 'react-router-dom';

export default function ReviewSurveyForm(props) {
  let equipment = useContext(ProgramContext);
  const navigate = useNavigate();
  let [averageVentFlow, setAverageVentFlow] = useState(0);
  let [roomVolume, setRoomVolume] = useState('');
  let [ventArea, setVentArea] = useState('');
  const defaultFormValues = {
    equipmentId: props.selectedVentSurvey.ventSurvey.equipmentId,
    equipment: `${equipment.equipment[0].manufacturer} ${equipment.equipment[0].model} ${equipment.equipment[0].serialNumber}`,
    weldingHoodMeasurement: {
      distanceFromVent: props.selectedVentSurvey.ventMeasurements[0].distanceFromVent, 
      ventMeasurement: props.selectedVentSurvey.ventMeasurements[0].ventMeasurement, 
      ventMeasurementId: props.selectedVentSurvey.ventMeasurements[0].ventMeasurementId, 
      ventSurveyId: props.selectedVentSurvey.ventSurvey.ventSurveyId}
  };
  const [formValues, setFormValues] = useState(defaultFormValues);
  const { setSelectedVentSurvey, selectedVentSurvey } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    let expirationDate = props.selectedVentSurvey.ventSurvey.expirationDate;
    let surveyDate = props.selectedVentSurvey.ventSurvey.surveyDate;
    let status = props.selectedVentSurvey.ventSurvey.status;
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

  const handleWeldingHood = async (e) => {
    let { name, value } = e.target;
    let newVentMeasurements = props.selectedVentSurvey.ventMeasurements
    if(value === ''){
      value = 0
    }
    if(name === 'weldingHoodMeasurement'){
      newVentMeasurements[0].ventMeasurement = parseInt(value)
    }
    else if(name === 'distanceFromVent'){
      newVentMeasurements[0].distanceFromVent = parseInt(value)
    }
    props.setSelectedVentSurvey({
      ventMeasurements: [
        ...newVentMeasurements
      ],
      ventSurvey: {
        ...props.selectedVentSurvey.ventSurvey,
      }
    });
    setFormValues({
      ...formValues, 
      weldingHoodMeasurement: {
        ...formValues.weldingHoodMeasurement, 
        ventMeasurement: newVentMeasurements[0].ventMeasurement,
        distanceFromVent: newVentMeasurements[0].distanceFromVent
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
    })
  }
  //This is for the actual vent flow and not the dimensions of the vent
  const handleVentMeasurements = (index, e) => {
    let value = e.target.value;
    if(value === ''){
      value = 0;
    };
    let newVentFlowMeasurements = props.selectedVentSurvey.ventMeasurements;
    newVentFlowMeasurements[index] = {...newVentFlowMeasurements[index], ventMeasurement: parseInt(value)};
    const sum = newVentFlowMeasurements.reduce((prev, current) => {
      return prev = prev + current.ventMeasurement
    }, 0);
    let average = Math.round(sum/newVentFlowMeasurements.length);
    setAverageVentFlow(average);
    
    if(props.selectedVentSurvey.ventSurvey.vent.type === 'Fume Hood' || props.selectedVentSurvey.ventSurvey.vent.type === 'Paint Booth'){
      let lowFlows = [];
      let failFlow = '';
      for(let i = 0; newVentFlowMeasurements.length > i; i++){
        console.log(newVentFlowMeasurements[i])
        if(newVentFlowMeasurements[i].ventMeasurement < 75){
          failFlow = true
        }
        else{
          failFlow = false
        }
        if(newVentFlowMeasurements[i].ventMeasurement < 100){
          lowFlows.push(newVentFlowMeasurements[i])
        };
      };
      if(lowFlows.length < 2 && average > 99 && failFlow === false){
        props.setSelectedVentSurvey({
          ventSurvey:{
            ...props.selectedVentSurvey.ventSurvey,
            pass: 'Pass'
          },
          ventMeasurements: [...newVentFlowMeasurements]
        });
      }
      else{
        props.setSelectedVentSurvey({
          ventSurvey:{
            ...props.selectedVentSurvey.ventSurvey,
            pass: 'Fail'
          },
          ventMeasurements: [...newVentFlowMeasurements]
        });
      };
    };
    if(props.selectedVentSurvey.ventSurvey.vent.type === 'Battery Room'){
      let airChanges = checkAirChanges(roomVolume, average, ventArea);
      props.setSelectedVentSurvey({
        ventSurvey:{
          ...props.selectedVentSurvey.ventSurvey,
          airChanges: airChanges.airChanges,
          pass: airChanges.pass
        },
        ventMeasurements: [...newVentFlowMeasurements]
      });
    };
  };

  const handleNewVentFlow = () => {
    let newVentFlowMeasurements = props.selectedVentSurvey.ventMeasurements;
    newVentFlowMeasurements.push({distanceFromVent: '', ventMeasurement: 0, ventMeasurementId: '', ventSurveyId: props.selectedVentSurvey.ventSurvey.ventSurveyId});
    const sum = newVentFlowMeasurements.reduce((prev, current) => {
      return prev = prev + current.ventMeasurement
    }, 0);
    let average = Math.round(sum/newVentFlowMeasurements.length);
    if(props.selectedVentSurvey.ventSurvey.vent.type === 'Fume Hood' || props.selectedVentSurvey.ventSurvey.vent.type === 'Paint Booth'){
      let lowFlows = []
      let failFlow = ''
      for(let i = 0; newVentFlowMeasurements.length > i; i++){
        if(newVentFlowMeasurements[i].ventMeasurement < 75){
          failFlow = true
        }
        else{
          failFlow = false
        }
        if(newVentFlowMeasurements[i] < 100){
          lowFlows.push(newVentFlowMeasurements[i])
        };
      };
      if(lowFlows.length < 2 && average > 99 && failFlow === false){
        props.setSelectedVentSurvey({
          ventSurvey:{
            ...props.selectedVentSurvey.ventSurvey,
            pass: 'Pass'
          },
          ventMeasurements: [...newVentFlowMeasurements]
        });
      }
      else{
        props.setSelectedVentSurvey({
          ventSurvey:{
            ...props.selectedVentSurvey.ventSurvey,
            pass: 'Fail'
          },
          ventMeasurements: [...newVentFlowMeasurements]
        });
      };
    }
    else if(props.selectedVentSurvey.ventSurvey.vent.type === 'Fume Hood' || props.selectedVentSurvey.ventSurvey.vent.type === 'Paint Booth'){
      let airChanges = checkAirChanges(roomVolume, average, ventArea);
      props.setSelectedVentSurvey({
        ventSurvey:{
          ...props.selectedVentSurvey.ventSurvey,
          airChanges: airChanges.airChanges,
          pass: airChanges.pass
        },
        ventMeasurements: [...newVentFlowMeasurements]
      });
    };

    setAverageVentFlow(average);
  };

  const handleRemoveVentFlow = (index, flow) => {
    let newVentFlowMeasurements = props.selectedVentSurvey.ventMeasurements;
    newVentFlowMeasurements.splice(index, 1);
    const sum = newVentFlowMeasurements.reduce((prev, current) => {
      return prev = prev + current.ventMeasurement
    }, 0);
    let average = Math.round(sum/newVentFlowMeasurements.length);
    if(props.selectedVentSurvey.ventSurvey.vent.type === 'Fume Hood' || props.selectedVentSurvey.ventSurvey.vent.type === 'Paint Booth'){
      let lowFlows = []
      let failFlow = ''
      for(let i = 0; newVentFlowMeasurements.length > i; i++){
        if(newVentFlowMeasurements[i] < 75){
          failFlow = true
        }
        else{
          failFlow = false
        }
      };
      for(let i = 0; newVentFlowMeasurements.length > i; i++){
        if(newVentFlowMeasurements[i] < 100){
          lowFlows.push(newVentFlowMeasurements[i])
        };
      };
      if(lowFlows.length < 2 && average > 99 && failFlow === false){
        props.setSelectedVentSurvey({
          ventSurvey:{
            ...props.selectedVentSurvey.ventSurvey,
            pass: 'Pass'
          },
          ventMeasurements: [...newVentFlowMeasurements]
        });
      }
      else{
        props.setSelectedVentSurvey({
          ventSurvey:{
            ...props.selectedVentSurvey.ventSurvey,
            pass: 'Fail'
          },
          ventMeasurements: [...newVentFlowMeasurements]
        });
      };
    }
    else if(props.selectedVentSurvey.ventSurvey.vent.type === 'Battery Room'){
      let airChanges = checkAirChanges(roomVolume, average, ventArea);
      props.setSelectedVentSurvey({
        ventSurvey:{
          ...props.selectedVentSurvey.ventSurvey,
          airChanges: airChanges.airChanges,
          pass: airChanges.pass

        },
        ventMeasurements: [...newVentFlowMeasurements]
      });
    };
    setAverageVentFlow(average);
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
    // setFormValues(defaultFormValues);
    navigate(-1)
    // props.selectedVentSurvey();
  };

  const onSubmit = async (e) => {
    // new Date().toISOString().split('T')[0]
    try{
    e.preventDefault();
    let toSend = {
      to_name: `${props.selectedVentSurvey.ventSurvey.technician.technicianRank} ${props.selectedVentSurvey.ventSurvey.technician.lastName}, ${props.selectedVentSurvey.ventSurvey.technician.firstName}`,
      to_email: props.selectedVentSurvey.ventSurvey.technician.technicianEmail,
      message: ''
    }
    if(props.selectedVentSurvey.ventSurvey.status === 'Approved'){
      toSend.message = 'Your Survey has been approved by the program manager. You may send the completed form to the ventilation system owner.'
    }
    else if(props.selectedVentSurvey.ventSurvey.status === 'Rejected'){
      toSend.message = 'Your Survey has been rejected by the program manager. Please contact your program manager to determine what corrections are required.'
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
		await axios.put(
			`${process.env.REACT_APP_DATABASE}/ventSurvey/${props.selectedVentSurvey.ventSurvey.ventSurveyId}`,
      props.selectedVentSurvey.ventSurvey
		);
    await axios.put(
			`${process.env.REACT_APP_DATABASE}/vents/${props.selectedVentSurvey.ventSurvey.vent.ventId}`,
      props.selectedVentSurvey.ventSurvey.vent
		);
    props.selectedVentSurvey.ventMeasurements.map((ventFlow) => {
      if(ventFlow.ventMeasurementId === ''){
        axios.post(
        `${process.env.REACT_APP_DATABASE}/ventSurveyMeasurements`,
        {distanceFromVent: ventFlow.distanceFromVent, ventMeasurement: ventFlow.ventMeasurement, ventSurveyId: ventFlow.ventSurveyId}
        )
      }
      else{
        axios.put(
        `${process.env.REACT_APP_DATABASE}/ventSurveyMeasurements/${ventFlow.ventMeasurementId}`,
        ventFlow
        )
      }
      return ventFlow
    });
    navigate(-1)
    }
    catch(e){
      console.log(e)
    };
  };
  
  const getEquipment = async () => {
    let setArea = 0;
    let ventMeasurements = selectedVentSurvey.ventMeasurements;
    let average = '';
    let airChanges = '';
    let pass = '';

    if (selectedVentSurvey.ventMeasurements.length === 0){
      ventMeasurements = [{distanceFromVent: '', ventMeasurement: 0, ventMeasurementId: '', ventSurveyId: selectedVentSurvey.ventSurvey.ventSurveyId}]
    };
    if(selectedVentSurvey.ventSurvey.vent.ventShape === 'Square'){
      let area = (selectedVentSurvey.ventSurvey.vent.ventDimension1 * selectedVentSurvey.ventSurvey.vent.ventDimension2)/144
      setArea = Math.round((area + Number.EPSILON) * 100) / 100;
    }
    else if(selectedVentSurvey.ventSurvey.vent.ventShape === 'Circular'){
      let area = selectedVentSurvey.ventSurvey.vent.ventDimension1/2 * selectedVentSurvey.ventSurvey.vent.ventDimension1/2 * Math.PI /144;
      setArea = Math.round((area + Number.EPSILON) * 100) / 100;

    };
    let volume = Math.round((selectedVentSurvey.ventSurvey.vent.roomHeight * selectedVentSurvey.ventSurvey.vent.roomWidth * selectedVentSurvey.ventSurvey.vent.roomLength)/1728);
    
    if(ventMeasurements[0].ventMeasurementId !== ''){
      const sum = selectedVentSurvey.ventMeasurements.reduce((prev, current) => {
        return prev = prev + current.ventMeasurement
      }, 0);
      average = Math.round(sum/selectedVentSurvey.ventMeasurements.length);
    }
    else{
      average = averageVentFlow
    };
    if(selectedVentSurvey.ventSurvey.vent.type === 'Battery Room'){
      const airChangeCheck = checkAirChanges(volume, average, setArea);
      airChanges = airChangeCheck.airChanges;
      pass = airChangeCheck.pass;
    }
    else if(selectedVentSurvey.ventSurvey.vent.type === 'Fume Hood' || selectedVentSurvey.ventSurvey.vent.type === 'Paint Booth'){
      let lowFlows = []
      let failFlow = selectedVentSurvey.ventMeasurements.every(flow => flow.ventMeasurement >= 75)
      for(let i = 0; selectedVentSurvey.ventMeasurements.length > i; i++){
        if(selectedVentSurvey.ventMeasurements[i].ventMeasurement < 100){
          lowFlows.push(selectedVentSurvey.ventMeasurements[i].ventMeasurement)
        };
      };
      if(lowFlows.length < 2 && average > 99 && failFlow === true){
        pass ='Pass'
      }
      else{
        pass ='Fail'
      };
    }
    else if(selectedVentSurvey.ventSurvey.vent.type === 'Welding Hood'){
      if(selectedVentSurvey.ventMeasurements[0].ventMeasurement < 100){
        pass = 'Fail'
      }
      else if(selectedVentSurvey.ventMeasurements[0].ventMeasurement >= 100){
        pass = 'Pass'
      }
    } 
    setAverageVentFlow(average);
    setRoomVolume(volume);
    setVentArea(setArea);
    setSelectedVentSurvey({
      ventMeasurements: [
        ...ventMeasurements
      ],
      ventSurvey: {
        ...selectedVentSurvey.ventSurvey,
        airChanges: airChanges.airChanges,
        pass: pass,
      }
    });
  };
  useEffect(()=> {
    getEquipment()
  }, []);
  console.log(props)
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
                {equipment.equipment.map((equipment) => (
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
              {props.selectedVentSurvey.ventSurvey.vent.type === 'Welding Hood' &&
              <Grid item>
                <TextField
                name='weldingHoodMeasurement'
                id='outlined-multiline-static'
                label={`Vent Flow Measurement (fpm)`}
                value={formValues.weldingHoodMeasurement.ventMeasurement}
                rows={1}
                onChange={handleWeldingHood}
                />
                <FormControl>
                  <TextField
                    name='distanceFromVent'
                    id='outlined-multiline-static'
                    label='Distance from Vent (in.)'
                    value={formValues.weldingHoodMeasurement.distanceFromVent}
                    onChange={handleWeldingHood}
                    rows={1}
                  />
                </FormControl>
              </Grid>
              }
              {props.selectedVentSurvey.ventMeasurements !== null && props.selectedVentSurvey.ventSurvey.vent.type !== 'Welding Hood' &&(
              props.selectedVentSurvey.ventMeasurements.map((flow,index) => 
              <Grid key = {index}>
                <TextField
                name='ventFlow'
                id='outlined-multiline-static'
                label={`Vent Flow Measurement ${index+1} (fpm)`}
                value={props.selectedVentSurvey.ventMeasurements[index].ventMeasurement}
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
                  <IconButton onClick={()=> handleRemoveVentFlow(index, flow)}>
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
                    placeholder='Pass/Fail'
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
                  placeholder='Pass/Fail'
                  value={props.selectedVentSurvey.ventSurvey.pass}
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
                  value={props.selectedVentSurvey.ventSurvey.status}
                  onChange={handleChange}
                >
                  <MenuItem value={'In Progress'}>In Progress</MenuItem>
                  <MenuItem value={'Ready For QA'}>Ready For QA</MenuItem>
                  <MenuItem value={'Approved'}>Approved</MenuItem>
                  <MenuItem value={'Rejected'}>Rejected</MenuItem>
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
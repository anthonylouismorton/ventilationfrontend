import React from 'react';
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

export default function VentInfo(props) {
	const handleChange = (e) => {
		const { name, value } = e.target;
    if(value === 'Circular'){
      props.setSelectedVent({
        ...props.selectedVent,
        [name]: value,
        ventDimension2: ''
      });
    }
    else{
        if(name === 'ventDimension1' || name === 'ventDimension2'){
          props.setSelectedVent({
            ...props.selectedVent,
            [name]: parseInt(value),
          });
        }
        else{
          props.setSelectedVent({
            ...props.selectedVent,
            [name]: value,
          });
        };
    };
	};
  const handleUpdate = async () => {
    await axios.put(`${process.env.REACT_APP_DATABASE}/vents/${props.selectedVent.ventId}`, props.selectedVent);
  };

	return (
		<Box>
			<Paper>
				<Typography>{`${props.selectedVent.description} Vent Info`}</Typography>
					<form>
            <Grid>
              <FormControl>
                <TextField
                  name='manufacturer'
                  id='outlined-multiline-static'
                  label='Manufacturer'
                  rows={1}
                  value={props.selectedVent.manufacturer}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='model'
                  id='outlined-multiline-static'
                  label='Model'
                  rows={1}
                  value={props.selectedVent.model}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='description'
                  id='outlined-multiline-static'
                  label='description'
                  rows={1}
                  value={props.selectedVent.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='serialNumber'
                  id='outlined-multiline-static'
                  label='Serial #'
                  rows={1}
                  value={props.selectedVent.serialNumber}
                  onChange={handleChange}
                />
              </FormControl>
                <FormControl>
                  <InputLabel id='demo-simple-select-label'>
                    Type
                  </InputLabel>
                  <Select
                    name='type'
                    value={props.selectedVent.type}
                    placeholder={'Select Vent Type'}
                    onChange={handleChange}
                  >
                    <MenuItem value={'Fume Hood'}>Fume Hood</MenuItem>
                    <MenuItem value={'Paint Booth'}>Paint Booth</MenuItem>
                    <MenuItem value={'Battery Room'}>Battery Room</MenuItem>
                    <MenuItem value={'Welding Hood'}>Welding Hood</MenuItem>
                  </Select>
                </FormControl>
              <FormControl>
                <InputLabel id='demo-simple-select-label'>
                  Frequency
                </InputLabel>
                <Select
                  name='surveyFrequency'
                  value={props.selectedVent.surveyFrequency}
                  onChange={handleChange}
                >
                  <MenuItem value={'Quarterly'}>Quarterly</MenuItem>
                  <MenuItem value={'Semi Annually'}>Semi Annually</MenuItem>
                  <MenuItem value={'Annually'}>Annually</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id='demo-simple-select-label'>
                  Vent Shape
                </InputLabel>
                <Select
                  name='ventShape'
                  value={props.selectedVent.ventShape}
                  onChange={handleChange}
                >
                  <MenuItem value={'Circular'}>Circular</MenuItem>
                  <MenuItem value={'Square'}>Square</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <TextField
                  name='startDate'
                  id='outlined-multiline-static'
                  label='Start Date'
                  defaultValue={props.selectedVent.startDate}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='endDate'
                  id='outlined-multiline-static'
                  label='End Date'
                  defaultValue={props.selectedVent.endDate}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
              {props.selectedVent.ventShape === 'Square' ?
              <>
              <FormControl>
                <TextField
                  name='ventDimension1'
                  id='outlined-multiline-static'
                  label={'Vent Height'}
                  defaultValue={props.selectedVent.ventDimension1}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='ventDimension2'
                  id='outlined-multiline-static'
                  label='Vent Length'
                  defaultValue={props.selectedVent.ventDimension2}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
              </>
              :
              <FormControl>
              <TextField
                name='ventDimension1'
                id='outlined-multiline-static'
                label={'Diameter'}
                defaultValue={props.selectedVent.ventDimension1}
                rows={1}
                onChange={handleChange}
              />
              </FormControl>
              }
              {props.selectedVent.type === 'Battery Room' &&
              <>
              <FormControl>
                <TextField
                  name='roomHeight'
                  id='outlined-multiline-static'
                  label={'Room Height'}
                  defaultValue={props.selectedVent.roomHeight}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='roomLength'
                  id='outlined-multiline-static'
                  label='Room Length'
                  defaultValue={props.selectedVent.roomLength}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
              <TextField
                name='roomWidth'
                id='outlined-multiline-static'
                label={'Room Width'}
                defaultValue={props.selectedVent.roomWidth}
                rows={1}
                onChange={handleChange}
              />
              </FormControl>
              </>
              }
            </Grid>
            <Grid>
							<Button onClick={handleUpdate} variant='contained'>
								Update
							</Button>
              {/* <Button onClick={handleNewSurvey} variant='contained'>
								New Survey
							</Button> */}
              {/* <Button onClick={handleAssignSurvey} variant='contained'>
								Assign Survey
							</Button> */}
            </Grid>
					</form>
			</Paper>
		</Box>
	);
};
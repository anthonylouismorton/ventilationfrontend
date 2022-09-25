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
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function EquipmentInfo(props) {
  const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
    props.setSelectedEquipment({
      ...props.selectedEquipment,
      [name]: value,
    });
	};

  const handleUpdate = async () => {
    await axios.put(`${process.env.REACT_APP_DATABASE}/equipment/${props.selectedEquipment.equipmentId}`, props.selectedEquipment);
    navigate('/Equipment')
    props.setSelectedEquipment([])
  };

	return (
		<Box>
			<Paper>
				<Typography>{`${props.selectedEquipment.serialNumber} ${props.selectedEquipment.manufacturer} ${props.selectedEquipment.model} Info`}</Typography>
					<form>
            <Grid>
              <FormControl>
                <TextField
                  name='manufacturer'
                  id='outlined-multiline-static'
                  label='Manufacturer'
                  rows={1}
                  value={props.selectedEquipment.manufacturer}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='model'
                  id='outlined-multiline-static'
                  label='Model'
                  rows={1}
                  value={props.selectedEquipment.model}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='description'
                  id='outlined-multiline-static'
                  label='Description'
                  rows={1}
                  value={props.selectedEquipment.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='serialNumber'
                  id='outlined-multiline-static'
                  label='Serial #'
                  rows={1}
                  value={props.selectedEquipment.serialNumber}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='calibrationDate'
                  id='outlined-multiline-static'
                  label='calibration Date'
                  value={props.selectedEquipment.calibrationDate}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
						</Grid>
						<Grid>
              <FormControl>
                <TextField
                  name='calibrationExpiration'
                  id='outlined-multiline-static'
                  value={props.selectedEquipment.calibrationExpiration}
                  label='Calibration Expiration'
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
						</Grid>
            <Grid>
                <Grid item>
                  <FormControl>
                    <InputLabel id='demo-simple-select-label'>
                      Calibration Location
                    </InputLabel>
                    <Select
                      name='calibrationLocation'
                      value={props.selectedEquipment.calibrationLocation}
                      onChange={handleChange}
                    >
                      <MenuItem value={'Nellis'}>Nellis</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
            </Grid>
            <Grid>
							<Button onClick={handleUpdate} variant='contained'>
								Update
							</Button>
            </Grid>
					</form>
			</Paper>
		</Box>
	);
};
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
} from '@mui/material';

export default function AddVentForm(props) {
	const [formValues, setFormValues] = useState({
    description: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
		installDate: new Date().toISOString().split('T')[0],
    unitId: '',
    surveyFrequency: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleCancel = () => {
		setFormValues([]);
  };

	const onSubmit = async (e) => {
		e.preventDefault();
    await axios.post(
			`${process.env.REACT_APP_DATABASE}/vent`,
			formValues,
			);
		setFormValues([]);

	};

	return (
		<Box>
			<Paper>
				<Typography>Add Vent</Typography>
				<Grid>
					<form onSubmit={onSubmit}>
            <Grid>
                <FormControl fullWidth>
                  <TextField
                    name='manufacturer'
                    id='outlined-multiline-static'
                    label='Manufacturer'
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    name='model'
                    id='outlined-multiline-static'
                    label='Model'
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='description'
                    id='outlined-multiline-static'
                    label='description'
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
							</Grid>
						</Grid>
						<Grid>
							<Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='serialNumber'
                    id='outlined-multiline-static'
                    label='Serial #'
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
							</Grid>
						</Grid>
            <Grid>
							<Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='installDate'
                    id='outlined-multiline-static'
                    label='Start Date'
                    defaultValue={formValues.installDate}
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
							</Grid>
						</Grid>
            <Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                      Frequency
                    </InputLabel>
                    <Select
                      name='surveyFrequency'
                      value={formValues.surveyFrequency}
                      onChange={handleChange}
                    >
                      <MenuItem value={'Quarterly'}>Quarterly</MenuItem>
                      <MenuItem value={'Semi Annually'}>Semi Annually</MenuItem>
                      <MenuItem value={'Annually'}>Annually</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
						</Grid>
            <Grid>
							<Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='unitId'
                    id='outlined-multiline-static'
                    label='unitId'
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
							</Grid>
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
import React, { useState } from 'react';
import axios from 'axios';
import {
	TextField,
	Button,
	Paper,
	Grid,
	FormControl,
	Box,
	Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AddEquipmentForm(props) {
	const defaultFormValues = {
		manufacturer: '',
    model: '',
    description: '',
    serialNumber: '',
    calibrationDate: '',
    calibrationExpiration: '',
    calibrationLocation: ''
	}
	const [formValues, setFormValues] = useState(defaultFormValues);
	const navigate = useNavigate();
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.post(
			`${process.env.REACT_APP_DATABASE}/equipment`,
			formValues
		);
		setFormValues({...defaultFormValues});
		let equipmentList = await axios.get(
      `${process.env.REACT_APP_DATABASE}/equipment`);
    props.setEquipment([...equipmentList.data])
		navigate('/Equipment')
	};

	const handleCancel= () => {
		navigate('/Equipment')
		setFormValues(defaultFormValues);
	};
	return (
			<Box>
				<Paper>
					<Typography>Add Equipment</Typography>
					<Grid>
						<form onSubmit={handleSubmit}>
							<Grid>
									<FormControl>
										<TextField
											name='manufacturer'
											id='outlined-multiline-static'
											label='Manufacturer'
											rows={1}
											onChange={handleChange}
										/>
									</FormControl>
								<FormControl>
									<TextField
										name='model'
										id='outlined-multiline-static'
										label='Model'
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
								<FormControl>
									<TextField
										name='description'
										id='outlined-multiline-static'
										label='Description'
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
								<FormControl>
									<TextField
										name='serialNumber'
										id='outlined-multiline-static'
										label='Serial #'
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
								<FormControl>
									<TextField
										name='calibrationDate'
										id='outlined-multiline-static'
                    placeholder='yyyy-mm-dd'
										label='Calibration Date'
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
								<FormControl>
									<TextField
										name='calibrationExpiration'
										id='outlined-multiline-static'
										label='Calibration Expiration'
                    placeholder='yyyy-mm-dd'
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
								<FormControl>
									<TextField
										name='calibrationLocation'
										id='outlined-multiline-static'
										label='Calibration Location'
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
							</Grid>
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
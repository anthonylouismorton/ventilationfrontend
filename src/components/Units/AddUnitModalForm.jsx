import React, { useState } from 'react';
import axios from 'axios';
import {
	TextField,
	Button,
	Paper,
	Grid,
	FormControl,
	Box,
	Typography,
	Modal
} from '@mui/material';

export default function AddUnitForm(props) {
	const defaultFormValues = {
		WPID: '',
    unitName: ''
	}
	const [formValues, setFormValues] = useState(defaultFormValues);

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
			`${process.env.REACT_APP_DATABASE}/unit`,
			formValues);
		setFormValues(defaultFormValues);
		
		let unitList = await axios.get(
			`${process.env.REACT_APP_DATABASE}/unit`);
		props.setUnits(unitList.data)
		handleClose();

	};

	const handleClose = () => {
		props.setOpen({...props.open, addUnitModal: false });
		setFormValues(defaultFormValues);
	};
  
	return (
		<Modal
			open={props.open.addUnitModal}
			onClose={handleClose}
		>
			<Box>
				<Paper>
					<Typography>New Unit</Typography>
					<Grid>
						<form onSubmit={handleSubmit}>
							<Grid>
									<FormControl fullWidth>
										<TextField
											name='WPID'
											id='outlined-multiline-static'
											label='WPID'
											value={formValues.WPID}
											rows={1}
											onChange={handleChange}
										/>
									</FormControl>
							</Grid>
							<Grid>
								<FormControl fullWidth>
									<TextField
										name='unitName'
										id='outlined-multiline-static'
										label='Unit Name'
										value={formValues.unitName}
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
							</Grid>
							<Grid>
								<Button type='submit' color='success' variant='contained'>
									Submit
								</Button>
								<Button onClick={handleClose} color='error' variant='contained'>
									Cancel
								</Button>
							</Grid>
						</form>
					</Grid>
				</Paper>
			</Box>
		</Modal>
	);
};
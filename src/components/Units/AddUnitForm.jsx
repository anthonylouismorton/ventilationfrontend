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
    unitName: '',
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
		setFormValues(defaultFormValues);
    props.setShow({
      ...props.show,
      unitList: true,
      addUnit: false,
    })
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
    props.setShow({
      ...props.show,
      unitList: true,
      addUnit: false,
    })
	};
  
	return (
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
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
							</Grid>
							<Grid>
								<Button type='submit' color='success' variant='contained'>
									Submit
								</Button>
								<Button color='error' variant='contained'>
									Cancel
								</Button>
							</Grid>
						</form>
					</Grid>
				</Paper>
			</Box>
	);
};
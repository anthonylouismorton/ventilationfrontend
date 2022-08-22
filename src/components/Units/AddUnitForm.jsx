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
} from '@mui/material';

export default function AddUnitForm(props) {
	const defaultFormValues = {
		WPID: '',
    unitName: '',
    poc: '',
		altPoc: '',
		email: '',
		altEmail: '',
		phone: '',
		altPhone: ''
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
		props.setUnits([...unitList.data])
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
									<FormControl>
										<TextField
											name='WPID'
											id='outlined-multiline-static'
											label='WPID'
                      value={formValues.WPID}
											rows={1}
											onChange={handleChange}
										/>
									</FormControl>
								<FormControl>
									<TextField
										name='unitName'
										id='outlined-multiline-static'
										label='Unit Name'
                    value={formValues.unitName}
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
                <FormControl>
									<TextField
										name='poc'
										id='outlined-multiline-static'
										label='POC'
                    value={formValues.poc}
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
                <FormControl>
									<TextField
										name='altPoc'
										id='outlined-multiline-static'
										label='Alt POC'
                    value={formValues.altPoc}
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
                <FormControl>
									<TextField
										name='email'
										id='outlined-multiline-static'
										label='Email'
                    value={formValues.email}
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
                <FormControl>
									<TextField
										name='altEmail'
										id='outlined-multiline-static'
										label='Alt Email'
                    value={formValues.altEmail}
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
                <FormControl>
									<TextField
										name='phone'
										id='outlined-multiline-static'
										label='phone'
                    value={formValues.phone}
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
                <FormControl>
									<TextField
										name='altPhone'
										id='outlined-multiline-static'
										label='Alt Phone'
                    value={formValues.altPhone}
										rows={1}
										onChange={handleChange}
									/>
								</FormControl>
							</Grid>
							<Grid>
								<Button type='submit' variant='contained'>
									Submit
								</Button>
								<Button onClick={()=> handleCancel()} color='error' variant='contained'>
									Cancel
								</Button>
							</Grid>
						</form>
					</Grid>
				</Paper>
			</Box>
	);
};
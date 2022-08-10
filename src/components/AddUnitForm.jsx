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

export default function AddUnitForm(props) {
	const [formValues, setFormValues] = useState({
    WPID: '',
    unitName: '',
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.post(
			`${process.env.REACT_APP_DATABASE}/unit`,
			formValues,
			);
		setFormValues([]);

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
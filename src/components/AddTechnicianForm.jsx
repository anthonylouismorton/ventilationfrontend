import React, { useState, useEffect } from 'react';
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

	const onSubmit = async (e) => {
		e.preventDefault();
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
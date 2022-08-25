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
	InputLabel,
	Select,
	MenuItem
} from '@mui/material';

export default function AddUnitForm(props) {
	let defaultValues = {
		firstName: '',
		middleName: '',
    lastName: '',
		technicianEmail: '',
		technicianRank: '',
		technicianRole: 'Technician'
	}
	const [formValues, setFormValues] = useState(defaultValues);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleCancel = () => {
		setFormValues({...defaultValues});
    props.setShow({...props.show, addTechnician: false})
  };

  const handleAdd = async () => {
    setFormValues({...defaultValues});
		await axios.post(
			`${process.env.REACT_APP_DATABASE}/technician`,
			formValues,
			);
    let technicianList = 	await axios.get(`${process.env.REACT_APP_DATABASE}/technician`);
    props.setTechnicians([...technicianList.data])
  }

	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post(
      `${process.env.REACT_APP_DATABASE}/technician`,
			formValues,
		);
    props.setShow({...props.show, addTechnician: false})
    setFormValues({...defaultValues});
    let technicianList = 	await axios.get(`${process.env.REACT_APP_DATABASE}/technician`);
    props.setTechnicians([...technicianList.data])
	};
	return (
		<Box>
			<Paper>
				<Typography>Add Tech</Typography>
				<Grid>
					<form onSubmit={onSubmit}>
            <Grid>
                <FormControl>
                  <TextField
                    name='firstName'
                    id='outlined-multiline-static'
                    label='First Name'
                    value={formValues.firstName}
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <TextField
                  name='middleName'
                  id='outlined-multiline-static'
                  label='Middle Name'
                  value={formValues.middleName}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
						</Grid>
						<Grid>
              <FormControl>
                <TextField
                  name='lastName'
                  id='outlined-multiline-static'
                  label='Last Name'
                  value={formValues.lastName}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
						</Grid>
						<Grid>
              <FormControl>
                <TextField
                  name='technicianEmail'
                  id='outlined-multiline-static'
                  label='Email'
                  value={formValues.technicianEmail}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
						</Grid>
						<Grid>
              <FormControl>
                <TextField
                  name='technicianRank'
                  id='outlined-multiline-static'
                  value={formValues.technicianRank}
                  label='Rank'
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
						</Grid>
            <Grid>
                <Grid item>
                  <FormControl>
                    <InputLabel id='demo-simple-select-label'>
                      Role
                    </InputLabel>
                    <Select
                      name='technicianRole'
                      value={formValues.technicianRole}
                      onChange={handleChange}
                    >
                      <MenuItem value={'Admin'}>Admin</MenuItem>
                      <MenuItem value={'Program Manager'}>Program Manager</MenuItem>
                      <MenuItem value={'Technician'}>Technician</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
						</Grid>
            <Grid>
							<Button type='submit' variant='contained'>
								Submit
							</Button>
              <Button onClick={handleAdd} variant='contained'>
								Add
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
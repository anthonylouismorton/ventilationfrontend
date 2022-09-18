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

export default function TechnicianInfo(props) {
	const handleChange = (e) => {
		const { name, value } = e.target;
    props.setSelectedTech({
      ...props.selectedTech,
      [name]: value,
    });
	};
	const handleBack = () => {
    props.setShow({
      ...props.show,
      technicianList: true,
      techInfo: false
    })
  };

  const handleUpdate = async () => {
    await axios.put(`${process.env.REACT_APP_DATABASE}/technician/${props.selectedTech.technicianId}`, props.selectedTech);
    props.setShow({
      ...props.show,
      technicianList: true,
      techInfo: false
    })
    props.setSelectedTech([]);
  };

	return (
		<Box>
			<Paper>
				<Typography>{`${props.selectedTech.firstName} ${props.selectedTech.lastName} Info`}</Typography>
					<form>
            <Grid>
              <FormControl>
                <TextField
                  name='firstName'
                  id='outlined-multiline-static'
                  label='First Name'
                  rows={1}
                  value={props.selectedTech.firstName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='middleName'
                  id='outlined-multiline-static'
                  label='Middle Name'
                  rows={1}
                  value={props.selectedTech.middleName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='lastName'
                  id='outlined-multiline-static'
                  label='Last Name'
                  rows={1}
                  value={props.selectedTech.lastName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='technicianEmail'
                  id='outlined-multiline-static'
                  label='Email'
                  value={props.selectedTech.technicianEmail}
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
                  value={props.selectedTech.technicianRank}
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
                      value={props.selectedTech.technicianRole}
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
							<Button onClick={handleUpdate} variant='contained'>
								Update
							</Button>
							<Button onClick={handleBack} variant='contained'>
								Back
							</Button>
            </Grid>
					</form>
			</Paper>
		</Box>
	);
};
import React from 'react';
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

export default function UnitInfo(props) {
	const handleChange = (e) => {
		const { name, value } = e.target;
    props.setSelectedUnit({
      ...props.selectedUnit,
      [name]: value,
    });
	};
  const handleUpdate = async () => {
    await axios.put(`${process.env.REACT_APP_DATABASE}/unit/${props.selectedUnit.unitId}`, props.selectedUnit);
  };

	return (
		<Box>
			<Paper>
				<Typography>{`${props.selectedUnit.WPID} ${props.selectedUnit.unitName} Unit Info`}</Typography>
					<form>
            <Grid>
              <FormControl>
                <TextField
                  name='WPID'
                  id='outlined-multiline-static'
                  label='WPID'
                  rows={1}
                  value={props.selectedUnit.WPID}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='unitName'
                  id='outlined-multiline-static'
                  label='Unit Name'
                  rows={1}
                  value={props.selectedUnit.unitName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='poc'
                  id='outlined-multiline-static'
                  label='POC'
                  rows={1}
                  value={props.selectedUnit.poc}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='altPoc'
                  id='outlined-multiline-static'
                  label='Secondary POC'
                  rows={1}
                  value={props.selectedUnit.altPoc}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='email'
                  id='outlined-multiline-static'
                  label='Email'
                  rows={1}
                  value={props.selectedUnit.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='altEmail'
                  id='outlined-multiline-static'
                  label='Alt Email'
                  rows={1}
                  value={props.selectedUnit.altEmail}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='phone'
                  id='outlined-multiline-static'
                  label='Phone'
                  rows={1}
                  value={props.selectedUnit.phone}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='altPhone'
                  id='outlined-multiline-static'
                  label='Alt Phone'
                  rows={1}
                  value={props.selectedUnit.altPhone}
                  onChange={handleChange}
                />
              </FormControl>
              {/* <FormControl>
                <TextField
                  name='startDate'
                  id='outlined-multiline-static'
                  label='Start Date'
                  defaultValue={props.selectedUnit.startDate}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name='endDate'
                  id='outlined-multiline-static'
                  label='End Date'
                  defaultValue={props.selectedUnit.endDate}
                  rows={1}
                  onChange={handleChange}
                />
              </FormControl> */}
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
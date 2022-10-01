import React from "react";
import LoginButton from "./LoginButton";
import {
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)({
  // backgroundImage: 'url(https://source.unsplash.com/random/?neighborhood)',
  // backgroundRepeat: 'no-repeat',
  backgroundColor: 'lightgray',
  // backgroundSize: 'cover',
  marginTop: '4%',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '750px',
  // minWidth: '200px',
  height: '500px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  // borderRadius: 10,
  gridtemplatecolumns: 'repeat(auto-fill, minmax(21%, 1fr))',
  columnGap: '20px',
});

export default function Login() {
  const handleSubmit = () => {};
  return (
    <StyledBox>
        <Typography component='h1' variant='h5'>
          Ventilation Survey Tool
        </Typography>
        <Box
        sx={{ marginTop: '20px' }}
          component='form'
          onSubmit={handleSubmit}
          noValidate
        >
          <LoginButton />
      </Box>
    </StyledBox>
  );
}


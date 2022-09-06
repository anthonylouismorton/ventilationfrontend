import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import {
  Box,
  Typography,
  Avatar
} from '@mui/material';

export default function Login() {
  const { user, isAuthenticated} = useAuth0();
  const handleSubmit = () => {};
  return (
    <Box>
      <Box>
        <Avatar>
          {!isAuthenticated ? (
            <Avatar alt='' />
          ) : (
            <Avatar alt={user.name} src={user.picture} />
          )}
        </Avatar>
        <Typography component='h1' variant='h5'>
          Ventilation Survey Tool Login
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, backgroundColor: 'lightgray', width: '25%' }}
        >
          <LoginButton />
        </Box>
      </Box>
    </Box>
  );
}


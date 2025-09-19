import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AuthContainer = ({ title, children }) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: 'background.paper',
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h5" textAlign="center" mb={2}>
          {title}
        </Typography>
        {children}
      </Box>
    </Container>
  );
};

export default AuthContainer;

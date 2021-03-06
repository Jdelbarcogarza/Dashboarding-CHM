import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function DenseAppBar({ titleText }) {
  return (
    <Box sx={{ flexGrow: 1,
      marginBottom: '2.5em',
     }}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            {titleText}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

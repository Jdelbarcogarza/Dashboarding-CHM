import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Climate(props) {
  const { post } = props;

  return (
    <Paper
      elevation={24}
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 5, // Espacio entre componentes
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
      <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 2 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.fecha}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.hora}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={6} align="right">
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 2 },
              pr: { md: 2 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {post.temp} °C
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
            {post.description[0].toUpperCase()}{post.description.slice(1,post.description.length)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

Climate.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    hora: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Climate;
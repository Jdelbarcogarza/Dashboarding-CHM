import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// mis imports
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


import {
  Grid,
  Paper,
  Container,
  Box,
  IconButton,
  Link,
  Stack,
  Tooltip,
} from '@mui/material'
import { NextLink } from 'next/Link'


const drawerWidth = 240;


/////////////////////////////// COLORES DE SEMAFORIZACION DE DATAGRID
// ESCALA DE 5 COLORES. Acomodados de mejor estado a peor estado
const superGreen = 'rgb(15, 189, 8)'
const green = 'rgb(80, 204, 75)'
const orange = 'rgb(237, 210, 36)'
const superOrange = 'rgb(230, 139, 11)'
const red = 'rgb(242, 131, 124)'
const superRed = 'rgb(209, 25, 0)'

const semaforizacion = [
  { description: 'Excelente', color: superGreen },
  { description: 'Normal', color: green },
  { description: 'Precautorio', color: orange },
  { description: 'Decadente', color: superOrange },
  { description: 'Malo', color: red },
  { description: 'Pésimo', color: superRed },
]


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Home() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Dictionary with wbsite routes
  const sidebarElements = [
    { name: 'Inicio', icon: <HomeOutlinedIcon />, route: 'home' },
    { name: 'Realizar consulta', icon: <PersonSearchOutlinedIcon />, route: 'search' },
    { name: 'Consulta general', icon: <LeaderboardOutlinedIcon />, route: 'searchGroup' },
    { name: 'Cargar datos', icon: <CloudUploadOutlinedIcon />, route: 'loadData' },
    { name: 'Modificar datos', icon: <EditOutlinedIcon />, route: 'modifyData' },
    { name: 'Cerrar sesión', icon: <LogoutOutlinedIcon />, route: '/' },
  ];

  const appBarText = 'Inicio'

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {appBarText}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {sidebarElements.map((item, index) => (
              <Link
                component={NextLink}
                href={item.route}
                underline={'none'}
                key={index}
                color={'gray'}>
                {item.name === 'Cerrar sesión' ? <Divider key={'divider'} /> : null}

                <ListItemButton
                  key={index}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >

                  <ListItemIcon

                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />

          <Container>
            <Grid container>

              <Grid item xs={9}>

                <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="h5" color="initial">Objetivo de la plataforma</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sx={{ mr: '4em' }}>
                    <Typography variant="body1" color="initial">
                      Que sea una herramienta adicional al flujo de trabajo de las personas encargadas de administrar los resultados de las
                      pruebas de tamizaje. Esto con el motivo de poder interpretar de manera eficaz grandes conjuntos de datos
                      gracias a la semaforización.
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sx={{ mt: '1em' }}>
                    <Box>
                      <Typography variant="h5" color="initial">Colaboración</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sx={{ mr: '4em' }}>
                    <Typography variant="body1" color="initial">
                      Esta plataforma está hecha con ayuda de la experiencia del Dr. [INSERTE NOMBRE DE DOCTOR]
                    </Typography>

                  </Grid>

                  <Grid item xs={12} sx={{ display: 'flex' }}>
                    <Box sx={{
                      objectFit: 'cover',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center'
                      }}>
                      <img width="100%" height={"100%"} src="http://sds.uanl.mx/wp-content/uploads/2020/01/logo-facultad-de-medicina.png" />
                    </Box>

                    <Box sx={{
                      objectFit: 'cover',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center'
                      }}>
                      <img width="50%" height={"100%"} src="http://www.carmenurdiales.org/wp-content/uploads/2015/07/logo_CHM.jpg" />
                    </Box>
                  </Grid>
                </Grid>

              </Grid>

              <Grid item xs={3}>
                <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Typography variant="h6" color="initial"><strong>Código de colores</strong>
                    </Typography>
                    <Tooltip sx={{ ml: 2, }} placement="bottom-end" title={
                      <Typography variant="body1" color="white">
                        Cuando una prueba <strong><em>no</em></strong> se mida en la escala de seis posibles interpretaciones dadas a continuación,
                        se utilizan las variantes más fuertes de los colores para la semaforización.
                        En esos casos, el color determina el resultado general de la prueba y su interpretacion queda a disposición del Doctor.
                      </Typography>
                    }>
                      <InfoOutlinedIcon />
                    </Tooltip>
                  </Box>
                  <Container>
                    {
                      semaforizacion.map((state, id) => (
                        <Box key={id}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              margin: 2,
                            }}>
                            <Typography variant="body2" color="initial">{state.description}</Typography>
                            <Paper sx={{ width: '40px', height: '40px', backgroundColor: state.color }}></Paper>
                          </Box>
                        </Box>
                      ))}
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle" color="GrayText">
                      Este es el código de colores por el cual se interpretan
                      los resultados de las pruebas de tamizaje en la sección de consulta.
                    </Typography>

                  </Container>

                </Paper>
              </Grid>

            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}

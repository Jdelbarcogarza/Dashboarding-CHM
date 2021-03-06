import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
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
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { NextLink } from 'next/Link'
import {
  Link,
  Grid,
  Container,
  TextField,
  Stack,
  Switch,
  Button,
  Paper,
  Tooltip,
  FormGroup,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel
} from '@mui/material'

import { DataGrid } from '@mui/x-data-grid'
import clsx from 'clsx'

import Chart from 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2';


const drawerWidth = 240;

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

export default function Search() {
  // LOGICA PROPIA DE LA PAGINA 
  //////////////////////////////////// Constantes useState ////////////////////////////////////

  // Valores para habilitar los switches
  const [enableIdSearch, setEnableIdSearch] = useState(true);

  // Valores de textFields
  const [patientName, setPatientName] = useState("");
  const [patientID, setpatientID] = useState('');

  // Resultado de query
  const [patientData, setPatientData] = useState([]);

  // datos permanentes de paciente
  const [patientPersonalInfo, setPatientPersonalInfo] = useState([]);

  const [queryMade, setQueryMade] = useState(false);

  ////////////////// CONTROL DE RADIOGROUP PARA SELECCION DE GR??FICAS

  const [graphType, setGraphType] = useState("Bar")

  ///////////////// FUNCION PARA DESPLEGAR GR??FICAS ADICIONALES Y ESCONDER DATA GRID

  // state para mostrar/ocultar graficas de chart js.
  const [displayCharts, setDisplayCharts] = useState(false)

  function displayData() {
    setDisplayCharts(!displayCharts)
  }

  const [chartReloj, setChartReloj] = useState({})
  const [chartMMSE, setChartMMSE] = useState({})
  const [chartGDS, setChartGDS] = useState({})
  const [chartKatz, setChartKatz] = useState({})
  const [chartLWB, setChartLWB] = useState({})
  const [chartSarcF, setChartSarcF] = useState({})
  const [chartFuerza, setChartFuerza] = useState({})
  const [chartSPPB, setChartSPPB] = useState({})
  const [chartCFS_Fraility, setChartCFS_Fraility] = useState({})
  const [chartGijon, setChartGijon] = useState({})

  useEffect(() => {

    // Prueba de reloj
    setChartReloj({
      labels: patientData.map((data) => data.Fecha),
      datasets: [{
        label: 'Reloj',
        data: patientData.map((data) => data.Reloj),
        backgroundColor: '#007bb2'
      }]
    })

    // Prueba MMSE
    setChartMMSE({
      labels: patientData.map((data) => data.Fecha),
      datasets: [{
        label: 'MMSE',
        data: patientData.map((data) => data.MMSE_Total),
        backgroundColor: 'red'
      }]
    })

    // Prueba GDS
    setChartGDS({
      labels: patientData.map((data) => data.Fecha),
      datasets: [{
        label: 'GDS',
        data: patientData.map((data) => data.GDS_Total),
        backgroundColor: '#00e676'
      }]
    })

    // Prueba Katz
    setChartKatz({
      labels: patientData.map((data) => data.Fecha),
      datasets: [{
        label: 'Katz',
        data: patientData.map((data) => data.Katz_Total),
        backgroundColor: '#651fff'
      }]
    })

    // Prueba LWB
    setChartLWB({
      labels: patientData.map((data) => data.Fecha),
      datasets: [{
        label: 'LWB',
        data: patientData.map((data) => data.LWB_Total),
        backgroundColor: '#ff9100'
      }]
    })

    // Prueba Sarc F
    setChartSarcF({
      labels: patientData.map((data) => data.Fecha),
      datasets: [{
        label: 'Sarc F',
        data: patientData.map((data) => data.Sarc_F),
        backgroundColor: '#ed4b82'
      }]
    })

    // Prueba Fuerza 
    setChartFuerza({
      labels: patientData.map((data) => data.Fecha),
      datasets: [{
        label: 'Fuerza',
        data: patientData.map((data) => data.Fuerza_Domin),
        backgroundColor: '#0277bd'
      }]
    })

    // Prueba SPPB
    setChartSPPB({
      labels: patientData.map((data) => data.Fecha),
      datasets: [{
        label: 'SPPB',
        data: patientData.map((data) => data.SPPB_Global),
        backgroundColor: '#cddc39'
      }]
    })

    // CFS Fraility
    setChartCFS_Fraility({
      labels: patientData.map((data) => data.Fecha),
      datasets: [{
        label: 'CFS Fraility',
        data: patientData.map((data) => data.CFS_Fraility),
        backgroundColor: '#ae7519'
      }]
    })

    // Prueba Gijon
    setChartGijon({
      labels: patientData.map((data) => data.Fecha),
      datasets: [{
        label: 'Gijon',
        data: patientData.map((data) => data.Gijon),
        backgroundColor: '#535da8'
      }]
    })

  }, [patientData])

  ///////////////////////////// Funciones y Constantes handle /////////////////////////////

  function handleSwitchChange() {
    setEnableIdSearch(!enableIdSearch)
  }

  const handleAtributoChange = (event, newAtributo) => {
    setAtributo(newAtributo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const nombre = { patientName };
    const pacID = { patientID };
    const habilitado = { enableIdSearch };

    try {
      if (pacID.patientID != '' & !habilitado.enableIdSearch) {
        // endpoint que devuelve solo resultados del tamizaje
        var resID = await fetch(`/api/searchPrueba/one/ID/${pacID.patientID}`).then(resID => resID.json())

        for (var i = 0; i < resID.length; i++) {
          var fecha = resID[i].Fecha
          fecha = fecha.substring(0, 10)
          resID[i].Fecha = fecha
        }


        // endpoint que retorna informacion del paciente
        const info = await fetch(`/api/userID/${pacID.patientID}`).then(info => info.json())

        setPatientData(resID);
        setPatientPersonalInfo(info)

        setQueryMade(true)

      }
      else if (nombre.patientName != '' & habilitado.enableIdSearch) {

        var resNom = await fetch(`/api/searchPrueba/one/Name/${nombre.patientName}`).then(resNom => resNom.json())

        for (var i = 0; i < resNom.length; i++) {
          var fecha = resNom[i].Fecha
          fecha = fecha.substring(0, 10)
          resNom[i].Fecha = fecha
        }

        // endpoint que retorna informacion del paciente
        const info = await fetch(`/api/userName/${nombre.patientName}`).then(info => info.json())

        // despues de guardar la informacion. Actualizar estado de variables. Primero informacion permanente y luego la variable 
        setPatientPersonalInfo(info)
        setPatientData(resNom);

        setQueryMade(true)
      }
      else {
        setQueryMade(false)
        setPatientPersonalInfo([])
        setPatientData([])
      }
    }
    catch {
      setQueryMade(false)
      setPatientPersonalInfo([])
      setPatientData([])
    }
    confirmarUser();
  }



  /////////////////////////////// COLORES DE SEMAFORIZACION DE DATAGRID
  // ESCALA DE 5 COLORES. Acomodados de mejor estado a peor estado
  const superGreen = 'rgb(15, 189, 8)'
  const green = 'rgb(80, 204, 75)'
  const orange = 'rgb(237, 210, 36)'
  const superOrange = 'rgb(230, 139, 11)'
  const red = 'rgb(242, 131, 124)'
  const superRed = 'rgb(209, 25, 0)'

  /////////////////////////////// COLUMNAS DEL DATAGRID /////////////////////////////////

  let columns = [

    { field: "ID_Resultado", headerName: "ID" },
    { field: "Fecha"},
    {
      field: "Reloj",
      cellClassName: (params) => {
        if (params.value == -1) {
          return '';
        }

        return clsx('reloj', {
          normal: params.value == 2,
          deterioro: params.value == 1,
          pbDemencia: params.value == 0
        });
      }
    },
    { field: "MMSE_Total", headerName: "MMSE", 
    cellClassName: (params) => {
      if (params.value == -1) {
        return '';
      }

        return clsx('MMSE', {
          normal: 25 <= params.value && params.value <= 30,
          dcl: 22 <= params.value && params.value <= 24,
          demenciaLeve: 18 <= params.value && params.value < 22,
          demenciaModerada: 12 <= params.value && params.value <= 18,
          demenciaSevera: params.value < 12,

        });
      }
    },
    {
      field: "GDS_Total", headerName: 'GDS',
      cellClassName: (params) => {
        if (params.value == -1) {
          return '';
        }

        return clsx('GDS', {
          normal: params.value <= 5,
          pbDepresion: 6 <= params.value && params.value <= 9,
          depresion: params.value >= 10
        });
      }
    },
    {
      field: "Katz_Total", headerName: 'Katz',
      cellClassName: (params) => {
        if (params.value == -1) {
          return '';
        }

        return clsx('Katz', {
          normal: params.value == 6,
          incLeve: 4 <= params.value && params.value <= 5,
          incModerada: 2 <= params.value && params.value <= 3,
          incSevera: 0 <= params.value && params.value <= 1,

        });
      }
    },
    {
      field: "LWB_Total", headerName: 'LWB',
      cellClassName: (params) => {
        if (params.value == -1) {
          return '';
        }
        // 1 es masculino. 2 es femenino
        return clsx('LWB', {
          normal: params.value >= 5 && patientPersonalInfo.Genero === 'H' || params.value >= 7 && patientPersonalInfo.Genero === 'M',
          anormal: params.value < 5 && patientPersonalInfo.Genero === 'H' || params.value < 7 && patientPersonalInfo.Genero === 'M',

        });
      }
    },
    {
      field: "Sarc_F", headerName: 'Sarc F',
      cellClassName: (params) => {
        if (params.value == -1) {
          return '';
        }

        return clsx('Sarc_F', {
          normal: params.value <= 4,
          riesgo: 4 < params.value,

        });
      }
    },
    { 
      field: "Fuerza_Domin", headerName: 'Fuerza',
      cellClassName: (params) => {
        if (params.value == -1) {
          return '';
        }

        return clsx('Fuerza', {
          normal: params.value > 27 && patientPersonalInfo.Genero === 'H' || params.value > 20 && patientPersonalInfo.Genero === 'M',
          sarcodinia: params.value <= 27 && patientPersonalInfo.Genero === 'H' || params.value <= 20 && patientPersonalInfo.Genero === 'M'

        });
      }
   },
    { 
      field: "SPPB_Global", headerName: 'SPPB',
      cellClassName: (params) => {
        if (params.value == -1) {
          return '';
        }

        return clsx('SPPB', {
          normal: params.value >= 8,
          anormal: params.value < 8,
        });
      }
   },
    { 
      field: "CFS_Fraility", headerName: 'CFS',
      cellClassName: (params) => {
        if (params.value == -1) {
          return '';
        }

        return clsx('CFS_Fraility', {
          normal: params.value == 0,
          prefragil: 1 <= params.value && params.value <= 2,
          fragil: 3 <= params.value && params.value <= 5,
        });
      }
    },
    {
      field: "Gijon",
      cellClassName: (params) => {
        if (params.value == -1) {
          return '';
        }

        return clsx('Gijon', {
          normal: 7 >= params.value,
          riesgoIntermedio: 8 <= params.value && params.value <= 9,
          riesgoAlto: 10 <= params.value,
        });
      }
    }

  ]


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
    { name: 'Cerrar sesi??n', icon: <LogoutOutlinedIcon />, route: '/' },
  ];

  const appBarText = 'Realizar busqueda de pacientes'

  // validacion de busqueda
  const [isInvalidUser, setIsInvalidUser] = useState(true);

  const confirmarUser = async (e) => {
    const userID = await fetch(`../api/loginUsuario/${patientName}`).then(x => x.json());
    setIsInvalidUser(!userID.length == 0);
  }

  return (
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
              {item.name === 'Cerrar sesi??n' ? <Divider key={'divider'} /> : null}

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

        {/** AQUI VA EL CODIGO DE CADA PAGINA */}
        <Container>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Typography variant='h6'>Favor de llenar los campos como corresponde</Typography>
            </Grid>

            {/** SECCI??N DE CAMPOS DE B??SQUEDA */}
            <Grid item xs={6}>
              <Stack spacing={2}>
                <Box sx={{
                  width: '60%'
                }}>
                  <TextField
                    label='Nombre del paciente'
                    value={patientName}
                    onChange={(e) => { setPatientName(e.target.value) }}
                    variant='standard'
                    disabled={!enableIdSearch}
                    error = {!isInvalidUser && enableIdSearch}
                    helperText={!isInvalidUser? "Usuario Invalido":null}
                    fullWidth />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'baseline', width: '60%' }}>
                  <TextField
                    label='ID del paciente'
                    value={patientID}
                    onChange={(e) => { setpatientID(e.target.value) }}
                    variant='standard'
                    helperText = 'La busqueda por ID desactivar?? la consulta por nombre'
                    disabled={enableIdSearch} />
                  <Switch onChange={handleSwitchChange} />
                </Box>
                <Box>
                  <Button
                    variant='contained'
                    onClick={handleSubmit}>
                    Realizar busqueda
                  </Button>
                </Box>
              </Stack>
            </Grid>

            {/** PANEL DE INSTRUCCIONES Y DE INFO ADICIONAL */}

            <Grid item xs={6}>

              <Paper sx={{ p: 2 }} elevation={2}>
                <Container
                >

                  <Typography sx={{ textAlign: 'center', pb: 1 }} variant="h6" color="initial" >Datos del paciente</Typography>
                  <Stack>
                    <Typography variant="body1" color="initial"><strong>ID de parroquia:</strong> <em>{queryMade ? patientPersonalInfo.ID_Parroquia : '#'}</em></Typography>
                    <Typography variant="body1" color="initial"><strong>ID de usuario:</strong> <em>{queryMade ? patientPersonalInfo.ID_Usuario : '#'}</em></Typography>
                    <Typography variant="body1" color="initial"><strong>Nombre:</strong> <em>{queryMade ? patientPersonalInfo.Nombre : '#'}</em></Typography>
                    <Typography variant="body1" color="initial"><strong>A??o de nacimiento:</strong> <em>{queryMade ? patientPersonalInfo.A??o_Nac : '#'}</em></Typography>
                    <Typography variant="body1" color="initial"><strong>Genero:</strong> <em>{queryMade ? (patientPersonalInfo.Genero == 'H' ? 'Masculino' : 'Femenino') : '#'}</em></Typography>
                  </Stack>
                </Container>
              </Paper>

            </Grid>

            {/** SECCI??N DE RESULTADOS CON TABLA */}
            <Grid item xs={12}>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant='h6'
                    sx={{
                      marginY: '1em'
                    }}>Aqui se despliegan los resultados de la b??squeda </Typography>
                  <Tooltip
                    sx={{ ml: '0.5em' }}
                    placement={'right'}
                    title={
                      <Typography variant="subtitle2" color="white">
                        Cada prueba tiene su escala. Algunas cuentan con 3 interpretaciones
                        pero otras terminan con 5. Los colores con <em><strong>tonalidades m??s claras</strong></em> de verde, amarillo y rojo son utilizadas para brindar
                        una <em><strong>semaforizaci??n m??s descriptiva</strong></em>
                      </Typography>
                    }
                  >
                    <InfoOutlinedIcon />
                  </Tooltip>
                </Box>

                <Button
                  onClick={displayData}
                  variant="contained"
                  color="secondary"
                  startIcon={displayCharts ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}>
                  {!displayCharts ? <>Mostrar gr??ficas adicionales</> : <>Cerrar gr??ficas adicionales</>}
                </Button>

              </Box>

              {/** BOX PARA DAR STYLING A LAS CELDAS CON SU RESPECTIVO COLOR */}
              <Box
                hidden={false}
                sx={{
                  // prueba de Reloj
                  '& .reloj.normal': {
                    backgroundColor: superGreen // verde
                  },
                  '& .reloj.deterioro': {
                    backgroundColor: superOrange // naranja
                  },
                  '& .reloj.pbDemencia': {
                    backgroundColor: superRed  // rojo
                  },

                  // prueba MMSE
                  '& .MMSE.normal': {
                    backgroundColor: superGreen
                  },
                  '& .MMSE.dcl': {
                    backgroundColor: green
                  },
                  '& .MMSE.demenciaLeve': {
                    backgroundColor: orange
                  },
                  '& .MMSE.demenciaModerada': {
                    backgroundColor: red
                  },
                  '& .MMSE.demenciaSevera': {
                    backgroundColor: superRed
                  },

                  // prueba GDS 
                  '& .GDS.normal': {
                    backgroundColor: superGreen // verde
                  },
                  '& .GDS.pbDepresion': {
                    backgroundColor: superOrange // naranja
                  },
                  '& .GDS.depresion': {
                    backgroundColor: superRed  // rojo
                  },
                  // prueba Katz
                  '& .Katz.normal': {
                    backgroundColor: superGreen
                  },
                  '& .Katz.incLeve': {
                    backgroundColor: green
                  },
                  '& .Katz.incModerada': {
                    backgroundColor: orange
                  },
                  '& .Katz.incSevera': {
                    backgroundColor: superRed
                  },
                  // Prueba LWB 
                  '& .LWB.normal': {
                    backgroundColor: superGreen
                  },
                  '& .LWB.anormal': {
                    backgroundColor: superRed
                  },
                  // Prueba Sarc F
                  '& .Sarc_F.normal': {
                    backgroundColor: superGreen
                  },
                  '& .Sarc_F.riesgo': {
                    backgroundColor: superRed
                  },
                  // Prueba de Fuerza
                  '& .Fuerza.normal': {
                    backgroundColor: superGreen
                  },
                  '& .Fuerza.sarcodinia': {
                    backgroundColor: superRed
                  },

                  // Prueba SPPB
                  '& .SPPB.normal': {
                    backgroundColor: superGreen
                  },
                  '& .SPPB.anormal': {
                    backgroundColor: superRed
                  },
                  // prueba CFS_Fraility
                  '& .CFS_Fraility.normal': {
                    backgroundColor: superGreen
                  },
                  '& .CFS_Fraility.prefragil': {
                    backgroundColor: superOrange
                  },
                  '& .CFS_Fraility.fragil': {
                    backgroundColor: superRed
                  },
                  // Prueba Gijon
                  '& .Gijon.normal': {
                    backgroundColor: superGreen
                  },
                  '& .Gijon.riesgoIntermedio': {
                    backgroundColor: superOrange
                  },
                  '& .Gijon.riesgoAlto': {
                    backgroundColor: superRed
                  }
                }}
              >
                <DataGrid
                  getRowId={(id) => id.ID_Resultado} // Asigna que el id unico es el atributo ID_Resultado
                  columns={columns}
                  rows={patientData}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  autoHeight
                />
              </Box>

              <Divider sx={{ mt: 4 }} hidden={!displayCharts} />

              {/** AQUI COMIENZA EL GRID PARA ACOMODAR LAS GRAFICAS DE LAS PRUEBAS */}
              <Grid container spacing={4} hidden={!displayCharts}>


                <Grid hidden={!displayCharts} item xs={12}
                  sx={{ mt: 3 }}>
                  <Typography hidden={!displayCharts}
                    sx={{ my: 1 }}
                    variant="h6"
                    color="initial">Gr??ficas de progreso de tamizaje</Typography>

                  <FormControl>
                    <FormLabel id="type-of-graph">Seleccione un tipo de gr??fica</FormLabel>
                    <RadioGroup row defaultValue={"Bar"}>
                      <FormControlLabel
                        value={"Bar"}
                        onChange={() => { setGraphType("Bar") }}
                        control={<Radio />}
                        label="Barra" />

                      <FormControlLabel
                        value={"Line"}
                        onChange={() => { setGraphType("Line") }}
                        control={<Radio />} label="L??nea" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ width: '100%' }}>

                    {displayCharts && graphType === 'Bar' ? <Bar data={chartReloj} /> :
                      displayCharts ? <Line data={chartReloj} /> :
                        null}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ width: '100%' }}>
                  {displayCharts && graphType === 'Bar' ? <Bar data={chartMMSE} /> :
                      displayCharts ? <Line data={chartMMSE} /> :
                        null}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ width: '100%' }}>
                  {displayCharts && graphType === 'Bar' ? <Bar data={chartGDS} /> :
                      displayCharts ? <Line data={chartGDS} /> :
                        null}
                  </Box>
                </Grid>


                <Grid item xs={6}>
                  <Box sx={{ width: '100%' }}>
                  {displayCharts && graphType === 'Bar' ? <Bar data={chartKatz} /> :
                      displayCharts ? <Line data={chartKatz} /> :
                        null}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ width: '100%' }}>
                  {displayCharts && graphType === 'Bar' ? <Bar data={chartLWB} /> :
                      displayCharts ? <Line data={chartLWB} /> :
                        null}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ width: '100%' }}>
                  {displayCharts && graphType === 'Bar' ? <Bar data={chartSarcF} /> :
                      displayCharts ? <Line data={chartSarcF} /> :
                        null}
                  </Box>
                </Grid>


                <Grid item xs={6}>
                  <Box sx={{ width: '100%' }}>
                  {displayCharts && graphType === 'Bar' ? <Bar data={chartFuerza} /> :
                      displayCharts ? <Line data={chartFuerza} /> :
                        null}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ width: '100%' }}>
                  {displayCharts && graphType === 'Bar' ? <Bar data={chartSPPB} /> :
                      displayCharts ? <Line data={chartSPPB} /> :
                        null}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ width: '100%' }}>
                  {displayCharts && graphType === 'Bar' ? <Bar data={chartCFS_Fraility} /> :
                      displayCharts ? <Line data={chartCFS_Fraility} /> :
                        null}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ width: '100%' }}>
                  {displayCharts && graphType === 'Bar' ? <Bar data={chartGijon} /> :
                      displayCharts ? <Line data={chartGijon} /> :
                        null}
                  </Box>
                </Grid>

              </Grid>



            </Grid>
          </Grid>

        </Container>
      </Box>
    </Box>


  );
}
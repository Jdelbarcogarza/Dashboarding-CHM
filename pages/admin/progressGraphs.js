import React, { useState } from 'react';
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

import { NextLink } from 'next/Link'
import {
  Link,
  Grid,
  Container,
  TextField,
  Autocomplete,
  Stack,
  Switch,
  Button,
  Paper,
  Tooltip
} from '@mui/material'

import { DataGrid } from '@mui/x-data-grid'
import clsx from 'clsx'

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

  // Valores de atributo
  const [atributo, setAtributo] = useState('');

  // Resultado de query
  const [patientData, setPatientData] = useState([]);

  // datos permanentes de paciente
  const [patientPersonalInfo, setPatientPersonalInfo] = useState([]);

  const [queryMade, setQueryMade] = useState(false);

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
    const a = { atributo };
    const tests = "";

    console.log(a.atributo.length);

    if (a.atributo.length == 0) {
      tests = "$"
    }
    else {
      var i = 0; for (i = 0; i < a.atributo.length; i++) {
        if (a.atributo.length >= 1) {
          tests = tests + "!" + a.atributo[i].value;
        }
      }
    }

    console.log(tests);

    try {
      if (pacID.patientID != '' & !habilitado.enableIdSearch) {
        // endpoint que devuelve solo resultados del tamizaje
        var resID = await fetch(`/api/searchPrueba/one/ID/${tests}/${pacID.patientID}`).then(resID => resID.json())
        //console.log("Esto es resID");
        //console.log(resID);
        for (var i = 0; i < resID.length; i++) {
          var fecha = resID[i].Fecha
          fecha = fecha.substring(0, 10)
          resID[i].Fecha = fecha
        }
        setPatientData(resID);

        // endpoint que retorna informacion del paciente
        const info = await fetch(`/api/userID/${pacID.patientID}`).then(info => info.json())
        console.log(info)
        setPatientPersonalInfo(info)

        setQueryMade(true)

      }
      else if (nombre.patientName != '' & habilitado.enableIdSearch) {
        //console.log(nombre);
        var resNom = await fetch(`/api/searchPrueba/one/Name/${tests}/${nombre.patientName}`).then(resNom => resNom.json())
        //console.log("Esto es resNom");
        //console.log(resNom);
        for (var i = 0; i < resNom.length; i++) {
          var fecha = resNom[i].Fecha
          fecha = fecha.substring(0, 10)
          resNom[i].Fecha = fecha
        }
        setPatientData(resNom);


        // endpoint que retorna informacion del paciente
        const info = await fetch(`/api/userName/${nombre.patientName}`).then(info => info.json())
        console.log(info)
        setPatientPersonalInfo(info)

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
    }
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

    { field: "ID_Resultado" },
    { field: "Fecha" },
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
    {
      field: "MMSE_Total",
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
      field: "GDS_Total",
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
      field: "Katz_Total",
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
      field: "LWB_Total",
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
      field: "Sarc_F",
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
      field: "Fuerza_Domin",
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
      field: "SPPB_Global",
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
      field: "CFS_Fraility",
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
    { name: 'Cerrar sesión', icon: <LogoutOutlinedIcon />, route: '/' },
  ];

  const appBarText = 'Gráficas de progreso de tamizaje del paciente'

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

        {/** AQUI VA EL CODIGO DE CADA PAGINA */}
        <Container>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Typography variant='h6'>PON INSTRUCCIONES DE LO QUE PASA EN LA PAG. pon un boton de back</Typography>
            </Grid>

             
            </Grid>
        </Container>
      </Box>
    </Box>


  );
}
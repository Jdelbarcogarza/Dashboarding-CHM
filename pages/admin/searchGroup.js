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


import {
    Grid,
    Paper,
    Link,
    Button,
    Container,
    TextField,
    Switch,
    Stack,
    Slider,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    NativeSelect,
    FormControlLabel,
    Tooltip

} from '@mui/material'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import { DataGrid } from '@mui/x-data-grid'
import clsx from 'clsx'
import { NextLink } from 'next/Link'

// themes para el sidebar

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

export default function SearchGroup() {

    //////////////////////////////////// Constantes useState ////////////////////////////////////

    // Valores para habilitar los switches
    const [enableCalificacion, setEnableCalificacion] = useState(true);
    const [enableUbi, setEnableUbi] = useState(true);

    // Valores de género
    const [gender, setGender] = useState('A');

    // Valores de atributo
    const [atributo, setAtributo] = useState('');

    // Valores de calificacion
    const [grade, setGrade] = useState([0, 100]);

    // Valores de edad
    const [age, setAge] = useState([0, 110]);

    // Valores de edad
    const [zona, setZona] = useState('');

    // Valores de edad
    const [decanato, setDecanato] = useState('');

    // Valores de edad
    const [parroquia, setParroquia] = useState('');

    // Valores de edad
    const [gradeAtr, setGradeAtr] = useState('');
    // Verificacion
    const [verif, setVerif] = useState('');

    // Resultado de query
    const [patientData, setPatientData] = useState([]);

    // datos permanentes de paciente
    const [patientPersonalInfo, setPatientPersonalInfo] = useState([]);

    ///////////////////////////// Funciones y Constantes handle /////////////////////////////

    function handleSwitchUbi() {
        setEnableUbi(!enableUbi)
    }

    const handleAtributoChange = (event, newAtributo) => {
        setAtributo(newAtributo);
    };

    function handleSwitchChange() {
        setEnableCalificacion(!enableCalificacion);
    }

    const handleGradeAtributoChange = (event, newAtributo) => {
        setGradeAtr(newAtributo);
    };

    const handleGradeChange = (event, newGrade) => {
        setGrade(newGrade);
    };

    const handleAgeChange = (event, newAge) => {
        setAge(newAge);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const edad = age[0] + "-" + age[1];

        if (enableCalificacion) {

            var tests = "";

            // Envia "$" si no se selecciono ninguna prueba (por default se seleccionan todas)
            // o concatena todas las pruebas que se seleccionaron en un mismo string
            if (atributo.length == 0) {
                tests = "$"
            }
            else {
                var i = 0; for (i = 0; i < atributo.length; i++) {
                    if (atributo.length >= 1) {
                        tests = tests + "!" + atributo[i].value;
                    }
                }
            }

            if (enableUbi) {
                const res1 = await fetch(`/api/searchPrueba/group/prueba/${gender}/${edad}/${tests}`).then(resID => resID.json())
                console.log(gender);
                console.log(edad);
                console.log(tests);
                console.log(res1);
                for (var i = 0; i < res1.length; i++) {
                  var fecha = res1[i].Fecha
                  fecha = fecha.substring(0,10)
                  res1[i].Fecha = fecha
                }
                setPatientData(res1);
            }
            else if (parroquia != '' & decanato != '' & zona != '') {
                const ubi = parroquia + '-' + decanato + '-' + zona;
                const res2 = await fetch(`/api/searchPrueba/group/ubi-prueba/${gender}/${edad}/${ubi}/${tests}`).then(resID => resID.json())
                console.log(gender);
                console.log(edad);
                console.log(ubi);
                console.log(tests);
                console.log(res2);
                for (var i = 0; i < res2.length; i++) {
                  var fecha = res2[i].Fecha
                  fecha = fecha.substring(0,10)
                  res2[i].Fecha = fecha
                }
                setPatientData(res2);
            }

        }
        else if (gradeAtr != verif) {

            const gA = grade[0] + "-" + grade[1] + "-" + gradeAtr.value;

            if (enableUbi) {
                const res3 = await fetch(`/api/searchPrueba/group/calif/${gender}/${edad}/${gA}`).then(resID => resID.json())
                console.log(gender);
                console.log(edad);
                console.log(gA);
                console.log(res3);
                for (var i = 0; i < res3.length; i++) {
                  var fecha = res3[i].Fecha
                  fecha = fecha.substring(0,10)
                  res3[i].Fecha = fecha
                }
                setPatientData(res3);
            }
            else if (parroquia != '' & decanato != '' & zona != '') {
                const ubi = parroquia + '-' + decanato + '-' + zona;
                const res4 = await fetch(`/api/searchPrueba/group/ubi-calif/${gender}/${edad}/${ubi}/${gA}`).then(resID => resID.json())
                console.log(gender);
                console.log(edad);
                console.log(ubi);
                console.log(gA);
                console.log(res4);
                for (var i = 0; i < res4.length; i++) {
                  var fecha = res4[i].Fecha
                  fecha = fecha.substring(0,10)
                  res4[i].Fecha = fecha
                }
                setPatientData(res4);
            }
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
    { field: "MMSE_Total", 
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
          normal: params.value >= 5 && patientPersonalInfo.Genero === 'H'  || params.value >= 7 && patientPersonalInfo.Genero === 'M',
          anormal: params.value < 5 && patientPersonalInfo.Genero === 'H'  || params.value < 7 && patientPersonalInfo.Genero === 'M',

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
          normal: params.value > 27 && patientPersonalInfo.Genero === 'H' || params.value > 20 && patientPersonalInfo.Genero === 'M' ,
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

    //////////////// FUNCIONAMIENTO DEL SIDEBAR ////////////////

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

    const appBarText = 'Realizar busqueda de estadísticas generales de CHM'


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

                {/** AQUI DEBAJO VA LO PROPIO DE LA PAGINA */}

                {/**Dentro de este contenedor de grid es en el cual se despliega todo el contenido de la pagina */}
                <Container>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography variant='h6'>Favor de llenar los campos como corresponde</Typography>
                        </Grid>

                        {/** SECCIÓN DE CAMPOS DE BÚSQUEDA */}
                        <Grid item xs={6}>
                            <Stack spacing={4}>
                                <Box sx={{ width: 300 }}>
                                    <FormControl fullWidth>
                                        <InputLabel variant='standard' htmlFor="uncontrolled-native">Género</InputLabel>
                                        <NativeSelect
                                            defaultValue={'A'}
                                            onChange={(e) => { setGender(e.target.value) }}
                                            inputProps={{
                                                name: 'Género',
                                                id: 'uncontrolled-native',
                                            }}>
                                            <option value={'H'}>Hombre</option>
                                            <option value={'M'}>Mujer</option>
                                            <option value={'A'}>Todos</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'baseline', width: 300 }}>
                                    <Box sx={{ width: 300 }}>
                                        <Typography id="non-linear-slider" gutterBottom>
                                            Edad: {age[0]} - {age[1]}
                                        </Typography>
                                        <Slider
                                            value={age}
                                            onChange={handleAgeChange}
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={110}
                                        />
                                    </Box>
                                </Box>

                                <FormControlLabel
                                    control={<Switch color="primary" onChange={handleSwitchUbi} />}
                                    label="Habilitar filtro por ubicación"
                                    labelPlacement="end"
                                />

                                <Box sx={{ width: '60%' }}>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                                        <InputLabel>Zona</InputLabel>
                                        <Select
                                            value={zona}
                                            label="Zona"
                                            onChange={(e) => { setZona(e.target.value) }}
                                            disabled={enableUbi}
                                        >
                                            <MenuItem value={1}>Zona 1</MenuItem>
                                            <MenuItem value={2}>Zona 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box sx={{ width: '60%' }}>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                                        <InputLabel>Decanato</InputLabel>
                                        <Select
                                            value={decanato}
                                            label="Decanato"
                                            onChange={(e) => { setDecanato(e.target.value) }}
                                            disabled={enableUbi}
                                        >
                                            <MenuItem value={1}>Decanato 1</MenuItem>
                                            <MenuItem value={2}>Decanato 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box sx={{ width: '60%' }}>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                                        <InputLabel>Parroquia</InputLabel>
                                        <Select
                                            value={parroquia}
                                            label="Parroquia"
                                            onChange={(e) => { setParroquia(e.target.value) }}
                                            disabled={enableUbi}
                                        >
                                            <MenuItem value={1}>Parroquia 1</MenuItem>
                                            <MenuItem value={2}>Parroquia 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <Button variant='contained' onClick={handleSubmit}>Realizar busqueda</Button>
                                </Box>
                            </Stack>
                        </Grid>

                        {/** PANEL DE INSTRUCCIONES Y DE INFO ADICIONAL */}
                        <Grid item xs={6}>
                            <Stack spacing={5} sx={{ width: 400 }}>
                                <Autocomplete
                                    multiple
                                    options={atributosPrueba}
                                    groupBy={(option) => option.prueba}
                                    getOptionLabel={(option) => option.atributo}
                                    onChange={handleAtributoChange}
                                    disabled={!enableCalificacion}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Seleccione los atributos de la prueba"
                                            placeholder="Atributos"
                                        />
                                    )}
                                />

                                <FormControlLabel
                                    control={<Switch color="primary" onChange={handleSwitchChange} />}
                                    label="Habilitar filtro por calificación"
                                    labelPlacement="end"
                                />

                                <Box>
                                    <Typography id="non-linear-slider" gutterBottom>
                                        Calificación: {grade[0]} - {grade[1]}
                                    </Typography>
                                    <Slider
                                        value={grade}
                                        onChange={handleGradeChange}
                                        valueLabelDisplay="auto"
                                        disabled={enableCalificacion}
                                    />
                                </Box>

                                <Autocomplete
                                    options={atributosPrueba}
                                    groupBy={(option) => option.prueba}
                                    getOptionLabel={(option) => option.atributo}
                                    onChange={handleGradeAtributoChange}
                                    disabled={enableCalificacion}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Seleccione el atributos de la prueba a actualizar"
                                            placeholder="Atributos"
                                        />
                                    )}
                                />
                            </Stack>
                        </Grid>

                        {/** SECCIÓN DE RESULTADOS CON TABLA */}
                        <Grid item xs={12}>

                            <Divider />

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant='h6'
                  sx={{
                    marginY: '1em'
                  }}>Aqui se despliegan los resultados de la búsqueda </Typography>
                <Tooltip
                  sx={{ ml: '0.5em' }}
                  placement={'right'}
                  title={
                    <Typography variant="subtitle2" color="white">
                      Cada prueba tiene su escala. Algunas cuentan con 3 interpretaciones
                      pero otras terminan con 5. Los colores con <em><strong>tonalidades más claras</strong></em> de verde, amarillo y rojo son utilizadas para brindar
                      una <em><strong>semaforización más descriptiva</strong></em>
                    </Typography>
                  }
                >
                  <InfoOutlinedIcon />
                </Tooltip>
              </Box>

                            {/** BOX PARA DAR STYLING A LAS CELDAS CON SU RESPECTIVO COLOR */}
              <Box
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
                }}>
                <DataGrid
                  getRowId={(id) => id.ID_Resultado} // Asigna que el id unico es el atributo ID_Usuario
                  columns={columns}
                  rows={patientData}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  autoHeight
                />

              </Box>

                        </Grid>

                    </Grid>

                </Container>
            </Box>
        </Box>
    )
}

const atributosPrueba = [
    { prueba: 'Reloj', atributo: 'Reloj', value: 'Reloj', key: 'A' },
    { prueba: 'MMSE', atributo: 'Orientacion Temporal', value: 'Orient_Temp', key: 'B' },
    { prueba: 'MMSE', atributo: 'Orientacion Espacial', value: 'Orient_Esp', key: 'C' },
    { prueba: 'MMSE', atributo: 'Registro', value: 'Registro', key: 'D' },
    { prueba: 'MMSE', atributo: 'Calculo', value: 'Calculo', key: 'E' },
    { prueba: 'MMSE', atributo: 'Memoria', value: 'Memoria', key: 'F' },
    { prueba: 'MMSE', atributo: 'Eject', value: 'Eject', key: 'G' },
    { prueba: 'GDS', atributo: 'GDS', value: 'GDS_Total', key: 'H' },
    { prueba: 'Katz', atributo: 'Katz', value: 'Katz_Total', key: 'I' },
    { prueba: 'LWB', atributo: 'LWB', value: 'LWB_Total', key: 'J' },
    { prueba: 'Sarc F', atributo: 'Sarc F', value: 'Sarc_F', key: 'K' },
    { prueba: 'Fuerza', atributo: 'Fuerza', value: 'Fuerza_Domin', key: 'L' },
    { prueba: 'SPPB', atributo: 'SPPB', value: 'SPPB_Global', key: 'M' },
    { prueba: 'CFS Fraility', atributo: 'CFS Fraility', value: 'CFS_Fraility', key: 'N' },
    { prueba: 'Gijon', atributo: 'Gijon', value: 'Gijon', key: 'O' },
];
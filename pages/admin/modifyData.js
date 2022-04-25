import React, { useState } from 'react'
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

import {
    Grid,
    Box,
    Button,
    Container,
    TextField,
    Switch,
    Stack,
    Slider,
    Autocomplete,
    IconButton,
    Link
} from '@mui/material'
import { NextLink } from 'next/Link'

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

export default function ModifyData() {

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

    const appBarText = 'Modificar datos de un paciente'

    //////////////////////////////////// Constantes useState ////////////////////////////////////

    // Valores para habilitar los switches
    const [enableIdSearch, setEnableIdSearch] = useState(true);

    // Valores de textFields
    const [patientName, setPatientName] = useState("");
    const [patientid, setPatientID] = useState('');

    // Valores de atributo
    const [atributo, setAtributo] = useState('');

    // Valores de calificacion
    const [grade, setGrade] = useState(0);

    // Valores de fecha
    const [fecha, setFecha] = useState(new Date('2000-02-01'));

    // Valores de fecha
    const [status, setStatus] = useState('');

    ///////////////////////////// Funciones y Constantes handle /////////////////////////////

    function handleSwitchChange() {
        setEnableIdSearch(!enableIdSearch)
    }

    const handleGradeChange = (event, newGrade) => {
        setGrade(newGrade);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nombre = {patientName};
        const pacID = {patientid};
        const habilitado = {enableIdSearch};

        // console.log(a2.atributo.value);
        // console.log(g.grade);
        // console.log(fecha);

        if (atributo != null) {
            var dataObject = {
                prueba: atributo.value,
                cal: grade,
                fechaDate: fecha,
            }
        }
        else {
            setStatus("Es necesario llenar los campos solicitados")
            return
        }

        try {
            if (pacID.patientid != '' & !habilitado.enableIdSearch & atributo != '') {
                console.log(pacID);
                const resID = await fetch(`/api/update/userID/${pacID.patientid}`, {
                    method: 'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(dataObject)
                }).then(resID => resID.json())
                console.log(resID);
                setStatus(resID.msg)
            }
            else if (nombre.patientName != '' & habilitado.enableIdSearch & atributo != '') {
                console.log(nombre);
                const resNom = await fetch(`/api/update/userName/${nombre.patientName}`, {
                    method: 'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(dataObject)
                }).then(resNom => resNom.json())
                console.log(resNom);
                setStatus(resNom.msg)
            }
            else {
                setStatus("Es necesario llenar los campos solicitados")
            }
        }
        catch {
            setStatus("Actualización fallida")
        }
    }

    const handleAtributoChange = (event, newAtributo) => {
        setAtributo(newAtributo);
    };

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
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='h6'>Favor de llenar los campos como corresponde</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={2}>
                                    <Box sx={{
                                        width: '60%'
                                    }}>
                                        <TextField 
                                            label='Nombre del paciente'
                                            value={patientName}
                                            onChange={(e) => {setPatientName(e.target.value)}}
                                            variant='standard'
                                            disabled={!enableIdSearch}
                                            fullWidth />
                                            {/*console.log("el valor es ", patientName)*/}
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'baseline', width: '60%' }}>
                                        <TextField
                                            label='ID del paciente'
                                            value={patientid}
                                            onChange={(e) => {setPatientID(e.target.value)}}
                                            variant='standard'
                                            helperText={'La busqueda por ID desactivará la consulta por nombre'}
                                            disabled={enableIdSearch} />
                                            {/*console.log("el valor es ", patientid)*/}
                                        <Switch onChange={handleSwitchChange} />
                                    </Box>
                                    <Box>
                                        <Button sx={{ width: 340 }} variant='contained' onClick={handleSubmit}>Actualizar Datos</Button>
                                    </Box>
                                    {status}
                                </Stack>
                            </Grid>

                            <Stack spacing={5} sx={{ width: 400 }}>
                                <Stack spacing={4}>
                                    <TextField
                                        label="Fecha de la prueba"
                                        type="date"
                                        defaultValue="2000-01-01"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => {setFecha(e.target.value)}}
                                    />

                                    <Autocomplete
                                        options={atributosPrueba}
                                        groupBy={(option) => option.prueba}
                                        getOptionLabel={(option) => option.atributo}
                                        onChange={handleAtributoChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                label="Seleccione el atributo de la prueba a actualizar"
                                                placeholder="Atributo"
                                            />
                                        )}
                                    />
                                </Stack>

                                <Box>
                                    <Typography id="non-linear-slider" gutterBottom>
                                        Calificación: {grade}
                                    </Typography>
                                    <Slider
                                        value={grade}
                                        onChange={handleGradeChange}
                                        valueLabelDisplay="auto"
                                    />
                                </Box>

                            </Stack>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </>
    )
}

const atributosPrueba = [
    { prueba: 'Reloj', atributo: 'Reloj', value: 'Reloj'},
    { prueba: 'MMSE', atributo: 'Orientacion Temporal', value: 'Orient_Temp'},
    { prueba: 'MMSE', atributo: 'Orientacion Espacial', value: 'Orient_Esp'},
    { prueba: 'MMSE', atributo: 'Registro', value: 'Registro'},
    { prueba: 'MMSE', atributo: 'Calculo', value: 'Calculo'},
    { prueba: 'MMSE', atributo: 'Memoria', value: 'Memoria'},
    { prueba: 'MMSE', atributo: 'Eject', value: 'Eject'},
    { prueba: 'GDS', atributo: 'GDS', value: 'GDS_Total'},
    { prueba: 'Katz', atributo: 'Katz', value: 'Katz_Total'},
    { prueba: 'LWB', atributo: 'LWB', value: 'LWB_Total'},
    { prueba: 'Sarc F', atributo: 'Sarc F', value: 'Sarc_F'},
    { prueba: 'Fuerza', atributo: 'Fuerza', value: 'Fuerza_Domin'},
    { prueba: 'SPPB', atributo: 'SPPB', value: 'SPPB_Global'},
    { prueba: 'CFS Fraility', atributo: 'CFS Fraility', value: 'CFS_Fraility'},
    { prueba: 'Gijon', atributo: 'Gijon', value: 'Gijon'},
];
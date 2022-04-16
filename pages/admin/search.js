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
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { NextLink } from 'next/Link'
import { Link,
Grid,
Container,
TextField,
Autocomplete,
Stack,
Switch,
Button } from '@mui/material'

import { DataGrid } from '@mui/x-data-grid'



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



export default function MiniDrawer() {

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

        if (pacID.patientID != '' & !habilitado.enableIdSearch) {
            //console.log(pacID);
            const resID = await fetch('/api/searchPrueba/one/ID/' + tests + '/' + pacID.patientID, { method: 'GET' }).then(resID => resID.json())
            //console.log("Esto es resID");
            //console.log(resID);
            setPatientData(resID);
        }
        if (nombre.patientName != '' & habilitado.enableIdSearch) {
            //console.log(nombre);
            const resNom = await fetch('/api/searchPrueba/one/Name/' + tests + '/' + nombre.patientName, { method: 'GET' }).then(resNom => resNom.json())
            //console.log("Esto es resNom");
            //console.log(resNom);
            setPatientData(resNom);
            console.log(resNom[0].ID_Usuario)
        }
    }

    /////////////////////////////// COLUMNAS DEL DATAGRID /////////////////////////////////

    let columns = [

        { field: "ID_Usuario" },
        { field: "Nombre" },
        { field: "Año_Nac" },
        { field: "Genero" },
        { field: "ID_Parroquia" },
        { field: "ID_Resultado" },
        { field: "Reloj" },
        { field: "Orient_Temp" },
        { field: "Orient_Esp" },
        { field: "Registro" },
        { field: "Calculo" },
        { field: "Memoria" },
        { field: "Eject" },
        { field: "GDS_Total" },
        { field: "Katz_Total" },
        { field: "LWB_Total" },
        { field: "Sarc_F" },
        { field: "Fuerza_Domin" },
        { field: "SPPB_Global" },
        { field: "CFS_Fraility" },
        { field: "Gijon" }

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
    { name: 'Cargar datos', icon: <CloudUploadOutlinedIcon />, route: 'loadData' },
    { name: 'Modificar datos', icon: <EditOutlinedIcon />, route: 'modifyData' },
    { name: 'Cerrar sesión', icon: <LogoutOutlinedIcon />, route: '/'},
];

const appBarText = 'Realizar busqueda de pacientes'

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
                                <Typography variant='h6'>Favor de llenar los campos como corresponde</Typography>
                            </Grid>

                            {/** SECCIÓN DE CAMPOS DE BÚSQUEDA */}
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
                                            fullWidth />
                                        {/*console.log("el valor es ", patientName)*/}
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'baseline', width: '60%' }}>
                                        <TextField
                                            label='ID del paciente'
                                            value={patientID}
                                            onChange={(e) => { setpatientID(e.target.value) }}
                                            variant='standard'
                                            helperText={'La busqueda por ID desactivará la consulta por nombre'}
                                            disabled={enableIdSearch} />
                                        {/*console.log("el valor es ", patientID)*/}
                                        <Switch onChange={handleSwitchChange} />
                                    </Box>
                                    <Box>
                                        <Button variant='contained' onClick={handleSubmit}>Realizar busqueda</Button>
                                    </Box>
                                </Stack>
                            </Grid>

                            {/** PANEL DE INSTRUCCIONES Y DE INFO ADICIONAL */}
                            <Stack spacing={5} sx={{ width: 400 }}>
                                <Autocomplete
                                    multiple
                                    options={atributosPrueba}
                                    groupBy={(option) => option.prueba}
                                    getOptionLabel={(option) => option.atributo}
                                    onChange={handleAtributoChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Seleccione los atributos de la prueba"
                                            placeholder="Atributos"
                                        />
                                    )}
                                />

                                <Button href={'searchGroup'} variant='contained'>Busqueda General</Button>
                            </Stack>

                            {/** SECCIÓN DE RESULTADOS CON TABLA */}
                            <Grid item xs={12}>

                                <Divider />

                                <Typography
                                    variant='h6'
                                    sx={{
                                        marginY: '2em'
                                    }}>Aqui se despliegan los resultados de la búsqueda?</Typography>
                                
                                    {/** AQUI VA EL DATAGRID */}
                                    <DataGrid
                                        getRowId={(id) => id.ID_Resultado} // Asigna que el id unico es el atributo ID_Usuario
                                        columns={columns}
                                        rows={patientData}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />

                            </Grid>
                        </Grid>
                    </Container>



        </Box>
    </Box>

      
  );
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
import React, { useState } from 'react';
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
    Link,
    Grid,
    Paper,
    Box,
    Container,
    TextField,
    Button,
    IconButton,
    Stack,
    Input,
} from '@mui/material'
import { NextLink } from 'next/Link'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';

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

export default function LoadData() {
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

    const appBarText = 'Cargue un archivo con extensión .xlsx'

    // Constante que guardan la info del archivo
    const [document, setDocument] = useState();

    // Constante que guarda el estatus de la carga del archivo a la base de datos
    const [estatus, setEstatus] = useState();

    // Id de la parroquia
    const [parrID, setParrID] = useState(); 

    

    async function handleUpload(e) {
        e.preventDefault();

        setEstatus("");

        if (document != undefined) {
            try {
                // Procede a cargar los datos procesados del Excel en la base de datos
                const resTxt = fetch('/api/uploadData/readTxt').then(resTxt => resTxt.json()).then(d => {
                    console.log(d)
                    if (d.msg == "File was read successfully") {
                        setEstatus("Archivo cargado exitosamente");
                    }
                    else {
                        setEstatus("Hubo un error al momento de cargar el archivo, intentelo nuevamente");
                    }
                });
            } catch (err) {
                setEstatus("Hubo un error al momento de cargar el archivo, intentelo nuevamente");
            }
        }
        else {
            setEstatus("Necesita cargar un archivo");
        }


    }

    async function handleOnChange(e) {
        try {
            setDocument(e.target.files[0]);

            // Se obtiene el nombre del archivo
            const name = e.target.files[0].name;

            // Se convierte en un FormData
            const formData = new FormData();

            // Se le adjunta el archivo a cargar
            formData.append("file", e.target.files[0]);

            // Endpoint que carga el archivo en los docs del proyecto
            const resUpload = await fetch('/api/uploadData/uploadExcel', {
                method: 'POST',
                body: formData,
            })

            // Verifica que el archivo haya sido subido exitosamente
            // para proceder a correr el archivo de Python
            if (resUpload.status == 200) {
                const resCall = await fetch('/api/uploadData/callPython', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre: name })
                });
            }
        }
        catch {
            return
        }
    }

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
                            <Grid item xs={12}>
                                <Typography variant="h6" color="initial"><strong>Importante: </strong>Es necesario que el archivo de excel subido sea el de la plantilla que se le propociona
                                    en el recuadro. Dentro de este, no puede haber celdas vacías en filas donde se esté llenando la información de un paciente.
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 4 }} />


                        <Grid container spacing={2}>

                            <Grid item xs={8}>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                        justifyContent: 'center',
                                    }}>
                                    <Typography sx={{ my: 2 }} variant='h6'>Favor de cargar el archivo con los datos solicitados</Typography>
                                    <Stack sx={{ my: 1 }} direction="row" spacing={2}>
                                        <label htmlFor="contained-button-file">
                                            <Input accept=".xls, .xlsx" type="file" onChange={handleOnChange} />
                                        </label>
                                        <Button variant="contained" startIcon={<CloudUploadIcon />} onClick={handleUpload}>
                                            Subir archivo
                                        </Button>
                                    </Stack>
                                </Box>
                                {estatus}

                            </Grid>


                            <Grid item xs={4}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Paper elevation={3} sx={{ p: 3, bgcolor: '#faeee3' }}>
                                        <Stack spacing={2}>
                                            <Typography variant='h6'>Favor de descargar la plantilla</Typography>
                                            <Button color="secondary" sx={{ width: 280 }} variant="contained" startIcon={<DownloadIcon />} href="http://localhost:3000/api/download/example" >
                                                Descargar
                                            </Button>
                                        </Stack>
                                    </Paper>
                                </Box>

                            </Grid>

                        </Grid>

                        <Divider sx={{ my: 4 }} />
                        
                        <TextField
                            label='Nombre de la parroquia'
                            variant='standard'
                        />
                        <Button 
                            variant='contained'
                            onClick={buscarParroquia}
                        >
                            Buscar
                        </Button>

                        <Grid item xs={12}>
                            <Box sx={{display: 'flex', alignItems: 'center', position: 'fixed', bottom: '2em'}} >
                                <InfoOutlinedIcon sx={{mr: 2}} />
                                <Typography variant="body1" color="initial">
                                    Se recomienda que después de subir uno o más datos para un paciente
                                    proceda a revisarlos en el apartado de <Link component={NextLink} underline={'hover'} href={"search"}>realizar consulta</Link> para corrobar que se cargó la información
                                    correctamente. En caso de que no aparezacan los datos, revise si se llenó correctamente la plantilla de Excel.
                                </Typography>
                            </Box>
                        </Grid>

                    </Container>
                </Box>
            </Box>
        </>
    )
}
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
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MainFeaturedPost from '../../components/MainFeaturedPost';
import Climate from '../../components/Climate';

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
    Link,
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

export default function Home({res}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
      setOpen(true);
  };

  const handleDrawerClose = () => {
      setOpen(false);
  };

  // Dictionary with wbsite routes
  const sidebarElements = [
  { name: 'Inicio', icon: <HomeOutlinedIcon />, route: 'home' },
  { name: 'Videojuego', icon: <SportsEsportsIcon />, route: 'game' },
  { name: 'Cerrar sesión', icon: <LogoutOutlinedIcon />, route: '/' },
  ];

  const appBarText = 'Bienvenido a la plataforma';

  const frases = [
    {title: "Quién este libre de pecado que tire la primera piedra. ~ Juan 8,1-7", description: "Muchas veces juzgamos a los demás cuando nosotros hacemos lo mismo o incluso peor. Procuremos ser más tolerantes con los defectos de los que nos rodean. Intentemos  comprenderles y ponernos en su lugar."},
    {title: "La viga en el ojo ajeno. ~ Lucas 6,41-42", description: "Estamos dispuestos a criticar, a ver los defectos que nos molestan de nuestros semejantes, pero no vemos los nuestros. Si nos miramos en el espejo del alma y cada noche proponernos corregirlos y ser tolerantes y comprensivos para corregir con cariño los errores que veamos."},
    {title: "No tengáis miedo. ~ Juan 14,1", description: "¿De verdad confiamos en Él? ¿Ponemos nuestra vida en sus manos? Si le dejamos hacer su voluntad y no la nuestra, pensando que como Padre quiere lo mejor para nosotros, el miedo desaparecerá de nuestra vida."},
    {title: "Los soldados se burlan de él. ~ Lc 23, 36-37", description: "Siguen burlándose de Él. No entienden nada. Nosotros no vamos a negarle, no nos avergonzaremos de ser sus discípulos"},
    {title: "Aparta de mí este cáliz. ~ Lucas 22,42", description: "Jesús era hombre y sufrió enormemente. En nuestro camino hay desgracias y dificultades, pero si Él nos acompaña todo será más fácil. Nos dará fuerzas para continuar."}
  ]

  const num = Math.floor(Math.random() * (4 - 0));

  const mainFeaturedPost = {
    title: frases[0].title,
    description: frases[0].description,
    image: 'https://source.unsplash.com/random/?prayer',
    imageText: 'main image description',
    linkText: 'Continue reading…',
  };

  const dateBuilder = (d) => {
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    var dia = dias[d.getDay()];
    var date = d.getDate();
    var mes = meses[d.getMonth()];
    var anio = d.getFullYear();
    
    return `${dia}, ${date} ${mes} ${anio}`
  }

  const hourBuilder = (d) => {
    var hora = d.getHours();
    var min = d.getMinutes();
    if (hora < 12) {
      if (min < 10) {
        return `${hora}:0${min} am`
      }
      return `${hora}:${min} am`
    }
    else {
      hora = hora - 12
      if (min < 10) {
        return `${hora}:0${min} pm`
      }
      return `${hora}:${min} pm`
    }
  }

  const hora = () => {
    var h = new Date;
    h = h.getHours();
    return h
  }

  const clima = {
    description: res.weather[0].description,
    temp: res.main.temp,
    fecha: dateBuilder(new Date),
    hora: hourBuilder(new Date),
    image: (hora() >= 7 & hora() < 19) ? 'https://j.gifs.com/vQJxxY.gif' : 'https://th.bing.com/th/id/R.e51086cfaa2fb164969f154c4fb4c958?rik=86C75xr9k4rkNQ&pid=ImgRaw&r=0',
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

              <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
                  <DrawerHeader />
                  <Container>
                    <Climate post={clima} />
                    <MainFeaturedPost post={mainFeaturedPost} />
                      <Grid>
                        
                      </Grid>
                  </Container>
              </Box>
          </Box>
      </>
  )
}

export async function getStaticProps() {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=Monterrey&units=metric&lang=es&appid=895284fb2d2c50a520ea537456963d9c'
  const res = await fetch(url).then(info => info.json())

  return {
    props: {
      res,
    },
  }
}
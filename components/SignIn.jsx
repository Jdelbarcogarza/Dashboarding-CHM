import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from "next/router"

const theme = createTheme();

export default function SignInSide() {
  const [userName, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValidUser, setIsValidUser] = useState(true);
  const [validEntry, setValidEntry] = useState(true);
  const router = useRouter();

  const doSignIn = (e) => {
    e.preventDefault();
    if (userName === ""){
      setValidEntry(false);
      return;
    } 
    setValidEntry(true);
    if(isAdmin){
      confirmarAdmin();
    } else {
      confirmarUser();
    }
  }

  const confirmarUser = async (e) => {
    const userID = await fetch(`../api/loginUsuario/${userName}`).then(x => x.json());
    setIsValidUser(!userID.length == 0);
      router.push("user/home");
  }
  const confirmarAdmin = async (e) => {
    const userID = await fetch(`../api/loginAdmin/${userName}`).then(x => x.json());
    
    if(userID.length === 0) {
      setIsValidUser(false);
    } else {
      setIsValidUser(true);
      router.push("admin/home");
      console.log("Admin Valido");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://picsum.photos/1000/1000)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Grid>
              <img width= "50%" src="http://sds.uanl.mx/wp-content/uploads/2020/01/logo-facultad-de-medicina.png"/>
              <img width= "50%" src="http://www.carmenurdiales.org/wp-content/uploads/2015/07/logo_CHM.jpg"/>
            </Grid>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Nombre de Usuario"
                name="userName"
                variant="standard"
                autoComplete="userName"
                onChange = {(e) => {setUsername(e.target.value)}}
                autoFocus
                error={!isValidUser && validEntry}
                helperText={validEntry? isValidUser? null:"Usuario Invalido" : "Introduzca un usuario"}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Soy Administrador"
                onChange = {(e) => {setIsAdmin(!isAdmin)}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick = {doSignIn}
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
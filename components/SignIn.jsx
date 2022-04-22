import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [userName, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const doSignIn = (e) => {
    e.preventDefault();
    if(!isAdmin){
      confirmarUser();
    } else {
      console.log("Is Admin");
    }
  }

  const confirmarUser = async (e) => {
    if (userName === "") return;
    const userID = await fetch(`../api/login/${userName}`).then(x => x.json());
    if(userID.length === 0) {
      console.log("No existe este usuario"); 
      return;
    }
    console.log("Usuario: ".concat(userID[0].ID_Usuario));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              autoComplete="user"
              autoFocus
              onChange = {(e) => {setUsername(e.target.value)}}
            />
            <FormControlLabel 
              control={<Checkbox />} 
              label="¿Eres Administrador?" 
              onChange = {(e) => {setIsAdmin(!isAdmin)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick = {doSignIn}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

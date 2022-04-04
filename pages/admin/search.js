import React, { useState } from 'react'
import {
    Grid,
    Paper,
    Box,
    Button,
    Container,
    Typography,
    TextField,
    Switch,
    Divider,
    Stack,
    Checkbox,

} from '@mui/material'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'

export default function Search() {

    // Hola
    const [enableIdSearch, setEnableIdSearch] = useState(true);

    function handleSwitchChange() {
        setEnableIdSearch(!enableIdSearch)

    }

    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                    {/** AQUI VA EL SIDEBAR */}
                    <Sidebar />
                </Grid>

                <Grid item xs={10}>
                    <Topbar titleText={'Realizar busqueda de un paciente'} />

                    {/**Dentro de este contenedor de grid es en el cual se despliega todo el contenido de la pagina */}
                    <Container>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <Typography variant='subtitle1'>Favor de llenar los campos como corresponde</Typography>
                            </Grid>

                            <Grid item xs={8}>
                                <Stack spacing={2}>
                                    <Box sx={{
                                        width: '60%'
                                    }}>
                                        <TextField label='Nombre del paciente'
                                            variant='standard'
                                            disabled={!enableIdSearch}
                                            fullWidth />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'baseline', width: '60%' }}>
                                        <TextField
                                            label='ID del paciente'
                                            variant='standard'
                                            helperText={'La busqueda por ID desactivará la consulta por nombre'}
                                            disabled={enableIdSearch}
                                        />
                                        <Switch onChange={handleSwitchChange} />
                                    </Box>
                                    <Box>
                                        <Button variant='contained'>Realizar busqueda</Button>
                                    </Box>
                                </Stack>
                            </Grid>
                                    
                            <Grid item xs={4}>
                                <Paper elevation={4} sx={{
                                    bgcolor: 'gray',

                                }}>
                                    <ul>
                                    <p>Esto es mas por si se nos ofrece un pane aqui con instrucciones de uso algo.
                                    Luego vemos que onda con eso si se borra o no ajajaj</p>
                                        <li>1sdf</li>
                                        <li>1sdf</li>
                                        <li>1sdf</li>
                                        <li>1sdf</li>
                                        <li>1sdf</li>
                                    </ul>
                                </Paper>
                            </Grid>

                            <Grid item xs={8}>
                            </Grid>



                        </Grid>

                        <Divider sx={{marginY: '2em'}} />
                        <Typography variant='body1'>Aqui se despliegan los resultados de la búsqueda?</Typography>

                    </Container>



                </Grid>


                {/** AQUI VA EL CONTENIDO QUE SE IRÁ ACTUALIZANDO */}
                <Grid container>
                    <Grid item xs={3}>


                    </Grid>
                </Grid>







            </Grid>
        </>
    )
}

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
import GridItem from '../../components/GridItem'

export default function Search({res}) {


    const [enableIdSearch, setEnableIdSearch] = useState(true);
    
    // valores de textFields
    const [patientName, setPatientName] = useState("");
    const [patientid, setPatientID] = useState('');

    function handleSwitchChange() {
        setEnableIdSearch(!enableIdSearch)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nombre = {patientName};
        const pacID = {patientid};

        if (pacID.patientid != '') {
            console.log(pacID);
            res = await fetch('/api/userID/' + pacID.patientid).then(res => res.json())
            console.log(res);
        }
        if (nombre.patientName != '') {
            console.log(nombre);
            res = await fetch('/api/userName/' + nombre.patientName).then(res => res.json())
            console.log(res);
        }
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
                                <Typography variant='h6'>Favor de llenar los campos como corresponde</Typography>
                            </Grid>

                            {/** SECCIÓN DE CAMPOS DE BÚSQUEDA */}
                            <Grid item xs={8}>
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
                                            {console.log("el valor es ", patientName)}
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'baseline', width: '60%' }}>
                                        <TextField
                                            label='ID del paciente'
                                            value={patientid}
                                            onChange={(e) => {setPatientID(e.target.value)}}
                                            variant='standard'
                                            helperText={'La busqueda por ID desactivará la consulta por nombre'}
                                            disabled={enableIdSearch} />
                                            {console.log("el valor es ", patientid)}
                                        <Switch onChange={handleSwitchChange} />
                                    </Box>
                                    <Box>
                                        <Button variant='contained' onClick={handleSubmit}>Realizar busqueda</Button>
                                    </Box>
                                </Stack>
                            </Grid>

                            {/** PANEL DE INSTRUCCIONES Y DE INFO ADICIONAL */}
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

                            {/** SECCIÓN DE RESULTADOS CON TABLA */}
                            <Grid item xs={12}>

                                <Divider />
                                <Typography 
                                variant='h6'
                                sx={{ 
                                    marginY: '2em' 
                                    }}>Aqui se despliegan los resultados de la búsqueda?</Typography>
                                <GridItem />
                            </Grid>
                        </Grid>

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

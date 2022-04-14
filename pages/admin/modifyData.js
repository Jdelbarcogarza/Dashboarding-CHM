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
    Slider,
    Autocomplete,

} from '@mui/material'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'

export default function ModifyData() {

    //////////////////////////////////// Constantes useState ////////////////////////////////////

    // Valores para habilitar los switches
    const [enableIdSearch, setEnableIdSearch] = useState(true);

    // Valores de textFields
    const [patientName, setPatientName] = useState("");
    const [patientid, setPatientID] = useState('');

    // Valores de atributo
    const [atributo2, setAtributo2] = useState('');

    // Valores de calificacion
    const [grade, setGrade] = useState(0);

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

        const a2 = {atributo2};
        const g = {grade};

        console.log(a2.atributo2.value);
        console.log(g.grade);

        if (pacID.patientid != '' & !habilitado.enableIdSearch) {
            console.log(pacID);
            const resID = await fetch('/api/update/userID/' + pacID.patientid + '/' + a2.atributo2.value + '/' + g.grade, {method: 'PUT'}).then(resID => resID.json())
            console.log(resID);
        }
        if (nombre.patientName != '' & habilitado.enableIdSearch) {
            console.log(nombre);
            const resNom = await fetch('/api/update/userName/' + nombre.patientName + '/' + a2.atributo2.value + '/' + g.grade, {method: 'PUT'}).then(resNom => resNom.json())
            console.log(resNom);
        }
    }

    const handleAtributo2Change = (event, newAtributo) => {
        setAtributo2(newAtributo);
    };

    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                    {/** AQUI VA EL SIDEBAR */}
                   <Sidebar />
                </Grid>

                <Grid item xs={10}>
                    <Topbar titleText={'Modificar datos de un paciente'} />
                        {/** AQUI VA EL CONTENIDO QUE SE IRÁ ACTUALIZANDO */}

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
                                        <Button variant='contained' onClick={handleSubmit}>Actualizar Datos</Button>
                                    </Box>
                                </Stack>
                            </Grid>

                            <Stack spacing={5} sx={{ width: 400 }}>
                                <Autocomplete
                                    options={atributosPrueba}
                                    groupBy={(option) => option.prueba}
                                    getOptionLabel={(option) => option.atributo}
                                    onChange={handleAtributo2Change}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Seleccione el atributos de la prueba a actualizar"
                                            placeholder="Atributos"
                                        />
                                    )}
                                />

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

                </Grid>

            </Grid>
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
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
import GridItem from '../../components/GridItem'

export default function Search() {

    //////////////////////////////////// Constantes useState ////////////////////////////////////

    // Valores para habilitar los switches
    const [enableIdSearch, setEnableIdSearch] = useState(true);
    const [enableAtributo, setEnableAtributo] = useState(true);
    
    // Valores de textFields
    const [patientName, setPatientName] = useState("");
    const [patientid, setPatientID] = useState('');
    
    // Valores de atributo
    const [atributo, setAtributo] = useState('');
    
    // Valores de calificacion
    const [grade, setGrade] = useState([0, 100]);
    
    // Resultado de query
    const [patientdata, setPatientData]=useState('');

    ///////////////////////////// Funciones y Constantes handle /////////////////////////////

    function handleSwitchChange() {
        setEnableIdSearch(!enableIdSearch)
    }
    
    const handleAtributoChange = (event, newAtributo) => {
        setAtributo(newAtributo);
    };
    
    const handleGradeChange = (event, newGrade) => {
        setGrade(newGrade);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nombre = {patientName};
        const pacID = {patientid};
        const habilitado = {enableIdSearch};

        const a2 = {atributo};
        const g = {grade};

        console.log(a2.atributo.length);

        var i=0; for (i=0; i<a2.atributo.length; i++) {
            console.log(a2.atributo[i].value);
        }

        console.log(g.grade);

        if (pacID.patientid != '' & !habilitado.enableIdSearch) {
            console.log(pacID);
            const resID = await fetch('/api/userID/' + pacID.patientid, {method: 'GET'}).then(resID => resID.json())
            console.log(resID);
            setPatientData(resID);
        }
        if (nombre.patientName != '' & habilitado.enableIdSearch) {
            console.log(nombre);
            const resNom = await fetch('/api/userName/' + nombre.patientName, {method: 'GET'}).then(resNom => resNom.json())
            console.log(resNom);
            setPatientData(resNom);
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

                                <Box>
                                    <Typography id="non-linear-slider" gutterBottom>
                                        Calificación: {grade[0]} - {grade[1]}
                                    </Typography>
                                    <Slider
                                        value={grade}
                                        onChange={handleGradeChange}
                                        valueLabelDisplay="auto"
                                    />
                                </Box>
                            </Stack>

                            {/** SECCIÓN DE RESULTADOS CON TABLA */}
                            <Grid item xs={12}>

                                <Divider/>

                                <div>{JSON.stringify(patientdata)}</div>
                                <div>{patientdata.ID_Usuario}</div>
                                <div>{patientdata.Nombre}</div>

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
    { prueba: 'LWB', atributo: 'LWB', value: 'LWB'},
    { prueba: 'Sarc F', atributo: 'Sarc F', value: 'Sarc_F'},
    { prueba: 'Fuerza', atributo: 'Fuerza', value: 'Fuerza_Domin'},
    { prueba: 'SPPB', atributo: 'SPPB', value: 'SPPB_Global'},
    { prueba: 'CFS Fraility', atributo: 'CFS Fraility', value: 'CFS_Fraility'},
    { prueba: 'Gijon', atributo: 'Gijon', value: 'Gijon'},
];
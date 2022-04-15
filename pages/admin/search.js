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
    Autocomplete,

} from '@mui/material'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import { DataGrid } from '@mui/x-data-grid'

export default function Search() {

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
    { prueba: 'LWB', atributo: 'LWB', value: 'LWB_Total'},
    { prueba: 'Sarc F', atributo: 'Sarc F', value: 'Sarc_F'},
    { prueba: 'Fuerza', atributo: 'Fuerza', value: 'Fuerza_Domin'},
    { prueba: 'SPPB', atributo: 'SPPB', value: 'SPPB_Global'},
    { prueba: 'CFS Fraility', atributo: 'CFS Fraility', value: 'CFS_Fraility'},
    { prueba: 'Gijon', atributo: 'Gijon', value: 'Gijon'},
];
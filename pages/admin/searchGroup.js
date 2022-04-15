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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    NativeSelect,
    FormControlLabel,

} from '@mui/material'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import { DataGrid } from '@mui/x-data-grid'

export default function Search() {

    //////////////////////////////////// Constantes useState ////////////////////////////////////

    // Valores para habilitar los switches
    const [enableCalificacion, setEnableCalificacion] = useState(true);
    const [enableUbi, setEnableUbi] = useState(true);

    // Valores de género
    const [gender, setGender] = useState('A');
    
    // Valores de atributo
    const [atributo, setAtributo] = useState('');
    
    // Valores de calificacion
    const [grade, setGrade] = useState([0, 100]);

    // Valores de edad
    const [age, setAge] = useState([0, 110]);

    // Valores de edad
    const [zona, setZona] = useState('');

    // Valores de edad
    const [decanato, setDecanato] = useState('');

    // Valores de edad
    const [parroquia, setParroquia] = useState('');

    // Valores de edad
    const [gradeAtr, setGradeAtr] = useState('');
    // Verificacion
    const [verif, setVerif] = useState('');
    
    // Resultado de query
    const [patientData, setPatientData]=useState([]);

    ///////////////////////////// Funciones y Constantes handle /////////////////////////////

    function handleSwitchUbi() {
        setEnableUbi(!enableUbi)
    }
    
    const handleAtributoChange = (event, newAtributo) => {
        setAtributo(newAtributo);
    };

    function handleSwitchChange() {
        setEnableCalificacion(!enableCalificacion);
    }

    const handleGradeAtributoChange = (event, newAtributo) => {
        setGradeAtr(newAtributo);
    };

    const handleGradeChange = (event, newGrade) => {
        setGrade(newGrade);
    };

    const handleAgeChange = (event, newAge) => {
        setAge(newAge);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const edad = age[0] + "-" + age[1];

        if (enableCalificacion) {

            var tests = "";

            // Envia "$" si no se selecciono ninguna prueba (por default se seleccionan todas)
            // o concatena todas las pruebas que se seleccionaron en un mismo string
            if (atributo.length == 0) {
                tests = "$"
            }
            else {
                var i=0; for (i=0; i<atributo.length; i++) {
                    if (atributo.length >= 1 ) {
                        tests = tests + "!" + atributo[i].value;
                    }
                }
            }

            if (enableUbi) {
                const res1 = await fetch('/api/searchPrueba/group/prueba/' + gender + '/' + edad + '/' + tests, {method: 'GET'}).then(resID => resID.json())
                console.log(gender);
                console.log(edad);
                console.log(tests);
                console.log(res1);
                setPatientData(res1);
            }
            else if (parroquia != '' & decanato != '' & zona != '') {
                const ubi = parroquia + '-' + decanato + '-' + zona;
                const res2 = await fetch('/api/searchPrueba/group/ubi-prueba/' + gender + '/' + edad + '/' + ubi + '/' + tests, {method: 'GET'}).then(resID => resID.json())
                console.log(gender);
                console.log(edad);
                console.log(ubi);
                console.log(tests);
                console.log(res2);
                setPatientData(res2);
            }

        }
        else if (gradeAtr != verif) {

            const gA = grade[0] + "-" + grade[1] + "-" + gradeAtr.value;

            if (enableUbi) {
                const res3 = await fetch('/api/searchPrueba/group/calif/' + gender + '/' + edad + '/' + gA, {method: 'GET'}).then(resID => resID.json())
                console.log(gender);
                console.log(edad);
                console.log(gA);
                console.log(res3);
                setPatientData(res3);
            }
            else if (parroquia != '' & decanato != '' & zona != '') {
                const ubi = parroquia + '-' + decanato + '-' + zona;
                const res4 = await fetch('/api/searchPrueba/group/ubi-calif/' + gender + '/' + edad + '/' + ubi + '/' + gA, {method: 'GET'}).then(resID => resID.json())
                console.log(gender);
                console.log(edad);
                console.log(ubi);
                console.log(gA);
                console.log(res4);
                setPatientData(res4);
            }
        }
    }

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
                                <Stack spacing={4}>
                                    <Box sx={{ width: 300 }}>
                                        <FormControl fullWidth>
                                            <InputLabel variant='standard' htmlFor="uncontrolled-native">Género</InputLabel>
                                            <NativeSelect 
                                                defaultValue={'A'}
                                                onChange={(e) => {setGender(e.target.value)}}
                                                inputProps={{
                                                    name: 'Género',
                                                    id: 'uncontrolled-native',
                                                }}> 
                                                <option value={'H'}>Hombre</option>
                                                <option value={'M'}>Mujer</option>
                                                <option value={'A'}>Todos</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'baseline', width: 300 }}>
                                        <Box sx={{ width: 300 }}>
                                            <Typography id="non-linear-slider" gutterBottom>
                                                Edad: {age[0]} - {age[1]}
                                            </Typography>
                                            <Slider
                                                value={age}
                                                onChange={handleAgeChange}
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={110}
                                            />
                                        </Box>
                                    </Box>

                                    <FormControlLabel
                                        control={<Switch color="primary" onChange={handleSwitchUbi}/>}
                                        label="Habilitar filtro por ubicación"
                                        labelPlacement="end"
                                    />

                                    <Box sx={{ width: '60%' }}>
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                                            <InputLabel>Zona</InputLabel>
                                            <Select
                                                value={zona}
                                                label="Zona"
                                                onChange={(e) => {setZona(e.target.value)}}
                                                disabled={enableUbi}
                                                >
                                                <MenuItem value={1}>Zona 1</MenuItem>
                                                <MenuItem value={2}>Zona 2</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Box sx={{ width: '60%' }}>
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                                            <InputLabel>Decanato</InputLabel>
                                            <Select
                                                value={decanato}
                                                label="Decanato"
                                                onChange={(e) => {setDecanato(e.target.value)}}
                                                disabled={enableUbi}
                                                >
                                                <MenuItem value={1}>Decanato 1</MenuItem>
                                                <MenuItem value={2}>Decanato 2</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Box sx={{ width: '60%' }}>
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                                            <InputLabel>Parroquia</InputLabel>
                                            <Select
                                                value={parroquia}
                                                label="Parroquia"
                                                onChange={(e) => {setParroquia(e.target.value)}}
                                                disabled={enableUbi}
                                                >
                                                <MenuItem value={1}>Parroquia 1</MenuItem>
                                                <MenuItem value={2}>Parroquia 2</MenuItem>
                                            </Select>
                                        </FormControl>
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
                                    disabled={!enableCalificacion}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Seleccione los atributos de la prueba"
                                            placeholder="Atributos"
                                        />
                                    )}
                                />

                                    <FormControlLabel
                                        control={<Switch color="primary" onChange={handleSwitchChange}/>}
                                        label="Habilitar filtro por calificación"
                                        labelPlacement="end"
                                    />

                                <Box>
                                    <Typography id="non-linear-slider" gutterBottom>
                                        Calificación: {grade[0]} - {grade[1]}
                                    </Typography>
                                    <Slider
                                        value={grade}
                                        onChange={handleGradeChange}
                                        valueLabelDisplay="auto"
                                        disabled={enableCalificacion}
                                    />
                                </Box>

                                <Autocomplete
                                    options={atributosPrueba}
                                    groupBy={(option) => option.prueba}
                                    getOptionLabel={(option) => option.atributo}
                                    onChange={handleGradeAtributoChange}
                                    disabled={enableCalificacion}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Seleccione el atributos de la prueba a actualizar"
                                            placeholder="Atributos"
                                        />
                                    )}
                                />

                                <Button href={'search'} variant='contained'>Busqueda Especifica</Button>

                            </Stack>

                            {/** SECCIÓN DE RESULTADOS CON TABLA */}
                            <Grid item xs={12}>

                                <Divider/>

                                <Typography 
                                variant='h6'
                                sx={{ 
                                    marginY: '2em' 
                                    }}>Aqui se despliegan los resultados de la búsqueda?</Typography>

                                    <DataGrid
                                        getRowId={(id) => id.ID_Usuario} // Asigna que el id unico es el atributo ID_Usuario
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
    { prueba: 'Reloj', atributo: 'Reloj', value: 'Reloj', key: 'A'},
    { prueba: 'MMSE', atributo: 'Orientacion Temporal', value: 'Orient_Temp', key: 'B'},
    { prueba: 'MMSE', atributo: 'Orientacion Espacial', value: 'Orient_Esp', key: 'C'},
    { prueba: 'MMSE', atributo: 'Registro', value: 'Registro', key: 'D'},
    { prueba: 'MMSE', atributo: 'Calculo', value: 'Calculo', key: 'E'},
    { prueba: 'MMSE', atributo: 'Memoria', value: 'Memoria', key: 'F'},
    { prueba: 'MMSE', atributo: 'Eject', value: 'Eject', key: 'G'},
    { prueba: 'GDS', atributo: 'GDS', value: 'GDS_Total', key: 'H'},
    { prueba: 'Katz', atributo: 'Katz', value: 'Katz_Total', key: 'I'},
    { prueba: 'LWB', atributo: 'LWB', value: 'LWB_Total', key: 'J'},
    { prueba: 'Sarc F', atributo: 'Sarc F', value: 'Sarc_F', key: 'K'},
    { prueba: 'Fuerza', atributo: 'Fuerza', value: 'Fuerza_Domin', key: 'L'},
    { prueba: 'SPPB', atributo: 'SPPB', value: 'SPPB_Global', key: 'M'},
    { prueba: 'CFS Fraility', atributo: 'CFS Fraility', value: 'CFS_Fraility', key: 'N'},
    { prueba: 'Gijon', atributo: 'Gijon', value: 'Gijon', key: 'O'},
];
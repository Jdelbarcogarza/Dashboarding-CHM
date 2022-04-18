import React, {useState} from 'react'
import {
    Grid,
    Paper,
    Box,
    Container,
    Button,
    IconButton,
    Stack,
    Input,

} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'

export default function LoadData() {

    // Constante que guardan la info del archivo
    const [document, setDocument] = useState();

    // Constante que guarda el estatus de la carga del archivo
    const [estatus, setEstatus] = useState();

    async function handleOnSubmit(e) {
        e.preventDefault();

        setEstatus("");
        
        try {
            // Despliega la info del archivo
            console.log(document);

            // Se obtiene el nombre del archivo
            const name = document.name;
    
            // Se convierte en un FormData
            const formData = new FormData();
    
            // Se le adjunta el archivo a cargar
            formData.append("file",document);
    
            // Endpoint que carga el archivo en los docs del proyecto
            const resUpload = await fetch('/api/uploadData/uploadExcel', { 
                method: 'POST',
                body: formData,
            });

            // Procede a cargar los datos procesados del Excel en la base de datos
            if (resUpload.status == 200) {
                setTimeout(2000);
                const resTxt = await fetch('/api/uploadData/readTxt', {method: 'POST'});

                if (resTxt.status == 200) {
                    setEstatus("Archivo cargado exitosamente");
                }
            }
    
            // Verifica que el archivo haya sido subido exitosamente
            // para proceder a correr el archivo de Python
            if (resUpload.status == 200) {
                const resCall = await fetch('/api/uploadData/callPython', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre: name })
                });
            }

        } catch (err) {
            setEstatus("Necesita cargar un archivo");
        }
    }

    function handleOnChange(e) {
        setDocument(e.target.files[0]);
    }

    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                    {/** AQUI VA EL SIDEBAR */}
                    <Sidebar />
                </Grid>

                <Grid item xs={10}>
                    <Topbar titleText={'Cargar nuevos datos a la plataforma'} />
                    {/** AQUI VA EL CONTENIDO QUE SE IRÁ ACTUALIZANDO */}

                    <Container>
                        <Stack direction="row" spacing={2}>
                            <label htmlFor="contained-button-file">
                                <Input accept="xlsx/*" type="file" onChange={handleOnChange} />
                            </label>
                            
                            <Button variant="contained" startIcon={<CloudUploadIcon />} onClick={handleOnSubmit}>
                                Upload
                            </Button>

                        </Stack>

                        {estatus}

                    </Container>
                </Grid>

            </Grid>
        </>
    )
}

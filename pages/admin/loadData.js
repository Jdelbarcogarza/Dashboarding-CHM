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
import { NextLink } from 'next/Link'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import DownloadIcon from '@mui/icons-material/Download';

export default function LoadData() {

    // Constante que guardan la info del archivo
    const [document, setDocument] = useState();

    // Constante que guarda el estatus de la carga del archivo
    const [estatus, setEstatus] = useState();

    async function handleUpload(e) {
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
            
            // Verifica que el archivo haya sido subido exitosamente
            // para proceder a correr el archivo de Python
            if (resUpload.status == 200) {
                const resCall = await fetch('/api/uploadData/callPython', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre: name })
                });

                // Procede a cargar los datos procesados del Excel en la base de datos
                //setTimeout(2000);
                const resTxt = await fetch('/api/uploadData/readTxt');
                if (resTxt.status == 200) {
                    setEstatus("Archivo cargado exitosamente");
                }
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
                        <Stack spacing={5}>
                            <Stack direction="row" spacing={2}>
                                <label htmlFor="contained-button-file">
                                    <Input accept=".xls, .xlsx" type="file" onChange={handleOnChange} />
                                </label>
                                
                                <Button variant="contained" startIcon={<CloudUploadIcon/>} onClick={handleUpload} download="example.xlsx">
                                    Upload
                                </Button>

                            </Stack>

                            {estatus}

                            <Button sx={{ width: 300 }} variant="contained" startIcon={<DownloadIcon/>} href="http://localhost:3000/api/download/example" >
                                Download
                            </Button>
                        </Stack>

                    </Container>
                </Grid>

            </Grid>
        </>
    )
}

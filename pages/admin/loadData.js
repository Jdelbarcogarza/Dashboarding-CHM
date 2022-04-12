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

    const handleSubmit = async (e) => {
        
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
                                <Input accept="image/*" id="contained-button-file" type="file" />
                            </label>
                            
                            <Button variant="contained" startIcon={<CloudUploadIcon />} onClick={handleSubmit}>
                                Upload
                            </Button>
                        </Stack>
                    </Container>
                </Grid>

            </Grid>
        </>
    )
}

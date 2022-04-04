import React from 'react'
import {
    Grid,
    Paper,
    Box,
    Container,

} from '@mui/material'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'


export default function LoadData() {
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
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <Paper sx={{bgcolor: 'red'}}>This is placeholder text</Paper>
                            </Grid>
                        </Grid>
                    </Container>

                </Grid>

            </Grid>
        </>
    )
}

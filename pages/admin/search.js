import React from 'react'
import {
    Grid,
    Paper,
    Box,
    Button,
    Container
} from '@mui/material'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'

export default function search() {
    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                    {/** AQUI VA EL SIDEBAR */}
                    <Sidebar />
                </Grid>

                <Grid item xs={10}>
                    <Topbar titleText={'Realizar busqueda de un paciente'} />

                    {/**Este contenedor de grid es en el cual se despliega todo el contenido de la pagina */}
                    <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Paper sx={{
                                bgcolor: 'red',

                            }}> qp</Paper>
                        </Grid>

                        <Grid item xs={6}>
                            <Paper sx={{
                                bgcolor: 'green',

                            }}> qp</Paper>
                        </Grid>

                        <Grid item xs={8}>
                            <Paper sx={{
                                bgcolor: 'gray',

                            }}> qp</Paper>
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

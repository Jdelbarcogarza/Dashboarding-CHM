import React from 'react'
import {
    Grid,
    Paper,
    Box
} from '@mui/material'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'

export default function ModifyData() {
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
                   
                </Grid>

            </Grid>
        </>
    )
}

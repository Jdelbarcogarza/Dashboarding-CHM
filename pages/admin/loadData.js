import React from 'react'
import {
    Grid,
    Paper,
    Box
} from '@mui/material'
import Sidebar from '../../components/Sidebar'

export default function loadData() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    {/** AQUI VA EL SIDEBAR */}
                   <Sidebar />
                </Grid>

                <Grid item xs={10}>
                    {/** AQUI VA EL CONTENIDO QUE SE IRÁ ACTUALIZANDO */}
                   
                </Grid>

            </Grid>
        </>
    )
}

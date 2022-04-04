import React from 'react'
import {
    Grid,
    Paper,
    Box
} from '@mui/material'
import Sidebar from '../../components/Sidebar'
import { DataGrid } from '@mui/x-data-grid';


export default function Home() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    {/** AQUI VA EL SIDEBAR */}
                   <Sidebar />
                </Grid>

                <Grid item xs={10}>
                    {/** AQUI VA EL CONTENIDO QUE SE IRÁ ACTUALIZANDO */}
                   
                    <DataGrid />
                </Grid>

            </Grid>
        </>
    )
}

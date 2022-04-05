import React from 'react'
import {
    Grid,
    Paper,
    Box
} from '@mui/material'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'

import { DataGrid } from '@mui/x-data-grid';


export default function Home() {
    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                    {/** AQUI VA EL SIDEBAR */}
                    <Sidebar />
                </Grid>

                <Grid item xs={10}>
                    {/** AQUI VA EL CONTENIDO QUE SE IRÁ ACTUALIZANDO */}
                    <Topbar titleText={'Bienvenido a la plataforma'} />
                    {/**Aqui va a ir el componente de data grid para una vista general de todos los pacientes */}
                </Grid>

            </Grid>
        </>
    )
}

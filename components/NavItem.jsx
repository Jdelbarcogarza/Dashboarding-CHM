import React from 'react'
import { NextLink } from 'next/Link'
import {
    Link,
    Box,
    Typography
} from '@mui/material'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

export default function NavItem() {
    return (
        <>
            <Link
                sx={{
                    width: '100%',
                }}
                /** El componente link hereda la funcionalidad de NextLink con el prop 'component'*/
                component={NextLink}
                underline="none"
                color="black"
                href='/'>
                <Box  padding={2} sx={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: 'skyblue',
                    display: 'flex',
                    // TODO: 1. On hover change color 2. cursor does not change.
                    borderRadius: '5px'
                }}>
                    {/** Aqui va a ir el icono especifico para cada seccion de nuestra pagina */}
                    <AddLocationAltIcon />

                    <Typography 
                        variant='subtitle'
                        ml={2}>Nav item</Typography>
                </Box>
            </Link>
        </>
    )
}

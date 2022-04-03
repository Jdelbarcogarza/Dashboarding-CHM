import React from 'react'
import { NextLink } from 'next/Link'
import {
    Link,
    Container,
    Box
} from '@mui/material'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

export default function NavItem() {
    return (
        <>
            <Box my={1} padding={1} sx={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'skyblue',
                display: 'flex',
                borderColor: 'black',
                borderStyle: 'solid',
                borderRadius: '5px'
            }}>
             {/** Aqui va a ir el icono especifico para cada seccion de nuestra pagina */}
                <AddLocationAltIcon />

                <Link pl={2}
                    sx={{
                        width: '100%',
                    }}
                /** El componente link hereda la funcionalidad de NextLink con el prop 'component'*/
                    component={NextLink} 
                    underline="none"
                    color="black"
                    href='/'>
                    Nav item
                </Link>

            </Box>
        </>
    )
}

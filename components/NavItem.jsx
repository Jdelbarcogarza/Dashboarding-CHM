import React from 'react'
import { NextLink } from 'next/Link'
import {
    Link,
    Box,
    Typography
} from '@mui/material'


export default function NavItem({name, icon, route}) {
    return (
        <>

        {/** VARIANTE DE ALGO QUE PODR[IA FUNCIONAR PARA SER MAS CONSISTENTES
        <Button
                href={route}
                component={NextLink}
                variant='text'
                startIcon={icon}
                sx={{
                    padding: '1em',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    
                }}
                >{name}</Button>
                 */}

            <Link
                sx={{
                    cursor: 'default',
                    width: '100%',
                    borderRadius: '5px',
                    ':hover': {
                        backgroundColor: 'skyblue',
                    },
                }}
                /** El componente link hereda la funcionalidad de NextLink con el prop 'component'*/
                component={NextLink}
                underline="none"
                color="black"
                href={route}>
                <Box  padding={2} sx={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    display: 'flex',
                    borderRadius: '10px'
                }}>
                    {/** Aqui va a ir el icono especifico para cada seccion de nuestra pagina */}
                    {icon}

                    <Typography 
                        variant='subtitle'
                        ml={2}>{name}</Typography>
                </Box>
            </Link>
        </>
    )
}

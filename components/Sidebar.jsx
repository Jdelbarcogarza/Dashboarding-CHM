import React from 'react'
import {
    Paper,
    Box,
    Stack,
    Container
} from '@mui/material'
import NavItem from '/components/NavItem'
import Image from 'next/image'

export default function Sidebar() {
    return (

        <Paper sx={{
            bgcolor: "red",
        }}>
            <Box p={1} sx={{
                height: '100vh',
                justifyContent: 'center',
            }}>
                <Stack
                    sx={{
                        justifyContent: 'center',
                    }}
                >
                    {/** AQUI DEBE DE IR LA FOTO DEL HOSPITAL UNIVERSITARIO */}
                    <Container sx={{
                        objectFit: 'contain',
                        // TODO: debes defiinir minWidth y maxWidth.
                    }}>
                        <Image
                            src={'http://sds.uanl.mx/wp-content/uploads/2020/01/logo-facultad-de-medicina.png'}
                            alt={"Logo de facultad de medicina"}
                            width={'200px'}
                            height={'90px'}
                        />
                    </Container>

                    
                        <NavItem />
                        <NavItem />
                        <NavItem />
                        <NavItem />
                    
                </Stack>
            </Box>
        </Paper>
    )
}

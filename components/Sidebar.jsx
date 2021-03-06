import React from 'react'
import {
    Paper,
    Box,
    Stack,
    Button,
    Divider
} from '@mui/material'
import NavItem from '/components/NavItem'
import Image from 'next/image'

// Iconos
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export default function Sidebar() {

    /** Este es un arreglo de diccionarios. Cada diccionario contiene:
     *  Nombre de pagina, icono svg y la ruta a la pagina a la que se refiere el nombre.
     */
    const sidebarElements = [
        { name: 'Inicio', icon: HomeOutlinedIcon, route: 'home' },
        { name: 'Realizar consulta', icon: PersonSearchOutlinedIcon, route: 'search' },
        { name: 'Cargar datos', icon: CloudUploadOutlinedIcon, route: 'loadData' },
        { name: 'Modificar datos', icon: EditOutlinedIcon, route: 'modifyData' }
    ];

    return (

        <Paper sx={{
            borderRadius: '0px',
            height: '100%'
        }}>
            <Box p={1} sx={{
                justifyContent: 'center',
            }}>
                <Stack
                    sx={{
                        justifyContent: 'space-between',
                        display: 'flex',

                    }}
                >
                    {/** AQUI DEBE DE IR LA FOTO DEL HOSPITAL UNIVERSITARIO */}
                    <Box sx={{
                        objectFit: 'contain',
                        display: 'flex',
                        justifyContent: 'center',
                        marginY: '0.5em'
                        // TODO: debes definir minWidth y maxWidth.
                    }}>
                        <Image
                            src={'http://sds.uanl.mx/wp-content/uploads/2020/01/logo-facultad-de-medicina.png'}
                            alt={"Logo de facultad de medicina"}
                            width={'200%'}
                            height={'90%'}
                        />
                    </Box>

                    {
                        /* ESTO DEBERIA DE FUNCIONAR Y NO SE PORQUE NO LO HACE
                        {sidebarElements.map((element, id) => {
                            <NavItem
                                key={id}
                                name={element.name}
                                icon={element.icon}
                                route={element.route} />
                                
                        })}
                        */
                    }
                    <Divider />

                    <NavItem name={'Inicio'} icon={<HomeOutlinedIcon />} route={'home'} />
                    <NavItem name={'Realizar consulta'} icon={<PersonSearchOutlinedIcon />} route={'search'} />
                    <NavItem name={'Cargar datos'} icon={<CloudUploadOutlinedIcon />} route={'loadData'} />
                    <NavItem name={'Modificar datos'} icon={<EditOutlinedIcon />} route={'modifyData'} />

                    <Divider />

                    <Button
                        variant='outlined'
                        size={'small'}
                        startIcon={<ArrowBackOutlinedIcon />}
                        sx={{
                            my: '1em'
                        }}
                        >Cerrar sesi??n</Button>
                </Stack>


            </Box>
        </Paper>
    )
}

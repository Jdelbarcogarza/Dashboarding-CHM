import {connection} from '../../../../../../config/db';

export default async function handler(req, res) {
    if (req.method == 'PUT') {
        // Buscar ID
        const consulta = 'SELECT ID_Usuario FROM usuario WHERE Nombre = ?'
        const [rows] = await connection.query(consulta,[req.query.user])

        // Realizar update
        const update = 'UPDATE resultadostamizaje SET ' + req.query.prueba + ' = ' + req.query.cal + ' WHERE ID_Usuario = ?';
        const r = await connection.query(update,[rows[0].ID_Usuario])
        console.log('exito')
        return res.status(200).json(r)
    }
};
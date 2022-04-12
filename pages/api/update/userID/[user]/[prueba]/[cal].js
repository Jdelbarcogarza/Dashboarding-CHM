import {connection} from '../../../../../../config/db';

export default async function handler(req, res) {
    if (req.method == 'PUT') {
        const consulta = 'UPDATE resultadostamizaje SET ' + req.query.prueba + ' = ' + req.query.cal + ' WHERE ID_Usuario = ?';
        const r = await connection.query(consulta,[req.query.user])
        console.log('exito')
        return res.status(200).json(r)
    }
};
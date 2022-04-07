import {connection} from '../../../config/db';

export default async function handler(req, res) {
    const consulta = 'SELECT resultadostamizaje.' + req.query.prueba + ' FROM resultadostamizaje, usuario WHERE usuario.ID_Usuario = resultadostamizaje.ID_Usuario AND resultadostamizaje.ID_Usuario = ' + req.query.patientID;
    const [rows] = await connection.query(consulta)
    console.log(rows)
    return res.status(200).json(rows)
};
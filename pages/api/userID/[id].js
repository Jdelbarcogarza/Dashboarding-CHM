import {connection} from '../../../config/db';

export default async function handler(req, res) {
    const [rows] = await connection.query('SELECT * FROM usuario, resultadostamizaje WHERE usuario.ID_Usuario = ? AND usuario.ID_Usuario = resultadostamizaje.ID_Usuario', [req.query.id])
    console.log(rows[0])
    return res.status(200).json(rows[0])
};
import {connection} from '../../../config/db';

export default async function handler(req, res) {
    const [rows] = await connection.query('SELECT * FROM usuario WHERE Nombre = ?', [req.query.name])
    console.log(rows)
    return res.status(200).json(rows)
};
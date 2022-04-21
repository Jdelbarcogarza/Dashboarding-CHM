import {connection} from '../../../../../../config/db';

export default async function handler(req, res) {
    try {
        if (req.method == 'PUT') {
            // Buscar ID
            const consulta = `SELECT ID_Usuario FROM usuario WHERE Nombre = "${req.query.user}"`
            const [rows] = await connection.query(consulta)
    
            // Realizar update
            const update = `UPDATE resultadostamizaje SET ${req.query.prueba} = ${req.query.cal} WHERE ID_Usuario = "${rows[0].ID_Usuario}"`;
            const r = await connection.query(update)
            console.log('exito')
            return res.status(200).json({"msg": "Actualización exitosa"})
        }
    }
    catch {
        return res.status(500).json({"msg": "Actualización fallida"})
    }
};
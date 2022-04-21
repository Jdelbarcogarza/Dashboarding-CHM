import {connection} from '../../../../../../config/db';

export default async function handler(req, res) {
    try {
        if (req.method == 'PUT') {
            const consulta = `UPDATE resultadostamizaje SET ${req.query.prueba} = ${req.query.cal} WHERE ID_Usuario = "${req.query.user}"`;
            const r = await connection.query(consulta)
            console.log('exito')
            return res.status(200).json({"msg": "Actualización exitosa"})
        }
    }
    catch {
        return res.status(500).json({"msg": "Actualización fallida"})
    }
};
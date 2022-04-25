import {connection} from '../../../../config/db';

export default async function handler(req, res) {
    try {
        if (req.method == 'PUT') {
            // Buscar ID
            const consulta = `SELECT ID_Usuario FROM usuario WHERE Nombre = "${req.query.user}"`
            const [rows] = await connection.query(consulta)

            const verificacion = `SELECT * FROM resultadostamizaje WHERE ID_Usuario = "${rows[0].ID_Usuario}" AND Fecha LIKE "${req.body.fechaDate}%"`
            const [ver] = await connection.query(verificacion)
            console.log(ver)

            if (ver.length != 0) {
                // Realizar update
                const update = `UPDATE resultadostamizaje SET ${req.body.prueba} = ${req.body.cal} WHERE ID_Usuario = "${rows[0].ID_Usuario}" AND Fecha LIKE "${req.body.fechaDate}%"`;
                const r = await connection.query(update)
                console.log(r)
                console.log('exito')
                return res.status(200).json({"msg": "Actualización exitosa"})
            }
            return res.status(500).json({"msg": "Actualización fallida"})
        }
    }
    catch {
        return res.status(500).json({"msg": "Actualización fallida"})
    }
};
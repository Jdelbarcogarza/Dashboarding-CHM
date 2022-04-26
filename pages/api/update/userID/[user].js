import {connection} from '../../../../config/db';

export default async function handler(req, res) {
    try {
        if (req.method == 'PUT') {

            const verificacion = `SELECT * FROM resultadostamizaje WHERE ID_Usuario = "${req.query.user}" AND Fecha LIKE "${req.body.fechaDate}%"`
            const [ver] = await connection.query(verificacion)
            console.log(ver)

            if (ver.length != 0) {
                const consulta = `UPDATE resultadostamizaje SET ${req.body.prueba} = ${req.body.cal} WHERE ID_Usuario = "${req.query.user}" AND Fecha LIKE "${req.body.fechaDate}%"`;
                const r = await connection.query(consulta)
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
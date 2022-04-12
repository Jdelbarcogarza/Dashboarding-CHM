import {connection} from '../../../../../../../config/db';

export default async function handler(req, res) {
    const consulta = 'SELECT usuario.ID_Usuario, usuario.Nombre, usuario.Año_Nac, usuario.Id_Parroquia, ' + req.query.prueba1 + ', ' + req.query.prueba2 + ', ' + req.query.prueba3 + ' FROM usuario, resultadostamizaje WHERE usuario.ID_Usuario = resultadostamizaje.ID_Usuario AND resultadostamizaje.ID_Usuario = ' + req.query.patientID;
    const [rows] = await connection.query(consulta)
    console.log(rows[0])
    return res.status(200).json(rows[0])
};
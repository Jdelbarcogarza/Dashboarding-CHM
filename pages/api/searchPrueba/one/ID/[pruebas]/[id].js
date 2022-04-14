import {connection} from '../../../../../../config/db';

export default async function handler(req, res) {

    var test = req.query.pruebas;

    if (test == "$") {
        var consulta = 'SELECT * FROM usuario, resultadostamizaje WHERE usuario.ID_Usuario = resultadostamizaje.ID_Usuario AND usuario.ID_Usuario = ?';
    }
    else {
        test = test.replace(/!/g,',');
        var consulta = 'SELECT usuario.ID_Usuario, usuario.Nombre, usuario.Año_Nac, usuario.Genero, usuario.ID_Parroquia, resultadostamizaje.ID_Resultado ' + test + ' FROM usuario, resultadostamizaje WHERE usuario.ID_Usuario = resultadostamizaje.ID_Usuario AND usuario.ID_Usuario = ?';
    }

    const [rows] = await connection.query(consulta, [req.query.id])
    
    console.log(rows)
    return res.status(200).json(rows)
};
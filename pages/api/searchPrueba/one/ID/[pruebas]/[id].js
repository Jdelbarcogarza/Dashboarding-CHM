import {connection} from '../../../../../../config/db';

export default async function handler(req, res) {

    try {
        var test = req.query.pruebas;

        if (test == "$") {
            var consulta = `SELECT * FROM usuario, resultadostamizaje WHERE usuario.ID_Usuario = resultadostamizaje.ID_Usuario AND usuario.ID_Usuario = "${req.query.id}"`;
        }
        else {
            test = test.replace(/!/g,',');
            var consulta = `SELECT usuario.ID_Usuario, usuario.Nombre, usuario.Año_Nac, usuario.Genero, usuario.ID_Parroquia, resultadostamizaje.ID_Resultado, resultadostamizaje.Fecha ${test} FROM usuario, resultadostamizaje WHERE usuario.ID_Usuario = resultadostamizaje.ID_Usuario AND usuario.ID_Usuario = "${req.query.id}"`;
        }
    
        const [rows] = await connection.query(consulta);
        
        console.log(rows);
        return res.status(200).json(rows);
    }
    catch {
        return res.status(500).json({"msg":"No se pudo realizar la consulta con exito"});
    }
};
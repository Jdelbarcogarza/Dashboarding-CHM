import {connection} from '../../../../../config/db';

export default async function handler(req, res) {

    try {
        var consulta = `SELECT * FROM usuario, resultadostamizaje WHERE usuario.ID_Usuario = resultadostamizaje.ID_Usuario AND usuario.ID_Usuario = "${req.query.id}"`;
    
        const [rows] = await connection.query(consulta);
        
        console.log(rows);
        return res.status(200).json(rows);
    }
    catch {
        return res.status(500).json({"msg":"No se pudo realizar la consulta con exito"});
    }
};
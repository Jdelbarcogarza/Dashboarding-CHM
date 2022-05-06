import {connection} from '../../../config/db';
import fs from 'fs'

export default async function handler(req, res) {
    try {
        // Path en donde se encuentra el archivo txt
        const dir = './public/updateDatabase/commands.txt';
    
        // Lee y obtiene los datos del archivo txt
        const data = fs.readFileSync(dir, 'utf8');
    
        // Vuelve una lista cada línea del archivo txt
        const lines = data.split(/\r?\n/);

        if (lines.length != 1) {
            for (var i = 0; i < lines.length - 1; i++) {
        
                // Cada query de una línea del archivo la vuelve una lista
                var query = lines[i].split("$");
                console.log(query)
        
                // Comprueba si el paciente existe
                var [rows] = await connection.query('CALL ' + query[0]);
                var id = rows[0];
                
                // Si no existe el paciente, se inserta
                if (id.length == 0) {
                    console.log("No se encontro usuario");
                    
                    // Inserta el nuevo usuario
                    [rows] = await connection.query('CALL ' + query[2]);
        
                    // Busca el nuevo usuario insertado
                    [rows] = await connection.query('CALL ' + query[0]);
        
                    // Extrae los valores necesarios (ID) para el query
                    id = rows[0];
                    id = id[0];
                    id = id.ID_Usuario;
                    var query1 = query[3].substring(0,19);
                    var query2 = query[3].substring(19,query[3].length);
        
                    // Se inserta el resultado de tamizaje
                    [rows] = await connection.query('CALL ' + query1 + id + query2);
                }
                else {
                    // Si existe el paciente, se verifica que la prueba no exista
                    console.log("Se encontro usuario");
                    [rows] = await connection.query('CALL ' + query[1]);
        
                    // Si no existe la prueba, se inserta
                    if (rows[0].length == 0) {
        
                        console.log("No se encontro una prueba existente, se procede a insertar");
        
                        // Extrae los valores necesarios para el query
                        id = id[0];
                        id = id.ID_Usuario;
        
                        // Se inserta el resultado de tamizaje
                        var query1 = query[3].substring(0,25);
                        var query2 = query[3].substring(25,query[3].length);
                        [rows] = await connection.query('CALL ' + query1 + id + query2);
                    }
                }
            }
            return res.status(200).json({"msg":"File was read successfully"});
        }
        else {
            return res.status(500).json({"msg":"The file was empty"});
        }
    }
    catch {
        return res.status(500).json({"msg":"There was a problem reading the file"});
    }
}
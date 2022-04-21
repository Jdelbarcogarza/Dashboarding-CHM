import {connection} from '../../../../../../../../config/db';

export default async function handler(req, res) {

    try {
        const gender = req.query.gender;
        var age = req.query.age;
        var test = req.query.test;
        var ubi = req.query.ubi;
    
        const fecha = new Date(Date.now());
        const anioActual = fecha.getFullYear();
        
        ubi = ubi.split('-');
        age = age.split('-');
    
        const age1 = anioActual-age[0];
        const age2 = anioActual-age[1];
        var conGen = '';
    
        if (gender != "A") {
            conGen = ` AND usuario.Genero = "${gender}"`;
        }
    
        if (test == "$") {
            const allPrueba = ',Reloj,Orient_Temp,Orient_Esp,Registro,Calculo,Memoria,Eject,GDS_Total,Katz_Total,LWB_Total,Sarc_F,Fuerza_Domin,SPPB_Global,CFS_Fraility,Gijon';
            var consulta = `SELECT usuario.ID_Usuario, usuario.Nombre, usuario.Año_Nac, usuario.Genero, usuario.ID_Parroquia, parroquia.ID_Decanato, decanato.ID_Zona, resultadostamizaje.ID_Resultado ${allPrueba} FROM usuario, parroquia, decanato, zona, resultadostamizaje WHERE usuario.ID_Usuario = resultadostamizaje.ID_Usuario AND usuario.ID_Parroquia = parroquia.ID_Parroquia AND parroquia.ID_Decanato = decanato.ID_Decanato AND decanato.ID_Zona = zona.ID_Zona AND usuario.Año_Nac <= ${age1} AND usuario.Año_Nac >= ${age2}`;
        }
        else {
            test = test.replace(/!/g,',');
            var consulta = `SELECT usuario.ID_Usuario, usuario.Nombre, usuario.Año_Nac, usuario.Genero, usuario.ID_Parroquia, parroquia.ID_Decanato, decanato.ID_Zona, resultadostamizaje.ID_Resultado ${test} FROM usuario, resultadostamizaje, zona, decanato, parroquia WHERE usuario.ID_Usuario = resultadostamizaje.ID_Usuario AND usuario.ID_Parroquia = parroquia.ID_Parroquia AND parroquia.ID_Decanato = decanato.ID_Decanato AND decanato.ID_Zona = zona.ID_Zona AND usuario.Año_Nac <= ${age1} AND usuario.Año_Nac >= ${age2}`;
            console.log(test);
        }
    
        const ubicacion = ` AND parroquia.ID_Parroquia = ${ubi[0]} AND decanato.ID_Decanato = ${ubi[1]} AND zona.ID_Zona = ${ubi[2]}`;
    
        const [rows] = await connection.query(consulta + ubicacion + conGen);
        
        console.log(rows);
        return res.status(200).json(rows);
    }
    catch {
        return res.status(500).json({"msg":"No se pudo realizar la consulta con exito"});
    }
};
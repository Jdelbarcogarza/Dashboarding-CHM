import {connection} from '../../../../../../../../config/db';

export default async function handler(req, res) {

    const gender = req.query.gender;
    var age = req.query.age;
    var ubi = req.query.ubi;
    var atrGrade = req.query.atrGrade;

    const fecha = new Date(Date.now());
    const anioActual = fecha.getFullYear();
    
    ubi = ubi.split('-');
    atrGrade = atrGrade.split('-');
    age = age.split('-');

    const age1 = anioActual-age[0];
    const age2 = anioActual-age[1];
    var conGen = '';

    if (gender != "A") {
        conGen = ' AND usuario.Genero = "' + gender + '"';
    }

    var consulta = 'SELECT usuario.ID_Usuario, usuario.Nombre, usuario.Año_Nac, usuario.Genero, usuario.ID_Parroquia, parroquia.ID_Decanato, decanato.ID_Zona, resultadostamizaje.ID_Resultado, ' + atrGrade[2] + ' FROM usuario, resultadostamizaje, zona, decanato, parroquia WHERE usuario.ID_Usuario = resultadostamizaje.ID_Usuario AND usuario.ID_Parroquia = parroquia.ID_Parroquia AND parroquia.ID_Decanato = decanato.ID_Decanato AND decanato.ID_Zona = zona.ID_Zona AND usuario.Año_Nac <= ' + age1 + ' AND usuario.Año_Nac >= ' + age2;
    const gradeAtrFilter = ' AND ' + atrGrade[2] + ' >= ' + atrGrade[0] + ' AND ' + atrGrade[2] + ' <= ' + atrGrade[1];
    const ubicacion = ' AND parroquia.ID_Parroquia = ' + ubi[0] + ' AND decanato.ID_Decanato = ' + ubi[1] + ' AND zona.ID_Zona = ' + ubi[2];

    const [rows] = await connection.query(consulta + conGen + gradeAtrFilter + ubicacion)
    
    console.log(rows)
    return res.status(200).json(rows)
};
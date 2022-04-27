import {spawn} from 'child_process';

export default (req, res) => {
    try {
        // Extrae la ruta de cada servidor local
        var dir = __dirname
        var pos = dir.indexOf("C.MTY.TC2005B.413.2211.Equipo3")
        dir = dir.slice(0,pos+31)
        dir = dir + "public\\updateDatabase\\cargarDatos.py"

        // Se obtiene la info del nombre del archivo
        const name = req.body;
    
        // El archivo de Python es llamado
        const process = spawn('python', [dir, name.nombre]);
    
        // Despliega en consola los prints del archivo de Python
        process.stdout.on('data', (data) => {
            console.log(data.toString());
        });
    
        return res.status(200).json({"msg":"Python runs good"});
    }
    catch {
        return res.status(500).json({"msg":"There was a problem running Python"});
    }
}
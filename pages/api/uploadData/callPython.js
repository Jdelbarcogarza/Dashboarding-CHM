import {spawn} from 'child_process';

export default (req, res) => {
    try {
        // Modificar según la ruta de cada quien
        const ruta = "c:\\Users\\nenas\\OneDrive\\Documents\\GitHub\\C.MTY.TC2005B.413.2211.Equipo3\\public\\updateDatabase\\cargarDatos.py"
    
        // Se obtiene la info del nombre del archivo
        const name = req.body;
    
        // El archivo de Python es llamado
        const process = spawn('python', [ruta, name.nombre]);
    
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
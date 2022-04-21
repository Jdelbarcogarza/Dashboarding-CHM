import fs from 'fs'
import next from 'next'

export default (req, res) => {
    // Modificar según la ruta de cada quien
    const ruta = "c:\\Users\\nenas\\OneDrive\\Documents\\GitHub\\C.MTY.TC2005B.413.2211.Equipo3\\public\\ExcelTemplate\\BaseDatos.xlsx"
    const filename = "hola.xlsx"

    fs.readFile(ruta, (err, data) => {
        if (err) {
            return next(err)
        }
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=plantilla.xlsx')
        res.send(data);
    })
}
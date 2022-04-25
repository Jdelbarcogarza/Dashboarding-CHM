import fs from "fs";

export default (req, res) => {
  // Modificar según la ruta de cada quien
  const ruta =
    "/Users/Pato2808/Desktop/Escuela/Trabajos/Semestre 4/Const. de Software/Reto/C.MTY.TC2005B.413.2211.Equipo3/public/ExcelTemplate/BaseDatos.xlsx";

  fs.readFile(ruta, (err, data) => {
    if (err) {
      return res.status(500).json({ msg: "Error downloading file" });
    }
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=plantilla.xlsx");
    res.send(data);
  });
};

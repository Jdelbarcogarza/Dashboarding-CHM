import fs from "fs";

export default (req, res) => {
  // Extrae la ruta de cada servidor local
  var dir = __dirname
  var pos = dir.indexOf("C.MTY.TC2005B.413.2211.Equipo3")
  dir = dir.slice(0,pos+31)
  dir = dir + "public\\ExcelTemplate\\BaseDatos.xlsx"

  console.log(dir)

  fs.readFile(dir, (err, data) => {
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
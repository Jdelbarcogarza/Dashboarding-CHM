import { connection } from "../../../../config/db";

export default async function handler(req, res) {

  const [rows] = await connection.query(
    `SELECT p.ID_Parroquia, p.Nombre 
    FROM Parroquia p, Decanato d
    WHERE p.ID_Decanato = d.ID_Decanato AND
    d.Nombre = "${req.query.decanato}"`
  );
  return res.status(200).json(rows);
}

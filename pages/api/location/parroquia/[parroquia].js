import { connection } from "../../../../config/db";

export default async function handler(req, res) {

  const [rows] = await connection.query(
    `SELECT p.Nombre 
    FROM Parroquia p, Decanato d
    WHERE p.ID_Decanato = d.ID_Decanato AND
    d.Nombre = "${req.query.parroquia}"`
  );
  return res.status(200).json(rows);
}

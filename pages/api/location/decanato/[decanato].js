import { connection } from "../../../../config/db";

export default async function handler(req, res) {

  const [rows] = await connection.query(
    `SELECT d.ID_Decanato, d.Nombre 
    FROM Decanato d, Zona z 
    WHERE d.ID_Zona = z.ID_Zona AND
    z.Nombre = "${req.query.decanato}"`
  );
  return res.status(200).json(rows);
}

import { connection } from "../../../config/db";

export default async function handler(req, res) {

  const [rows] = await connection.query(
    `SELECT ID_Parroquia
    FROM Parroquia
    WHERE Nombre = "${req.query.nombre}"`
  );
  return res.status(200).json(rows);
}

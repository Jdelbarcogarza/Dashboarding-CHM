import { connection } from "../../../../config/db";

export default async function handler(req, res) {
  const [rows] = await connection.query(
    `SELECT ID_Zona, Nombre FROM Zona`
  );
  return res.status(200).json(rows);
}

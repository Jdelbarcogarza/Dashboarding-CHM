import { connection } from "../../../config/db";

export default async function handler(req, res) {
  const [rows] = await connection.query(
    `SELECT Nombre FROM Zona`
  );
  return res.status(200).json(rows);
}

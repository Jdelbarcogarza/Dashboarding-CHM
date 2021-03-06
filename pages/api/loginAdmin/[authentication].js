import { connection } from "../../../config/db";

export default async function handler(req, res) {
  const [rows] = await connection.query(
    `CALL checkSignInAdmin("${req.query.authentication}")`
  );
  return res.status(200).json(rows[0]);
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {connection} from '../../config/db';

export default async function handler(req, res) {
  const [rows] = await connection.query('CALL getAllUsers()')
  console.log(rows[0])
  res.status(200).json(rows[0])
}